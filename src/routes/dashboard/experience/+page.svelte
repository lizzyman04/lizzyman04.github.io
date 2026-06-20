<script>
	import ResourceManager from '$lib/dashboard/ResourceManager.svelte';

	const fields = [
		{ key: 'title', label: 'Título', type: 'text' },
		{ key: 'carrer', label: 'Cargo/Carreira', type: 'text' },
		{ key: 'company', label: 'Empresa', type: 'text' },
		{ key: 'location', label: 'Localização', type: 'text' },
		{ key: 'dates', label: 'Datas', type: 'text' },
		{ key: 'description', label: 'Descrição', type: 'textarea' },
		{ key: 'sort_order', label: 'Ordem', type: 'number' }
	];
</script>

<ResourceManager title="Experiência" endpoint="/api/experiences" {fields} label={(i) => i.title} />
