<script>
	import { slide } from 'svelte/transition';
	import about from '$lib/data/about.json';

	const { introducing, abilities, education, experience, skills } = about;

	function calcAge(dob) {
		const [y, m, d] = dob.split('-').map(Number);
		const now = new Date();
		return now.getFullYear() - y - (now < new Date(now.getFullYear(), m - 1, d) ? 1 : 0);
	}
	const age = calcAge(introducing.date_of_birth);

	let openCategory = $state(null);
	function toggle(name) {
		openCategory = openCategory === name ? null : name;
	}

	const abilityList = Object.entries(abilities);
	const educationList = Object.entries(education);
	const experienceList = Object.entries(experience);
	const skillCategories = Object.entries(skills);

	let { visible = false } = $props();
</script>

<section class="me-section" id="about-me" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">CURRÍCULO</h2>
		<p class="section-description">Get to know me</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="introducing-container">
			<div class="introducing-img">
				<picture>
					<source srcset="/img/introducing-myself.webp" type="image/webp" />
					<img src="/img/introducing-myself.webp" alt="" />
				</picture>
			</div>
			<div class="introducing-content">
				<h2 class="content-subtitle">Quem sou eu?</h2>
				<h6 class="content-title">{introducing.presentation}</h6>
				<div class="resume-d">
					<p>{introducing.resume}</p>
				</div>
				<address class="content-info">
					<div class="row f-row">
						<div class="s-info"><span>Nome:</span>
							<p>{introducing.name}</p>
						</div>
						<div class="s-info"><span>Idade:</span>
							<p>{age} anos</p>
						</div>
					</div>
					<div class="row l-row">
						<div class="s-info"><span>Email:</span>
							<p><a href="mailto:{introducing.email}">{introducing.email}</a></p>
						</div>
						<div class="s-info"><span>Naturalidade:</span>
							<p>{introducing.place_of_birth}</p>
						</div>
					</div>
				</address>
				<div class="link-content">
					<a href={introducing.cv_link} target="_blank" rel="noopener">
						<button class="content-download">CURRICULUM VITAE</button>
					</a>
					<ul class="content-follow">
						<li><a href="https://github.com/Lizzyman04" class="github-link"><span class="css-icon github-icon"></span></a></li>
						<li><a href="https://www.linkedin.com/in/arlindoabdul" class="linkedin-link" target="_blank"><span class="css-icon linkedin-icon"></span></a></li>
						<li><a href="https://tudocomlizzyman.com" class="blog-link"><span class="css-icon blog-icon"></span></a></li>
						<li><a href="https://www.instagram.com/tudocomlizzyman" class="instagram-link" target="_blank"><span class="css-icon instagram-icon"></span></a></li>
						<li><a href="https://wa.me/+258877603501" class="whatsapp-link" target="_blank"><span class="css-icon whatsapp-icon"></span></a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="abilities-container">
			<div class="abilities-heading sub-section-heading">
				<h2 class="abilities-title sub-section-title">Habilidades</h2>
				<p class="abilities-description sub-section-description">Skills where I am unbeatable</p>
			</div>
			<div class="abilities-content" id="abilities">
				{#each abilityList as [title, data]}
					<div class="ability">
						<div class="ability-img"><img src={data.imgSrc} alt={title} /></div>
						<div class="ability-description">
							<h2>{title}</h2>
							<p>{data.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="participations-container">
			<div class="participations-heading sub-section-heading">
				<h2 class="participations-title sub-section-title">Participações</h2>
				<p class="participations-description sub-section-description">Check out some of my experiences</p>
			</div>
			<div class="single-participations-tag">
				<h3>Educação</h3>
				<div class="education-content" id="education">
					{#each educationList as [title, d]}
						<div class="participation-item">
							<span class="item-arrow"></span>
							<h5 class="item-title">{title}</h5>
							<span class="item-carrer">{d.carrer}</span>
							<span class="item-details">{d.institution || d.company}</span>
							<span class="item-location">{d.location} / {d.dates}</span>
							<p class="item-description">{d.description}</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="single-participations-tag">
				<h3>Experiência</h3>
				<div class="experience-content" id="experience">
					{#each experienceList as [title, d]}
						<div class="participation-item">
							<span class="item-arrow"></span>
							<h5 class="item-title">{title}</h5>
							<span class="item-carrer">{d.carrer}</span>
							<span class="item-details">{d.institution || d.company}</span>
							<span class="item-location">{d.location} / {d.dates}</span>
							<p class="item-description">{d.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="skills-container">
			<div class="skills-heading sub-section-heading">
				<h2 class="skills-title sub-section-title">Competências</h2>
				<p class="skills-description sub-section-description">My level of knowledge in some tools</p>
			</div>
			<div class="skills-content" id="skills">
				{#each skillCategories as [category, list]}
					<div class="skill-category" class:open={openCategory === category}>
						<div class="skill-category-header" onclick={() => toggle(category)} role="button" tabindex="0">
							{category} <span class="toggle-sign"></span>
						</div>
						{#if openCategory === category}
							<div class="skill-list" transition:slide={{ duration: 400 }} style="padding-top:20px;padding-bottom:20px;">
								{#each Object.entries(list) as [name, level]}
									<div class="skill-item">
										<div class="skill-name">{name}</div>
										<div class="skill-progress-bar">
											<div class="skill-progress" style="width:{level};">
												<div class="skill-level">{level}</div>
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
