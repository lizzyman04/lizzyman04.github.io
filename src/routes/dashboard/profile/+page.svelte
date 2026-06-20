<script>
	import SingletonEditor from '$lib/dashboard/SingletonEditor.svelte';

	const fields = [
		{ key: 'name', label: 'Nome', type: 'text' },
		{ key: 'date_of_birth', label: 'Data de nascimento (AAAA-MM-DD)', type: 'text' },
		{ key: 'place_of_birth', label: 'Naturalidade', type: 'text' },
		{ key: 'email', label: 'Email', type: 'text' },
		{ key: 'presentation', label: 'Apresentação', type: 'text' },
		{ key: 'resume', label: 'Resumo', type: 'textarea' },
		{ key: 'photo', label: 'Foto', type: 'image', dir: 'profile' },
		{ key: 'cv_link', label: 'Caminho do CV (PDF)', type: 'text' }
	];
</script>

<SingletonEditor title="Perfil" endpoint="/api/profile" {fields} />
