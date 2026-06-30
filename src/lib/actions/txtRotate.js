// Typewriter rotate effect. Svelte action: use:txtRotate={{ words, period }}
export function txtRotate(node, { words, period = 2000 }) {
	let loopNum = 0;
	let txt = '';
	let isDeleting = false;
	let timer;

	function tick() {
		const i = loopNum % words.length;
		const fullTxt = words[i];
		txt = isDeleting ? fullTxt.substring(0, txt.length - 1) : fullTxt.substring(0, txt.length + 1);

		node.innerHTML = `<span class="wrap">${txt}</span>`;

		let delta = 200 - Math.random() * 100;
		delta = isDeleting ? delta / 2 : delta;

		if (!isDeleting && txt === fullTxt) {
			delta = period;
			isDeleting = true;
		} else if (isDeleting && txt === '') {
			isDeleting = false;
			loopNum++;
			delta = 100;
		}

		timer = setTimeout(tick, delta);
	}

	tick();

	return {
		destroy() {
			clearTimeout(timer);
		}
	};
}
