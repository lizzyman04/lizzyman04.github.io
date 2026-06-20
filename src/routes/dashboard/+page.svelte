<script>
	import { user } from '$lib/stores/auth.js';
</script>

<h1>Visão geral</h1>
<div class="dash-card">
	<p>Bem-vindo, {$user?.name}. Use o menu lateral para gerir o conteúdo do site.</p>
</div>
<div class="dash-card">
	<p>Cada secção corresponde a um bloco do site público: Hero, Perfil (currículo), Habilidades, Educação, Experiência, Competências, Portfólio e Introspecção.</p>
</div>
