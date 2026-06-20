<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.js';

	let categories = $state([]);
	let skills = $state([]);
	let msg = $state(null);

	let newCat = $state('');
	let skillDraft = $state({}); // {catId: {name, level}}

	async function load() {
		[categories, skills] = await Promise.all([api('/api/skill-categories'), api('/api/skills')]);
		const drafts = {};
		for (const c of categories) drafts[c.id] = skillDraft[c.id] ?? { name: '', level: '' };
		skillDraft = drafts;
	}
	onMount(load);

	function skillsOf(catId) {
		return skills.filter((s) => s.skill_category_id === catId);
	}

	async function run(fn, okText) {
		msg = null;
		try {
			await fn();
			await load();
			msg = { type: 'ok', text: okText };
		} catch (err) {
			msg = { type: 'err', text: err.data?.message || 'Erro.' };
		}
	}

	const addCategory = () =>
		newCat.trim() &&
		run(async () => {
			await api('/api/skill-categories', { method: 'POST', body: { name: newCat.trim(), sort_order: categories.length } });
			newCat = '';
		}, 'Categoria criada.');

	const renameCategory = (cat) => {
		const name = prompt('Novo nome da categoria:', cat.name);
		if (name) run(() => api(`/api/skill-categories/${cat.id}`, { method: 'PUT', body: { name } }), 'Categoria actualizada.');
	};

	const deleteCategory = (cat) =>
		confirm(`Apagar categoria "${cat.name}" e as suas competências?`) &&
		run(() => api(`/api/skill-categories/${cat.id}`, { method: 'DELETE' }), 'Categoria apagada.');

	const addSkill = (cat) => {
		const d = skillDraft[cat.id] || {};
		if (!d.name?.trim() || !d.level?.trim()) return;
		run(async () => {
			await api('/api/skills', {
				method: 'POST',
				body: { skill_category_id: cat.id, name: d.name.trim(), level: d.level.trim(), sort_order: skillsOf(cat.id).length }
			});
			skillDraft[cat.id] = { name: '', level: '' };
		}, 'Competência adicionada.');
	};

	const editSkill = (s) => {
		const name = prompt('Nome:', s.name);
		if (name === null) return;
		const level = prompt('Nível (ex: 80%):', s.level);
		if (level === null) return;
		run(() => api(`/api/skills/${s.id}`, { method: 'PUT', body: { name, level } }), 'Competência actualizada.');
	};

	const deleteSkill = (s) =>
		confirm(`Apagar "${s.name}"?`) && run(() => api(`/api/skills/${s.id}`, { method: 'DELETE' }), 'Competência apagada.');
</script>

<h1>Competências</h1>
{#if msg}<div class="dash-msg {msg.type}">{msg.text}</div>{/if}

<div class="dash-card">
	<div class="dash-row">
		<input type="text" bind:value={newCat} placeholder="Nova categoria" />
		<button class="dash-btn" onclick={addCategory}>+ Categoria</button>
	</div>
</div>

{#each categories as cat (cat.id)}
	<div class="dash-card">
		<div class="dash-list-item">
			<strong>{cat.name}</strong>
			<div class="dash-row">
				<button class="dash-btn secondary" onclick={() => renameCategory(cat)}>Renomear</button>
				<button class="dash-btn danger" onclick={() => deleteCategory(cat)}>Apagar</button>
			</div>
		</div>

		{#each skillsOf(cat.id) as s (s.id)}
			<div class="dash-list-item">
				<span>{s.name} — <em>{s.level}</em></span>
				<div class="dash-row">
					<button class="dash-btn secondary" onclick={() => editSkill(s)}>Editar</button>
					<button class="dash-btn danger" onclick={() => deleteSkill(s)}>Apagar</button>
				</div>
			</div>
		{/each}

		<div class="dash-row" style="margin-top:10px">
			<input type="text" placeholder="Competência" bind:value={skillDraft[cat.id].name} />
			<input type="text" placeholder="Nível (80%)" bind:value={skillDraft[cat.id].level} />
			<button class="dash-btn" onclick={() => addSkill(cat)}>+ Competência</button>
		</div>
	</div>
{/each}
