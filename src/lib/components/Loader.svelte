<script>
	import { onMount } from 'svelte';

	let message = $state('Carregando...');
	let done = $state(false);

	const ordinals = [
		'primeira', 'segunda', 'terceira', 'quarta', 'quinta',
		'sexta', 'sétima', 'oitava', 'nona', 'décima'
	];

	onMount(() => {
		const count = parseInt(localStorage.getItem('visit') || '0', 10) + 1;
		localStorage.setItem('visit', count);
		message = count <= 10 ? `É sua ${ordinals[count - 1]} vez aqui?` : `É sua ${count}ª vez aqui?`;

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
