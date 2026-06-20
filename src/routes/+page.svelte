<script>
	import Loader from '$lib/components/Loader.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Curriculo from '$lib/components/Curriculo.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import Introspeccao from '$lib/components/Introspeccao.svelte';
	import ConecteMe from '$lib/components/ConecteMe.svelte';

	let { data } = $props();
	const c = data.content;

	let active = $state('home');
	let menuOpen = $state(false);
	let breakerOn = $state(false);
	let breakerKey = $state(0);
	let breakerColor = $state('#c70039');

	const colors = ['#c70039', '#035aa6', '#04a777'];
	let colorIndex = 0;

	function selectSection(id) {
		menuOpen = false;
		breakerColor = colors[colorIndex];
		colorIndex = (colorIndex + 1) % colors.length;
		breakerKey++;
		breakerOn = true;
		setTimeout(() => (active = id), 700);
		setTimeout(() => (breakerOn = false), 2000);
		window.scrollTo({ top: 0 });
	}

	function goHome() {
		menuOpen = false;
	}
</script>

<Loader />

<Nav {menuOpen} onOpen={() => (menuOpen = true)} onClose={goHome} onSelect={selectSection} />

<main>
	{#if breakerOn}
		{#key breakerKey}
			<div class="breaker" style:display="block" style:background-color={breakerColor}></div>
		{/key}
	{/if}

	<Hero visible={active === 'home'} hero={c.hero} />
	<Curriculo
		visible={active === 'about-me'}
		profile={c.profile}
		abilities={c.abilities}
		education={c.education}
		experience={c.experience}
		skills={c.skills}
	/>
	<Portfolio visible={active === 'portfolio'} projects={c.projects} />
	<Introspeccao visible={active === 'introspection'} introspections={c.introspections} />
	<ConecteMe visible={active === 'hire-me'} email={c.profile?.email} />
</main>
