<script>
	import { locale, t, pick } from '$lib/i18n.js';

	let { visible = false, introspections = [] } = $props();
</script>

<section class="me-section" id="introspection" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">{t('in.title', $locale)}</h2>
		<p class="section-description">{t('in.subtitle', $locale)}</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="introspection-container">
			{#each introspections as d}
				<div class="introspection-item">
					<div class="introspection-card">
						<a class="introspection-image-link" href={d.link} target="_blank" rel="noopener">
							<img class="introspection-image" src={d.image} alt="{pick(d.title, $locale)} post" />
							<span class="introspection-date">{d.date}</span>
						</a>
						<div class="introspection-content">
							<a class="introspection-title-link" href={d.link} target="_blank" rel="noopener">
								<h5 class="introspection-title">{pick(d.title, $locale)}</h5>
							</a>
							<p class="introspection-description">{pick(d.description, $locale)}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="introspection-see-more">
			<a href="https://tudocomlizzyman.com/categoria/eu-escritor/" class="see-more-link" target="_blank" rel="noopener">{t('in.seeMore', $locale)}</a>
		</div>
	</div>
</section>
