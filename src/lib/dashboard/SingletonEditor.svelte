<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.js';
	import ImageField from './ImageField.svelte';
	import TagsField from './TagsField.svelte';
	import OptionsField from './OptionsField.svelte';

	let { title, endpoint, fields } = $props();

	let form = $state(null);
	let msg = $state(null);
	let busy = $state(false);

	onMount(async () => {
		const data = (await api(endpoint)) || {};
		const o = {};
		for (const f of fields) {
			o[f.key] = data[f.key] ?? (f.type === 'tags' ? [] : f.type === 'options' ? {} : f.type === 'number' ? 0 : '');
			if (data[f.key + '_url']) o[f.key + '_url'] = data[f.key + '_url'];
		}
		form = o;
	});

	async function save(e) {
		e.preventDefault();
		busy = true;
		msg = null;
		try {
			await api(endpoint, { method: 'PUT', body: form });
			msg = { type: 'ok', text: 'Guardado com sucesso.' };
		} catch (err) {
			msg = { type: 'err', text: err.data?.message || 'Erro ao guardar.' };
		} finally {
			busy = false;
		}
	}
</script>

<h1>{title}</h1>
{#if msg}<div class="dash-msg {msg.type}">{msg.text}</div>{/if}

{#if form}
	<form class="dash-card" onsubmit={save}>
		{#each fields as f}
			{#if f.type === 'image'}
				<ImageField label={f.label} bind:value={form[f.key]} preview={form[f.key + '_url']} dir={f.dir || 'uploads'} />
			{:else if f.type === 'tags'}
				<TagsField label={f.label} bind:value={form[f.key]} />
			{:else if f.type === 'options'}
				<OptionsField label={f.label} bind:value={form[f.key]} />
			{:else if f.type === 'textarea'}
				<div class="dash-field"><label>{f.label}</label><textarea bind:value={form[f.key]}></textarea></div>
			{:else if f.type === 'number'}
				<div class="dash-field"><label>{f.label}</label><input type="number" bind:value={form[f.key]} /></div>
			{:else}
				<div class="dash-field"><label>{f.label}</label><input type="text" bind:value={form[f.key]} /></div>
			{/if}
		{/each}
		<button class="dash-btn" type="submit" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</button>
	</form>
{:else}
	<p style="color:#777">Carregando…</p>
{/if}
