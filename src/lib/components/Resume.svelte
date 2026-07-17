<script>
	import { slide } from 'svelte/transition';
	import { locale, t, pick } from '$lib/i18n.js';

	let {
		visible = false,
		profile = {},
		abilities = [],
		education = [],
		experience = [],
		skills = []
	} = $props();

	let openCategory = $state(null);
	function toggle(id) {
		openCategory = openCategory === id ? null : id;
	}
</script>

<section class="me-section" id="about-me" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">{t('cv.title', $locale)}</h2>
		<p class="section-description">{t('cv.subtitle', $locale)}</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="introducing-container">
			<div class="introducing-img">
				{#if profile.photo}
					<img src={profile.photo} alt={profile.name} />
				{/if}
			</div>
			<div class="introducing-content">
				<h2 class="content-subtitle">{t('cv.whoami', $locale)}</h2>
				<h6 class="content-title">{pick(profile.presentation, $locale)}</h6>
				<div class="resume-d">
					<p>{pick(profile.resume, $locale)}</p>
				</div>
				<address class="content-info">
					<div class="row f-row">
						<div class="s-info"><span>{t('cv.name', $locale)}:</span>
							<p>{profile.name}</p>
						</div>
						<div class="s-info"><span>{t('cv.age', $locale)}:</span>
							<p>{profile.age} {t('cv.years', $locale)}</p>
						</div>
					</div>
					<div class="row l-row">
						<div class="s-info"><span>{t('cv.email', $locale)}:</span>
							<p><a href="mailto:{profile.email}">{profile.email}</a></p>
						</div>
						<div class="s-info"><span>{t('cv.birthplace', $locale)}:</span>
							<p>{pick(profile.place_of_birth, $locale)}</p>
						</div>
					</div>
				</address>
				<div class="link-content">
					{#if profile.cv_link}
						<a href={profile.cv_link} target="_blank" rel="noopener">
							<button class="content-download">{t('cv.download', $locale)}</button>
						</a>
					{/if}
					<ul class="content-follow">
						<li><a href="https://github.com/lizzyman04" class="github-link"><span class="css-icon github-icon"></span></a></li>
						<li><a href="https://www.linkedin.com/in/lizzyman04" class="linkedin-link" target="_blank"><span class="css-icon linkedin-icon"></span></a></li>
						<li><a href="https://tudocomlizzyman.com" class="blog-link"><span class="css-icon blog-icon"></span></a></li>
						<li><a href="https://www.instagram.com/lizzyman04" class="instagram-link" target="_blank"><span class="css-icon instagram-icon"></span></a></li>
						<li><a href="https://wa.me/+258877603501" class="whatsapp-link" target="_blank"><span class="css-icon whatsapp-icon"></span></a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="abilities-container">
			<div class="abilities-heading sub-section-heading">
				<h2 class="abilities-title sub-section-title">{t('cv.abilities', $locale)}</h2>
				<p class="abilities-description sub-section-description">{t('cv.abilitiesDesc', $locale)}</p>
			</div>
			<div class="abilities-content" id="abilities">
				{#each abilities as a}
					<div class="ability">
						<div class="ability-img"><img src={a.image} alt={pick(a.title, $locale)} /></div>
						<div class="ability-description">
							<h2>{pick(a.title, $locale)}</h2>
							<p>{pick(a.description, $locale)}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="participations-container">
			<div class="participations-heading sub-section-heading">
				<h2 class="participations-title sub-section-title">{t('cv.participations', $locale)}</h2>
				<p class="participations-description sub-section-description">{t('cv.participationsDesc', $locale)}</p>
			</div>
			<div class="single-participations-tag">
				<h3>{t('cv.education', $locale)}</h3>
				<div class="education-content" id="education">
					{#each education as d}
						<div class="participation-item">
							<span class="item-arrow"></span>
							<h5 class="item-title">{pick(d.title, $locale)}</h5>
							<span class="item-carrer">{pick(d.carrer, $locale)}</span>
							<span class="item-details">{pick(d.institution, $locale) || pick(d.company, $locale)}</span>
							<span class="item-location">{pick(d.location, $locale)} / {d.dates}</span>
							<p class="item-description">{pick(d.description, $locale)}</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="single-participations-tag">
				<h3>{t('cv.experience', $locale)}</h3>
				<div class="experience-content" id="experience">
					{#each experience as d}
						<div class="participation-item">
							<span class="item-arrow"></span>
							<h5 class="item-title">{pick(d.title, $locale)}</h5>
							<span class="item-carrer">{pick(d.carrer, $locale)}</span>
							<span class="item-details">{pick(d.institution, $locale) || pick(d.company, $locale)}</span>
							<span class="item-location">{pick(d.location, $locale)} / {d.dates}</span>
							<p class="item-description">{pick(d.description, $locale)}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="skills-container">
			<div class="skills-heading sub-section-heading">
				<h2 class="skills-title sub-section-title">{t('cv.skills', $locale)}</h2>
				<p class="skills-description sub-section-description">{t('cv.skillsDesc', $locale)}</p>
			</div>
			<div class="skills-content" id="skills">
				{#each skills as cat}
					<div class="skill-category" class:open={openCategory === cat.id}>
						<div class="skill-category-header" onclick={() => toggle(cat.id)} role="button" tabindex="0">
							{pick(cat.name, $locale)} <span class="toggle-sign"></span>
						</div>
						{#if openCategory === cat.id}
							<div class="skill-list" transition:slide={{ duration: 400 }} style="padding-top:20px;padding-bottom:20px;">
								{#each cat.skills as s}
									<div class="skill-item">
										<div class="skill-name">{s.name}</div>
										<div class="skill-progress-bar">
											<div class="skill-progress" style="width:{s.level};">
												<div class="skill-level">{s.level}</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
