// Lazy-loads particles.js only when the hero mounts (keeps it off the critical path).
import particlesA from '$lib/data/particles.json';
import particlesB from '$lib/data/linked_particles.json';

export function particles(node) {
	let cancelled = false;

	import('particles.js')
		.then(() => {
			if (cancelled || typeof window === 'undefined' || !window.particlesJS) return;
			const config = Math.random() < 0.5 ? particlesA : particlesB;
			window.particlesJS(node.id, config);
		})
		.catch(() => {});

	return {
		destroy() {
			cancelled = true;
		}
	};
}
