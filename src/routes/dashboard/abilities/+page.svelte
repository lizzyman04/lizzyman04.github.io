<script>
	import ResourceManager from '$lib/dashboard/ResourceManager.svelte';

	const fields = [
		{ key: 'title', label: 'Título', type: 'text' },
		{ key: 'description', label: 'Descrição', type: 'textarea' },
		{ key: 'image', label: 'Ícone', type: 'image', dir: 'abilities' },
		{ key: 'sort_order', label: 'Ordem', type: 'number' }
	];
</script>

<ResourceManager
	title="Habilidades"
	endpoint="/api/abilities"
	{fields}
	label={(i) => i.title}
/>
