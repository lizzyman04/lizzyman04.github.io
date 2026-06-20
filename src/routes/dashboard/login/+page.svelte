<script>
	import { goto } from '$app/navigation';
	import { login } from '$lib/stores/auth.js';

	let email = $state('admin@tudocomlizzyman.com');
	let password = $state('');
	let error = $state('');
	let busy = $state(false);

	async function submit(e) {
		e.preventDefault();
		busy = true;
		error = '';
		try {
			await login(email, password);
			await goto('/dashboard');
		} catch (err) {
			error = err.data?.message || 'Credenciais inválidas.';
		} finally {
			busy = false;
		}
	}
</script>

<div class="login-wrap">
	<form class="dash-card login-card" onsubmit={submit}>
		<h1>Entrar no Painel</h1>
		{#if error}<div class="dash-msg err">{error}</div>{/if}
		<div class="dash-field">
			<label for="email">Email</label>
			<input id="email" type="email" bind:value={email} required />
		</div>
		<div class="dash-field">
			<label for="password">Senha</label>
			<input id="password" type="password" bind:value={password} required />
		</div>
		<button class="dash-btn" type="submit" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
	</form>
</div>

<style>
	.login-wrap {
		display: grid;
		place-items: center;
		min-height: 100vh;
		background: #101010;
		font-family: 'Poppins', sans-serif;
		color: #f5f5f5;
	}
	.login-card {
		width: 360px;
		max-width: 90vw;
	}
	.login-card h1 {
		font-size: 22px;
		margin-bottom: 18px;
	}
</style>
