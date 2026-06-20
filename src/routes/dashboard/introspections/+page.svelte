<script>
	import ResourceManager from '$lib/dashboard/ResourceManager.svelte';

	const fields = [
		{ key: 'title', label: 'Título', type: 'text' },
		{ key: 'description', label: 'Descrição', type: 'textarea' },
		{ key: 'image', label: 'Imagem', type: 'image', dir: 'introspection' },
		{ key: 'date', label: 'Data (ex: 06 Jul, 24)', type: 'text' },
		{ key: 'link', label: 'Link', type: 'text' },
		{ key: 'sort_order', label: 'Ordem', type: 'number' }
	];
</script>

<ResourceManager title="Introspecção" endpoint="/api/introspections" {fields} label={(i) => i.title} />
