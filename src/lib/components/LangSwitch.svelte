<script>
	import { locale, setLocale, LOCALES } from '$lib/i18n.js';
</script>

<div class="lang-switch" role="group" aria-label="Idioma / Language">
	{#each LOCALES as code}
		<button
			class:active={$locale === code}
			onclick={() => setLocale(code)}
			aria-pressed={$locale === code}
		>{code.toUpperCase()}</button>
	{/each}
</div>

<style>
	.lang-switch {
		position: fixed;
		top: 14px;
		right: 16px;
		z-index: 1000;
		display: flex;
		gap: 2px;
		padding: 3px;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.45);
		backdrop-filter: blur(6px);
	}
	.lang-switch button {
		min-width: 34px;
		padding: 4px 8px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		cursor: pointer;
		opacity: 0.7;
		transition: background 0.2s, opacity 0.2s;
	}
	.lang-switch button:hover {
		opacity: 1;
	}
	.lang-switch button.active {
		background: #fff;
		color: #111;
		opacity: 1;
	}
</style>
