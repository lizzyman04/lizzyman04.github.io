<script>
	import ResourceManager from '$lib/dashboard/ResourceManager.svelte';

	const fields = [
		{ key: 'title', label: 'Título', type: 'text' },
		{ key: 'carrer', label: 'Curso/Carreira', type: 'text' },
		{ key: 'institution', label: 'Instituição', type: 'text' },
		{ key: 'location', label: 'Localização', type: 'text' },
		{ key: 'dates', label: 'Datas', type: 'text' },
		{ key: 'description', label: 'Descrição', type: 'textarea' },
		{ key: 'sort_order', label: 'Ordem', type: 'number' }
	];
</script>

<ResourceManager title="Educação" endpoint="/api/educations" {fields} label={(i) => i.title} />
