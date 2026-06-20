<script>
	import { uploadImage } from '$lib/api.js';

	let { label = 'Imagem', value = $bindable(''), preview = '', dir = 'uploads' } = $props();

	let busy = $state(false);
	let error = $state('');
	let localPreview = $state(preview);

	async function onChange(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		busy = true;
		error = '';
		try {
			const res = await uploadImage(file, dir);
			value = res.path;
			localPreview = res.url;
		} catch (err) {
			error = err.data?.message || 'Falha no upload.';
		} finally {
			busy = false;
		}
	}
</script>

<div class="dash-field">
	<label>{label}</label>
	<div class="dash-row">
		{#if localPreview}<img class="dash-thumb" src={localPreview} alt="" />{/if}
		<input type="file" accept="image/*" onchange={onChange} disabled={busy} />
	</div>
	{#if busy}<small>Enviando…</small>{/if}
	{#if error}<small style="color:#ff6b8a">{error}</small>{/if}
	{#if value}<small style="color:#666">{value}</small>{/if}
</div>
