<script>
	let { visible = false, introspections = [] } = $props();
</script>

<section class="me-section" id="introspection" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">INTROSPECÇÃO</h2>
		<p class="section-description">How i see the world</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="introspection-container">
			{#each introspections as d}
				<div class="introspection-item">
					<div class="introspection-card">
						<a class="introspection-image-link" href={d.link} target="_blank" rel="noopener">
							<img class="introspection-image" src={d.image} alt="{d.title} post" />
							<span class="introspection-date">{d.date}</span>
						</a>
						<div class="introspection-content">
							<a class="introspection-title-link" href={d.link} target="_blank" rel="noopener">
								<h5 class="introspection-title">{d.title}</h5>
							</a>
							<p class="introspection-description">{d.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="introspection-see-more">
			<a href="https://tudocomlizzyman.com/categoria/eu-escritor/" class="see-more-link" target="_blank" rel="noopener">Clique-me para ver mais das minhas introspecções e momentos de aprendizado 🙃</a>
		</div>
	</div>
</section>
