<script>
	import { locale, t, pick } from '$lib/i18n.js';

	let { visible = false, projects = [] } = $props();
</script>

<section class="me-section" id="portfolio" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">{t('pf.title', $locale)}</h2>
		<p class="section-description">{t('pf.subtitle', $locale)}</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="portfolio-container">
			{#each projects as p}
				<div class="portfolio-item">
					<div class="portfolio-image"><img src={p.image} alt="{pick(p.title, $locale)} project" /></div>
					<div class="portfolio-text">
						<h2>{pick(p.title, $locale)}</h2>
						<p>{pick(p.description, $locale)}</p>
						<ul class="portfolio-tech">
							{#each p.technologies ?? [] as tech}<li>{tech}</li>{/each}
						</ul>
						<div class="portfolio-buttons">
							{#each Object.entries(p.options ?? {}) as [label, link]}
								<a href={link} target="_blank" rel="noopener"><button><span>{label}</span></button></a>
							{/each}
							{#if (pick(p.notices, $locale) ?? []).length > 0}
								<div class="portfolio-notices">
									{#each pick(p.notices, $locale) as notice}<p>{notice}</p>{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="portfolio-see-more">
			<a href="https://github.com/lizzyman04?tab=repositories" class="see-more-link" target="_blank" rel="noopener">{t('pf.seeMore', $locale)}</a>
		</div>
	</div>
</section>
