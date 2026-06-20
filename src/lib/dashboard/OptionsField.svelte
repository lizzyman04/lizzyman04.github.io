<script>
	// Edits an object map: { "Label": "https://link" }
	let { label = 'Links', value = $bindable({}) } = $props();

	let k = $state('');
	let v = $state('');

	let entries = $derived(Object.entries(value));

	function add() {
		if (k.trim() && v.trim()) {
			value = { ...value, [k.trim()]: v.trim() };
			k = '';
			v = '';
		}
	}
	function remove(key) {
		const next = { ...value };
		delete next[key];
		value = next;
	}
</script>

<div class="dash-field">
	<label>{label}</label>
	{#each entries as [key, link]}
		<div class="dash-row">
			<span class="dash-tag">{key} → {link}<button type="button" onclick={() => remove(key)}>×</button></span>
		</div>
	{/each}
	<div class="dash-row">
		<input type="text" bind:value={k} placeholder="Rótulo (ex: Ver código)" />
		<input type="text" bind:value={v} placeholder="https://…" />
		<button type="button" class="dash-btn secondary" onclick={add}>Adicionar</button>
	</div>
</div>
