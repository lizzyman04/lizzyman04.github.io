import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const LOCALES = ['pt', 'en'];
export const DEFAULT_LOCALE = 'pt';

function initialLocale() {
	if (!browser) return DEFAULT_LOCALE;
	const stored = localStorage.getItem('locale');
	if (stored && LOCALES.includes(stored)) return stored;
	const nav = (navigator.language || '').slice(0, 2).toLowerCase();
	return LOCALES.includes(nav) ? nav : DEFAULT_LOCALE;
}

export const locale = writable(initialLocale());

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem('locale', value);
		// 1-year cookie so SSR / other sites in the family can read the choice.
		document.cookie = `locale=${value}; path=/; max-age=31536000; samesite=lax`;
		document.documentElement.lang = value;
	});
}

export function setLocale(value) {
	if (LOCALES.includes(value)) locale.set(value);
}

/**
 * Resolve a value that may be a per-locale map ({pt, en}) to the active locale,
 * falling back to pt then any available value. Plain strings/arrays pass through.
 */
export function pick(value, loc = DEFAULT_LOCALE) {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		const isLocaleMap = LOCALES.some((l) => l in value);
		if (isLocaleMap) {
			return value[loc] ?? value[DEFAULT_LOCALE] ?? Object.values(value)[0] ?? '';
		}
	}
	return value;
}

// --- Static UI strings -----------------------------------------------------

const messages = {
	pt: {
		'nav.about': 'CURRÍCULO',
		'nav.portfolio': 'PORTFÓLIO',
		'nav.introspection': 'INTROSPECÇÃO',
		'nav.contact': 'CONECTE-ME',

		'cv.title': 'CURRÍCULO',
		'cv.subtitle': 'Conheça-me melhor',
		'cv.whoami': 'Quem sou eu?',
		'cv.name': 'Nome',
		'cv.age': 'Idade',
		'cv.years': 'anos',
		'cv.email': 'Email',
		'cv.birthplace': 'Naturalidade',
		'cv.download': 'CURRICULUM VITAE',
		'cv.abilities': 'Habilidades',
		'cv.abilitiesDesc': 'Habilidades onde sou imbatível',
		'cv.participations': 'Participações',
		'cv.participationsDesc': 'Veja algumas das minhas experiências',
		'cv.education': 'Educação',
		'cv.experience': 'Experiência',
		'cv.skills': 'Competências',
		'cv.skillsDesc': 'O meu nível de conhecimento em algumas ferramentas',

		'pf.title': 'PORTFÓLIO',
		'pf.subtitle': 'Alguns dos meus trabalhos',
		'pf.seeMore': 'Clique-me para apreciar mais das minhas criações 🙃',

		'in.title': 'INTROSPECÇÃO',
		'in.subtitle': 'Como vejo o mundo',
		'in.seeMore': 'Clique-me para ver mais das minhas introspecções e momentos de aprendizado 🙃',

		'ct.title': 'CONECTE-ME',
		'ct.subtitle': 'Vamos conversar?',
		'ct.leaveMessage': 'Deixe-me um recado!',
		'ct.name': 'Nome',
		'ct.email': 'Correio electrónico',
		'ct.subject': 'Assunto',
		'ct.message': 'Mensagem',
		'ct.send': 'Entrar em contacto',
		'ct.wait': 'Aguarde...',
		'ct.sent': 'Recado deixado!',
		'ct.error': 'Um erro ocorreu!',
		'ct.okFeedback': 'Obrigado pela sua mensagem. Ela foi enviada.',
		'ct.errFeedback': 'Ocorreu um erro! Por favor, experimente outra forma de contacto.',
		'ct.howToFind': 'Como me encontrar?',
		'ct.howToFindDesc':
			'Estou comprometido em oferecer soluções criativas em todas as áreas em que atuo. Sinta-se à vontade para entrar em contacto comigo!',
		'ct.location': 'Localização',
		'ct.mobile': 'Celular',

		'nl.title': 'Newsletter',
		'nl.desc': 'Receba novidades, artigos e reflexões directamente no seu email.',
		'nl.placeholder': 'O seu correio electrónico',
		'nl.subscribe': 'Subscrever',
		'nl.wait': 'Aguarde...',
		'nl.subscribed': 'Subscrito!',
		'nl.retry': 'Tente novamente',
		'nl.success': 'Verifique o seu email para confirmar a subscrição.',

		'loader.again': (n) => `É sua ${n} vez aqui?`
	},
	en: {
		'nav.about': 'RÉSUMÉ',
		'nav.portfolio': 'PORTFOLIO',
		'nav.introspection': 'INTROSPECTION',
		'nav.contact': 'CONNECT',

		'cv.title': 'RÉSUMÉ',
		'cv.subtitle': 'Get to know me',
		'cv.whoami': 'Who am I?',
		'cv.name': 'Name',
		'cv.age': 'Age',
		'cv.years': 'years old',
		'cv.email': 'Email',
		'cv.birthplace': 'Birthplace',
		'cv.download': 'CURRICULUM VITAE',
		'cv.abilities': 'Abilities',
		'cv.abilitiesDesc': 'Skills where I am unbeatable',
		'cv.participations': 'Participations',
		'cv.participationsDesc': 'Check out some of my experiences',
		'cv.education': 'Education',
		'cv.experience': 'Experience',
		'cv.skills': 'Skills',
		'cv.skillsDesc': 'My level of knowledge in some tools',

		'pf.title': 'PORTFOLIO',
		'pf.subtitle': 'Some of my works',
		'pf.seeMore': 'Click me to enjoy more of my creations 🙃',

		'in.title': 'INTROSPECTION',
		'in.subtitle': 'How I see the world',
		'in.seeMore': 'Click me to see more of my introspections and learning moments 🙃',

		'ct.title': 'CONNECT',
		'ct.subtitle': "Let's talk?",
		'ct.leaveMessage': 'Leave me a message!',
		'ct.name': 'Name',
		'ct.email': 'Email',
		'ct.subject': 'Subject',
		'ct.message': 'Message',
		'ct.send': 'Get in Touch',
		'ct.wait': 'Please wait...',
		'ct.sent': 'Message sent!',
		'ct.error': 'An error occurred!',
		'ct.okFeedback': 'Thank you for your message. It has been sent.',
		'ct.errFeedback': 'Something went wrong! Please try another way to reach me.',
		'ct.howToFind': 'How to reach me?',
		'ct.howToFindDesc':
			'I am committed to delivering creative solutions in every area I work in. Feel free to get in touch with me!',
		'ct.location': 'Location',
		'ct.mobile': 'Mobile',

		'nl.title': 'Newsletter',
		'nl.desc': 'Get news, articles and reflections straight to your inbox.',
		'nl.placeholder': 'Your email',
		'nl.subscribe': 'Subscribe',
		'nl.wait': 'Please wait...',
		'nl.subscribed': 'Subscribed!',
		'nl.retry': 'Try again',
		'nl.success': 'Check your email to confirm your subscription.',

		'loader.again': (n) => `Is this your ${n} time here?`
	}
};

/** Translate a static UI key for the given locale. */
export function t(key, loc = DEFAULT_LOCALE) {
	const table = messages[loc] ?? messages[DEFAULT_LOCALE];
	return table[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
}
