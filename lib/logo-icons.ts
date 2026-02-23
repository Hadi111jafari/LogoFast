import type { IconType } from 'react-icons'
import {
	BsApple,
	BsCameraFill,
	BsCartFill,
	BsCupHotFill,
	BsGem,
	BsGlobe2,
	BsLightningChargeFill,
	BsMusicNoteBeamed,
	BsPaletteFill,
	BsRocketTakeoffFill,
	BsShieldCheck,
	BsStars,
} from 'react-icons/bs'
import {
	FaAndroid,
	FaApple,
	FaAws,
	FaChrome,
	FaDiscord,
	FaDocker,
	FaFacebook,
	FaFigma,
	FaFirefox,
	FaGithub,
	FaGoogle,
	FaInstagram,
	FaLinux,
	FaNodeJs,
	FaReact,
	FaShopify,
	FaSlack,
	FaStripe,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa6'
import {
	IoBriefcase,
	IoBusiness,
	IoCamera,
	IoCart,
	IoCodeSlash,
	IoDiamond,
	IoFitness,
	IoFlame,
	IoFlash,
	IoGameController,
	IoGift,
	IoHome,
	IoLeaf,
	IoMusicalNotes,
	IoPlanet,
	IoRocket,
	IoSchool,
	IoShieldCheckmark,
	IoSparkles,
	IoTrophy,
} from 'react-icons/io5'

export interface LogoIconOption {
	id: string
	name: string
	keywords: string[]
	Icon: IconType
}

export const DEFAULT_LOGO_ICON_ID = 'bs-apple'

export const LOGO_ICONS: LogoIconOption[] = [
	{
		id: 'bs-apple',
		name: 'Apple',
		keywords: ['fruit', 'technology', 'minimal'],
		Icon: BsApple,
	},
	{
		id: 'bs-stars',
		name: 'Stars',
		keywords: ['sparkle', 'magic', 'creative'],
		Icon: BsStars,
	},
	{
		id: 'bs-rocket',
		name: 'Rocket',
		keywords: ['launch', 'startup', 'growth'],
		Icon: BsRocketTakeoffFill,
	},
	{
		id: 'bs-lightning',
		name: 'Lightning',
		keywords: ['speed', 'energy', 'fast'],
		Icon: BsLightningChargeFill,
	},
	{
		id: 'bs-camera',
		name: 'Camera',
		keywords: ['photo', 'media', 'studio'],
		Icon: BsCameraFill,
	},
	{
		id: 'bs-palette',
		name: 'Palette',
		keywords: ['design', 'art', 'color'],
		Icon: BsPaletteFill,
	},
	{
		id: 'bs-music',
		name: 'Music',
		keywords: ['audio', 'sound', 'artist'],
		Icon: BsMusicNoteBeamed,
	},
	{
		id: 'bs-gem',
		name: 'Gem',
		keywords: ['premium', 'luxury', 'brand'],
		Icon: BsGem,
	},
	{
		id: 'bs-globe',
		name: 'Globe',
		keywords: ['world', 'global', 'travel'],
		Icon: BsGlobe2,
	},
	{
		id: 'bs-shield',
		name: 'Shield',
		keywords: ['secure', 'trust', 'protection'],
		Icon: BsShieldCheck,
	},
	{
		id: 'bs-cart',
		name: 'Cart',
		keywords: ['shop', 'store', 'commerce'],
		Icon: BsCartFill,
	},
	{
		id: 'bs-coffee',
		name: 'Coffee',
		keywords: ['cafe', 'food', 'morning'],
		Icon: BsCupHotFill,
	},
	{
		id: 'fa-react',
		name: 'React',
		keywords: ['frontend', 'javascript', 'web'],
		Icon: FaReact,
	},
	{
		id: 'fa-node',
		name: 'Node.js',
		keywords: ['backend', 'server', 'javascript'],
		Icon: FaNodeJs,
	},
	{
		id: 'fa-github',
		name: 'GitHub',
		keywords: ['code', 'repository', 'developer'],
		Icon: FaGithub,
	},
	{
		id: 'fa-figma',
		name: 'Figma',
		keywords: ['design', 'ui', 'collaboration'],
		Icon: FaFigma,
	},
	{
		id: 'fa-aws',
		name: 'AWS',
		keywords: ['cloud', 'infrastructure', 'hosting'],
		Icon: FaAws,
	},
	{
		id: 'fa-stripe',
		name: 'Stripe',
		keywords: ['payment', 'checkout', 'finance'],
		Icon: FaStripe,
	},
	{
		id: 'fa-shopify',
		name: 'Shopify',
		keywords: ['ecommerce', 'store', 'sales'],
		Icon: FaShopify,
	},
	{
		id: 'fa-discord',
		name: 'Discord',
		keywords: ['community', 'chat', 'gaming'],
		Icon: FaDiscord,
	},
	{
		id: 'fa-slack',
		name: 'Slack',
		keywords: ['team', 'communication', 'work'],
		Icon: FaSlack,
	},
	{
		id: 'fa-youtube',
		name: 'YouTube',
		keywords: ['video', 'content', 'media'],
		Icon: FaYoutube,
	},
	{
		id: 'fa-instagram',
		name: 'Instagram',
		keywords: ['social', 'photo', 'brand'],
		Icon: FaInstagram,
	},
	{
		id: 'fa-twitter',
		name: 'Twitter',
		keywords: ['x', 'social', 'post'],
		Icon: FaTwitter,
	},
	{
		id: 'fa-facebook',
		name: 'Facebook',
		keywords: ['social', 'community', 'network'],
		Icon: FaFacebook,
	},
	{
		id: 'fa-google',
		name: 'Google',
		keywords: ['search', 'internet', 'engine'],
		Icon: FaGoogle,
	},
	{
		id: 'fa-chrome',
		name: 'Chrome',
		keywords: ['browser', 'web', 'internet'],
		Icon: FaChrome,
	},
	{
		id: 'fa-firefox',
		name: 'Firefox',
		keywords: ['browser', 'web', 'internet'],
		Icon: FaFirefox,
	},
	{
		id: 'fa-linux',
		name: 'Linux',
		keywords: ['open source', 'os', 'developer'],
		Icon: FaLinux,
	},
	{
		id: 'fa-android',
		name: 'Android',
		keywords: ['mobile', 'phone', 'google'],
		Icon: FaAndroid,
	},
	{
		id: 'fa-apple',
		name: 'Apple Brand',
		keywords: ['ios', 'device', 'technology'],
		Icon: FaApple,
	},
	{
		id: 'fa-docker',
		name: 'Docker',
		keywords: ['container', 'devops', 'deployment'],
		Icon: FaDocker,
	},
	{
		id: 'io-sparkles',
		name: 'Sparkles',
		keywords: ['shine', 'creative', 'magic'],
		Icon: IoSparkles,
	},
	{
		id: 'io-rocket',
		name: 'Rocket Outline',
		keywords: ['startup', 'fast', 'growth'],
		Icon: IoRocket,
	},
	{
		id: 'io-planet',
		name: 'Planet',
		keywords: ['space', 'orbit', 'global'],
		Icon: IoPlanet,
	},
	{
		id: 'io-leaf',
		name: 'Leaf',
		keywords: ['nature', 'eco', 'green'],
		Icon: IoLeaf,
	},
	{
		id: 'io-diamond',
		name: 'Diamond',
		keywords: ['luxury', 'quality', 'premium'],
		Icon: IoDiamond,
	},
	{
		id: 'io-shield',
		name: 'Shield Check',
		keywords: ['safe', 'security', 'verified'],
		Icon: IoShieldCheckmark,
	},
	{
		id: 'io-flame',
		name: 'Flame',
		keywords: ['hot', 'energy', 'bold'],
		Icon: IoFlame,
	},
	{
		id: 'io-flash',
		name: 'Flash',
		keywords: ['electric', 'quick', 'power'],
		Icon: IoFlash,
	},
	{
		id: 'io-gift',
		name: 'Gift',
		keywords: ['box', 'present', 'offer'],
		Icon: IoGift,
	},
	{
		id: 'io-trophy',
		name: 'Trophy',
		keywords: ['winner', 'award', 'achievement'],
		Icon: IoTrophy,
	},
	{
		id: 'io-game',
		name: 'Game Controller',
		keywords: ['gaming', 'console', 'play'],
		Icon: IoGameController,
	},
	{
		id: 'io-fitness',
		name: 'Fitness',
		keywords: ['sport', 'health', 'gym'],
		Icon: IoFitness,
	},
	{
		id: 'io-music',
		name: 'Music Notes',
		keywords: ['song', 'audio', 'sound'],
		Icon: IoMusicalNotes,
	},
	{
		id: 'io-camera',
		name: 'Camera Outline',
		keywords: ['photo', 'record', 'media'],
		Icon: IoCamera,
	},
	{
		id: 'io-briefcase',
		name: 'Briefcase',
		keywords: ['company', 'work', 'business'],
		Icon: IoBriefcase,
	},
	{
		id: 'io-school',
		name: 'School',
		keywords: ['education', 'learning', 'academy'],
		Icon: IoSchool,
	},
	{
		id: 'io-business',
		name: 'Business',
		keywords: ['office', 'building', 'enterprise'],
		Icon: IoBusiness,
	},
	{
		id: 'io-cart',
		name: 'Cart Outline',
		keywords: ['shopping', 'retail', 'store'],
		Icon: IoCart,
	},
	{
		id: 'io-home',
		name: 'Home',
		keywords: ['house', 'real estate', 'property'],
		Icon: IoHome,
	},
	{
		id: 'io-code',
		name: 'Code',
		keywords: ['developer', 'software', 'programming'],
		Icon: IoCodeSlash,
	},
]

const defaultIcon =
	LOGO_ICONS.find((icon) => icon.id === DEFAULT_LOGO_ICON_ID) ?? LOGO_ICONS[0]

const iconMap = new Map(LOGO_ICONS.map((icon) => [icon.id, icon]))

export function getLogoIconById(iconId: string) {
	return iconMap.get(iconId) ?? defaultIcon
}
