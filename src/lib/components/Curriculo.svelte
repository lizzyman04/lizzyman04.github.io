<script>
	import { slide } from 'svelte/transition';

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
		<h2 class="section-title">CURRÍCULO</h2>
		<p class="section-description">Get to know me</p>
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
				<h2 class="content-subtitle">Quem sou eu?</h2>
				<h6 class="content-title">{profile.presentation}</h6>
				<div class="resume-d">
					<p>{profile.resume}</p>
				</div>
				<address class="content-info">
					<div class="row f-row">
						<div class="s-info"><span>Nome:</span>
							<p>{profile.name}</p>
						</div>
						<div class="s-info"><span>Idade:</span>
							<p>{profile.age} anos</p>
						</div>
					</div>
					<div class="row l-row">
						<div class="s-info"><span>Email:</span>
							<p><a href="mailto:{profile.email}">{profile.email}</a></p>
						</div>
						<div class="s-info"><span>Naturalidade:</span>
							<p>{profile.place_of_birth}</p>
						</div>
					</div>
				</address>
				<div class="link-content">
					{#if profile.cv_link}
						<a href={profile.cv_link} target="_blank" rel="noopener">
							<button class="content-download">CURRICULUM VITAE</button>
						</a>
					{/if}
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
				{#each abilities as a}
					<div class="ability">
						<div class="ability-img"><img src={a.image} alt={a.title} /></div>
						<div class="ability-description">
							<h2>{a.title}</h2>
							<p>{a.description}</p>
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
					{#each education as d}
						<div class="participation-item">
							<span class="item-arrow"></span>
							<h5 class="item-title">{d.title}</h5>
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
					{#each experience as d}
						<div class="participation-item">
							<span class="item-arrow"></span>
							<h5 class="item-title">{d.title}</h5>
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
				{#each skills as cat}
					<div class="skill-category" class:open={openCategory === cat.id}>
						<div class="skill-category-header" onclick={() => toggle(cat.id)} role="button" tabindex="0">
							{cat.name} <span class="toggle-sign"></span>
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
