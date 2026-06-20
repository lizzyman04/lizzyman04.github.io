<script>
	import SingletonEditor from '$lib/dashboard/SingletonEditor.svelte';

	const fields = [
		{ key: 'name', label: 'Nome', type: 'text' },
		{ key: 'prefix', label: 'Prefixo (ex: Sou um)', type: 'text' },
		{ key: 'roles', label: 'Funções rotativas', type: 'tags' },
		{ key: 'bg_image', label: 'Imagem de fundo', type: 'image', dir: 'hero' },
		{ key: 'period', label: 'Intervalo (ms)', type: 'number' }
	];
</script>

<SingletonEditor title="Hero" endpoint="/api/hero" {fields} />
