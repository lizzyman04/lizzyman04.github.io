<script>
	let { label = 'Itens', value = $bindable([]) } = $props();
	let draft = $state('');

	function add() {
		const v = draft.trim();
		if (v) {
			value = [...value, v];
			draft = '';
		}
	}
	function remove(i) {
		value = value.filter((_, idx) => idx !== i);
	}
	function onKey(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			add();
		}
	}
</script>

<div class="dash-field">
	<label>{label}</label>
	<div class="dash-row">
		{#each value as item, i}
			<span class="dash-tag">{item}<button type="button" onclick={() => remove(i)}>×</button></span>
		{/each}
	</div>
	<div class="dash-row">
		<input type="text" bind:value={draft} onkeydown={onKey} placeholder="Adicionar e Enter" />
		<button type="button" class="dash-btn secondary" onclick={add}>Adicionar</button>
	</div>
</div>
