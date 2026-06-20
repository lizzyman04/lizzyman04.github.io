<script>
	import portfolio from '$lib/data/portfolio.json';
	const projects = Object.entries(portfolio);

	let { visible = false } = $props();
</script>

<section class="me-section" id="portfolio" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">PORTFÓLIO</h2>
		<p class="section-description">Some of my works</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="portfolio-container">
			{#each projects as [name, d]}
				<div class="portfolio-item">
					<div class="portfolio-image"><img src={d.imageSrc} alt="{name} project" /></div>
					<div class="portfolio-text">
						<h2>{name}</h2>
						<p>{d.description}</p>
						<ul class="portfolio-tech">
							{#each d.technologies as tech}<li>{tech}</li>{/each}
						</ul>
						<div class="portfolio-buttons">
							{#each Object.entries(d.options) as [label, link]}
								<a href={link} target="_blank" rel="noopener"><button><span>{label}</span></button></a>
							{/each}
							{#if d.notices.length > 0}
								<div class="portfolio-notices">
									{#each d.notices as notice}<p>{notice}</p>{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="portfolio-see-more">
			<a href="https://github.com/Lizzyman04?tab=repositories" class="see-more-link" target="_blank" rel="noopener">Clique-me para apreciar mais das minhas criações 🙃</a>
		</div>
	</div>
</section>
