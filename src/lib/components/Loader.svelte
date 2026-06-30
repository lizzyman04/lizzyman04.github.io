<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { locale, t } from '$lib/i18n.js';

	let message = $state('');
	let done = $state(false);

	const ordinals = [
		'primeira', 'segunda', 'terceira', 'quarta', 'quinta',
		'sexta', 'sétima', 'oitava', 'nona', 'décima'
	];

	function enOrdinal(n) {
		const s = ['th', 'st', 'nd', 'rd'];
		const v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	onMount(() => {
		const count = parseInt(localStorage.getItem('visit') || '0', 10) + 1;
		localStorage.setItem('visit', count);

		const loc = get(locale);
		const nth = loc === 'en' ? enOrdinal(count) : count <= 10 ? ordinals[count - 1] : `${count}ª`;
		message = t('loader.again', loc)(nth);

		// Hide as soon as the app is interactive — no artificial delay.
		requestAnimationFrame(() => requestAnimationFrame(() => (done = true)));
	});
</script>

<div class="loader" class:hide={done}>
	<div class="ball">
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="circle"></div>
	</div>
	<div class="welcome-m">{message}</div>
</div>

<style>
	.loader {
		transition: transform 1s ease, opacity 1s ease;
		transform-origin: top;
		will-change: transform, opacity;
	}
	.loader.hide {
		transform: translateY(-100%) rotateX(90deg);
		opacity: 0;
		pointer-events: none;
	}
</style>
