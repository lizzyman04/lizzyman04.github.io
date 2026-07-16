// Lazy-loads particles.js when the hero mounts (keeps it off the critical path).
// particles.js reads the container's offsetWidth/Height synchronously to size its
// canvas, so it must only run once the element actually has a non-zero layout size
// — otherwise the canvas comes up 0×0 and nothing renders. We wait for a real size,
// re-init when the container resizes (e.g. shown after display:none), and tear the
// instance down on destroy.
import particlesA from '$lib/data/particles.json';
import particlesB from '$lib/data/linked_particles.json';

export function particles(node) {
	let cancelled = false;
	let started = false;
	let ro;

	const config = Math.random() < 0.5 ? particlesA : particlesB;

	function sized() {
		return node.offsetWidth > 0 && node.offsetHeight > 0;
	}

	function start() {
		if (started || cancelled || !sized()) return;
		if (typeof window === 'undefined' || typeof window.particlesJS !== 'function') return;
		try {
			window.particlesJS(node.id, config);
			started = true;
		} catch {
			/* leave started=false so a later resize can retry */
		}
	}

	function teardown() {
		const dom = (typeof window !== 'undefined' && window.pJSDom) || [];
		for (let i = dom.length - 1; i >= 0; i--) {
			const inst = dom[i];
			if (inst?.pJS?.canvas?.el?.parentNode === node) {
				try {
					inst.pJS.fn.vendors.destroypJS();
				} catch {
					/* ignore */
				}
				dom.splice(i, 1);
			}
		}
		started = false;
	}

	import('particles.js')
		.then(() => {
			if (cancelled) return;
			// Retry until the container has a real size (timer, not rAF, so it also
			// advances while the section is hidden / the tab is backgrounded).
			let tries = 0;
			(function attempt() {
				if (cancelled || started) return;
				start();
				if (!started && tries++ < 150) setTimeout(attempt, 32);
			})();
			// Re-initialise if the container gets a size later (section toggled visible).
			ro = new ResizeObserver(() => {
				if (!started && sized()) start();
			});
			ro.observe(node);
		})
		.catch(() => {});

	return {
		destroy() {
			cancelled = true;
			ro?.disconnect();
			teardown();
		}
	};
}
