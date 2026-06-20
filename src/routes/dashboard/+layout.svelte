<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { user, refreshUser, logout } from '$lib/stores/auth.js';
	import '$lib/styles/dashboard.css';

	let { children } = $props();
	let ready = $state(false);

	const links = [
		{ href: '/dashboard', label: 'Visão geral' },
		{ href: '/dashboard/hero', label: 'Hero' },
		{ href: '/dashboard/profile', label: 'Perfil' },
		{ href: '/dashboard/abilities', label: 'Habilidades' },
		{ href: '/dashboard/education', label: 'Educação' },
		{ href: '/dashboard/experience', label: 'Experiência' },
		{ href: '/dashboard/skills', label: 'Competências' },
		{ href: '/dashboard/projects', label: 'Portfólio' },
		{ href: '/dashboard/introspections', label: 'Introspecção' }
	];

	const isLogin = $derived($page.url.pathname === '/dashboard/login');

	onMount(async () => {
		await refreshUser();
		if (!$user && !isLogin) await goto('/dashboard/login');
		ready = true;
	});

	$effect(() => {
		if (ready && !$user && !isLogin) goto('/dashboard/login');
	});

	async function handleLogout() {
		await logout();
		goto('/dashboard/login');
	}
</script>

{#if isLogin}
	{@render children()}
{:else if ready && $user}
	<div class="dash">
		<aside class="dash-side">
			<h2 class="dash-brand">Painel</h2>
			<nav>
				{#each links as l}
					<a href={l.href} class:active={$page.url.pathname === l.href}>{l.label}</a>
				{/each}
			</nav>
			<button class="dash-logout" onclick={handleLogout}>Sair ({$user.name})</button>
		</aside>
		<main class="dash-main">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="dash-loading">Carregando…</div>
{/if}

<style>
	:global(body) {
		cursor: auto;
	}
	.dash {
		display: flex;
		min-height: 100vh;
		font-family: 'Poppins', sans-serif;
		color: #f5f5f5;
		background: #101010;
	}
	.dash-side {
		width: 240px;
		flex-shrink: 0;
		background: #161616;
		padding: 24px 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		border-right: 1px solid #222;
	}
	.dash-brand {
		font-family: 'Monoton', cursive;
		color: #04a777;
		margin-bottom: 20px;
		font-size: 24px;
	}
	.dash-side nav {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
	}
	.dash-side a {
		color: #ccc;
		text-decoration: none;
		padding: 10px 12px;
		border-radius: 6px;
		font-size: 14px;
	}
	.dash-side a:hover {
		background: #1f1f1f;
	}
	.dash-side a.active {
		background: #04a777;
		color: #fff;
	}
	.dash-logout {
		margin-top: 16px;
		background: #c70039;
		color: #fff;
		border: none;
		padding: 10px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 13px;
	}
	.dash-main {
		flex: 1;
		padding: 32px 40px;
		overflow-x: hidden;
	}
	.dash-loading {
		display: grid;
		place-items: center;
		min-height: 100vh;
		color: #f5f5f5;
		background: #101010;
		font-family: 'Poppins', sans-serif;
	}
</style>
