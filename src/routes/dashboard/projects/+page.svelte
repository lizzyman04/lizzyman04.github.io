<script>
	import ResourceManager from '$lib/dashboard/ResourceManager.svelte';

	const fields = [
		{ key: 'title', label: 'Título', type: 'text' },
		{ key: 'description', label: 'Descrição', type: 'textarea' },
		{ key: 'image', label: 'Imagem', type: 'image', dir: 'projects' },
		{ key: 'category', label: 'Categoria', type: 'text' },
		{ key: 'technologies', label: 'Tecnologias', type: 'tags' },
		{ key: 'options', label: 'Links (rótulo → url)', type: 'options' },
		{ key: 'notices', label: 'Avisos', type: 'tags' },
		{ key: 'sort_order', label: 'Ordem', type: 'number' }
	];
</script>

<ResourceManager title="Portfólio" endpoint="/api/projects" {fields} label={(i) => i.title} />
