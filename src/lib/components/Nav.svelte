<script>
	import { locale, t } from '$lib/i18n.js';

	let { menuOpen = false, onOpen, onClose, onSelect } = $props();

	const items = [
		{ id: 'about-me', key: 'nav.about' },
		{ id: 'portfolio', key: 'nav.portfolio' },
		{ id: 'introspection', key: 'nav.introspection' },
		{ id: 'hire-me', key: 'nav.contact' }
	];
</script>

<!-- Hamburger -->
<header>
	<div class="bar" onclick={onOpen} role="button" tabindex="0" aria-label="Abrir menu">
		<span class="first-span"></span>
		<span class="second-span"></span>
		<span class="third-span"></span>
	</div>
</header>

<!-- Fullscreen overlay menu -->
<div class="header" class:open={menuOpen}>
	<div class="logo" onclick={onClose} role="button" tabindex="0" aria-label="Voltar ao início">
		<img src="/img/favicon.ico" alt="" />
	</div>
	<div class="x-bar" onclick={onClose} role="button" tabindex="0" aria-label="Fechar menu">
		<span class="x-first-span"></span>
		<span class="x-second-span"></span>
	</div>
	<div class="nav-me">
		{#each items as item}
			<button data-text={t(item.key, $locale)} onclick={() => onSelect(item.id)}>{t(item.key, $locale)}</button>
		{/each}
	</div>
</div>

<style>
	.header.open {
		transform: translateY(0);
	}
</style>
