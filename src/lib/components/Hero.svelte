<script>
	import { particles } from '$lib/actions/particles.js';
	import { txtRotate } from '$lib/actions/txtRotate.js';

	const roles = [' Freelancer.', ' Desenvolvedor.', ' Escritor.', ' Tutor.'];

	let { visible = true } = $props();
</script>

<section class="hero" id="home" style:display={visible ? 'block' : 'none'}>
	<div class="particles" id="particles-js" use:particles></div>
	<div class="bg-img">
		<picture>
			<source srcset="/img/bg.webp" type="image/webp" />
			<img src="/img/bg.webp" alt="" />
		</picture>
	</div>
	<div class="social-media-links">
		<a href="https://github.com/Lizzyman04" class="github-link"><span class="css-icon github-icon"></span></a>
		<a href="https://www.linkedin.com/in/arlindoabdul" class="linkedin-link" target="_blank"><span class="css-icon linkedin-icon"></span></a>
		<a href="https://tudocomlizzyman.com" class="blog-link"><span class="css-icon blog-icon"></span></a>
		<a href="https://www.instagram.com/tudocomlizzyman" class="instagram-link" target="_blank"><span class="css-icon instagram-icon"></span></a>
	</div>
	<div class="hi-container">
		<div class="hi">
			<h1 class="hi-pleasure"><span class="name">Arlindo</span> Abdul</h1>
			<div class="what-i-do">
				Sou um
				<span class="txt-rotate" use:txtRotate={{ words: roles, period: 2600 }}></span><span class="slash">|</span>
			</div>
		</div>
	</div>
	<div class="contact-links">
		<a href="mailto:admin@tudocomlizzyman.com" class="email-link"><span class="css-icon email-icon"></span></a>
		<a href="https://t.me/lizzyman04" class="telegram-link" target="_blank"><span class="css-icon telegram-icon"></span></a>
		<a href="https://wa.me/+258877603501" class="whatsapp-link" target="_blank"><span class="css-icon whatsapp-icon"></span></a>
		<a href="tel:+258877603501" class="tel-link" target="_blank"><span class="css-icon tel-icon"></span></a>
	</div>
</section>
