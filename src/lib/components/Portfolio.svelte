<script>
	let { visible = false, projects = [] } = $props();
</script>

<section class="me-section" id="portfolio" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">PORTFÓLIO</h2>
		<p class="section-description">Some of my works</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="portfolio-container">
			{#each projects as p}
				<div class="portfolio-item">
					<div class="portfolio-image"><img src={p.image} alt="{p.title} project" /></div>
					<div class="portfolio-text">
						<h2>{p.title}</h2>
						<p>{p.description}</p>
						<ul class="portfolio-tech">
							{#each p.technologies ?? [] as tech}<li>{tech}</li>{/each}
						</ul>
						<div class="portfolio-buttons">
							{#each Object.entries(p.options ?? {}) as [label, link]}
								<a href={link} target="_blank" rel="noopener"><button><span>{label}</span></button></a>
							{/each}
							{#if (p.notices ?? []).length > 0}
								<div class="portfolio-notices">
									{#each p.notices as notice}<p>{notice}</p>{/each}
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
