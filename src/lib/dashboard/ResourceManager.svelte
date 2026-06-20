<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.js';
	import ImageField from './ImageField.svelte';
	import TagsField from './TagsField.svelte';
	import OptionsField from './OptionsField.svelte';

	let { title, endpoint, fields, label } = $props();

	let items = $state([]);
	let form = $state(null); // current editing form, null = no form open
	let editingId = $state(null);
	let msg = $state(null); // {type, text}
	let busy = $state(false);

	function blank() {
		const o = {};
		for (const f of fields) {
			o[f.key] = f.type === 'tags' ? [] : f.type === 'options' ? {} : f.type === 'number' ? 0 : '';
		}
		return o;
	}

	async function load() {
		items = await api(endpoint);
	}

	onMount(load);

	function startCreate() {
		form = blank();
		editingId = null;
		msg = null;
	}

	function startEdit(item) {
		form = { ...blank(), ...item };
		editingId = item.id;
		msg = null;
	}

	function cancel() {
		form = null;
		editingId = null;
	}

	async function save(e) {
		e.preventDefault();
		busy = true;
		msg = null;
		try {
			if (editingId) {
				await api(`${endpoint}/${editingId}`, { method: 'PUT', body: form });
			} else {
				await api(endpoint, { method: 'POST', body: form });
			}
			await load();
			form = null;
			editingId = null;
			msg = { type: 'ok', text: 'Guardado com sucesso.' };
		} catch (err) {
			msg = { type: 'err', text: err.data?.message || 'Erro ao guardar.' };
		} finally {
			busy = false;
		}
	}

	async function remove(item) {
		if (!confirm(`Apagar "${label(item)}"?`)) return;
		try {
			await api(`${endpoint}/${item.id}`, { method: 'DELETE' });
			await load();
			msg = { type: 'ok', text: 'Apagado.' };
		} catch (err) {
			msg = { type: 'err', text: err.data?.message || 'Erro ao apagar.' };
		}
	}
</script>

<div class="dash-head">
	<h1>{title}</h1>
	{#if !form}<button class="dash-btn" onclick={startCreate}>+ Novo</button>{/if}
</div>

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
				<div class="dash-field">
					<label>{f.label}</label>
					<textarea bind:value={form[f.key]}></textarea>
				</div>
			{:else if f.type === 'number'}
				<div class="dash-field">
					<label>{f.label}</label>
					<input type="number" bind:value={form[f.key]} />
				</div>
			{:else}
				<div class="dash-field">
					<label>{f.label}</label>
					<input type="text" bind:value={form[f.key]} />
				</div>
			{/if}
		{/each}
		<div class="dash-row">
			<button class="dash-btn" type="submit" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</button>
			<button class="dash-btn secondary" type="button" onclick={cancel}>Cancelar</button>
		</div>
	</form>
{/if}

<div>
	{#each items as item (item.id)}
		<div class="dash-list-item">
			<div class="dash-row">
				{#if item.image_url}<img class="dash-thumb" src={item.image_url} alt="" />{/if}
				<strong>{label(item)}</strong>
			</div>
			<div class="dash-row">
				<button class="dash-btn secondary" onclick={() => startEdit(item)}>Editar</button>
				<button class="dash-btn danger" onclick={() => remove(item)}>Apagar</button>
			</div>
		</div>
	{:else}
		<p style="color:#777">Sem registos ainda.</p>
	{/each}
</div>

<style>
	.dash-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
