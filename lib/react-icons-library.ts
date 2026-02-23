import type { IconType } from 'react-icons'

const REACT_ICON_ID_PREFIX = 'ri:'

const REACT_ICON_PACKS = [
	'ai',
	'bi',
	'bs',
	'cg',
	'ci',
	'di',
	'fa',
	'fa6',
	'fc',
	'fi',
	'gi',
	'go',
	'gr',
	'hi',
	'hi2',
	'im',
	'io',
	'io5',
	'lia',
	'lu',
	'md',
	'pi',
	'ri',
	'rx',
	'si',
	'sl',
	'tb',
	'tfi',
	'ti',
	'vsc',
	'wi',
] as const

export type ReactIconPackId = (typeof REACT_ICON_PACKS)[number]

const PACK_LABELS: Record<ReactIconPackId, string> = {
	ai: 'Ant Design',
	bi: 'Bootstrap Icons',
	bs: 'Bootstrap Icons',
	cg: 'CSS.gg',
	ci: 'Circum Icons',
	di: 'Devicons',
	fa: 'Font Awesome',
	fa6: 'Font Awesome 6',
	fc: 'Flat Color Icons',
	fi: 'Feather',
	gi: 'Game Icons',
	go: 'Github Octicons',
	gr: 'Grommet',
	hi: 'Heroicons',
	hi2: 'Heroicons 2',
	im: 'IcoMoon Free',
	io: 'Ionicons 4',
	io5: 'Ionicons 5',
	lia: 'Line Awesome',
	lu: 'Lucide',
	md: 'Material Design',
	pi: 'Phosphor',
	ri: 'Remix Icon',
	rx: 'Radix Icons',
	si: 'Simple Icons',
	sl: 'Simple Line Icons',
	tb: 'Tabler',
	tfi: 'Themify',
	ti: 'Typicons',
	vsc: 'VS Code Icons',
	wi: 'Weather Icons',
}

const PACK_COMPONENT_PREFIXES: Record<ReactIconPackId, string> = {
	ai: 'Ai',
	bi: 'Bi',
	bs: 'Bs',
	cg: 'Cg',
	ci: 'Ci',
	di: 'Di',
	fa: 'Fa',
	fa6: 'Fa',
	fc: 'Fc',
	fi: 'Fi',
	gi: 'Gi',
	go: 'Go',
	gr: 'Gr',
	hi: 'Hi',
	hi2: 'Hi',
	im: 'Im',
	io: 'Io',
	io5: 'Io',
	lia: 'Lia',
	lu: 'Lu',
	md: 'Md',
	pi: 'Pi',
	ri: 'Ri',
	rx: 'Rx',
	si: 'Si',
	sl: 'Sl',
	tb: 'Tb',
	tfi: 'Tfi',
	ti: 'Ti',
	vsc: 'Vsc',
	wi: 'Wi',
}

type IconModule = Record<string, unknown>

const PACK_LOADERS: Record<ReactIconPackId, () => Promise<IconModule>> = {
	ai: () => import('react-icons/ai'),
	bi: () => import('react-icons/bi'),
	bs: () => import('react-icons/bs'),
	cg: () => import('react-icons/cg'),
	ci: () => import('react-icons/ci'),
	di: () => import('react-icons/di'),
	fa: () => import('react-icons/fa'),
	fa6: () => import('react-icons/fa6'),
	fc: () => import('react-icons/fc'),
	fi: () => import('react-icons/fi'),
	gi: () => import('react-icons/gi'),
	go: () => import('react-icons/go'),
	gr: () => import('react-icons/gr'),
	hi: () => import('react-icons/hi'),
	hi2: () => import('react-icons/hi2'),
	im: () => import('react-icons/im'),
	io: () => import('react-icons/io'),
	io5: () => import('react-icons/io5'),
	lia: () => import('react-icons/lia'),
	lu: () => import('react-icons/lu'),
	md: () => import('react-icons/md'),
	pi: () => import('react-icons/pi'),
	ri: () => import('react-icons/ri'),
	rx: () => import('react-icons/rx'),
	si: () => import('react-icons/si'),
	sl: () => import('react-icons/sl'),
	tb: () => import('react-icons/tb'),
	tfi: () => import('react-icons/tfi'),
	ti: () => import('react-icons/ti'),
	vsc: () => import('react-icons/vsc'),
	wi: () => import('react-icons/wi'),
}

interface ParsedReactIconId {
	packId: ReactIconPackId
	iconName: string
}

interface IndexedReactIcon {
	id: string
	name: string
	pack: ReactIconPackId
	packLabel: string
	iconName: string
	searchText: string
}

export interface ReactIconSearchResult {
	id: string
	name: string
	pack: ReactIconPackId
	packLabel: string
	iconName: string
}

const moduleCache = new Map<ReactIconPackId, Promise<IconModule>>()
const packIndexCache = new Map<ReactIconPackId, IndexedReactIcon[]>()

function toWords(value: string) {
	return value
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
		.replace(/(\d+)/g, ' $1 ')
		.trim()
}

function normalize(value: string) {
	return value.trim().toLowerCase()
}

function parseReactIconId(iconId: string): ParsedReactIconId | null {
	if (!iconId.startsWith(REACT_ICON_ID_PREFIX)) {
		return null
	}

	const rawValue = iconId.slice(REACT_ICON_ID_PREFIX.length)
	const separatorIndex = rawValue.indexOf(':')

	if (separatorIndex <= 0) {
		return null
	}

	const rawPackId = rawValue.slice(0, separatorIndex)
	const iconName = rawValue.slice(separatorIndex + 1)

	if (!iconName || !REACT_ICON_PACKS.includes(rawPackId as ReactIconPackId)) {
		return null
	}

	return {
		packId: rawPackId as ReactIconPackId,
		iconName,
	}
}

function createReactIconId(packId: ReactIconPackId, iconName: string) {
	return `${REACT_ICON_ID_PREFIX}${packId}:${iconName}`
}

function removeComponentPrefix(packId: ReactIconPackId, iconName: string) {
	const prefix = PACK_COMPONENT_PREFIXES[packId]
	return iconName.startsWith(prefix) ? iconName.slice(prefix.length) : iconName
}

function isIconExport(name: string, value: unknown): value is IconType {
	return /^[A-Z]/.test(name) && typeof value === 'function'
}

function getMatchRank(candidate: IndexedReactIcon, normalizedQuery: string) {
	const normalizedName = normalize(candidate.name)
	const normalizedIconName = normalize(candidate.iconName)

	if (
		normalizedName === normalizedQuery ||
		normalizedIconName === normalizedQuery
	) {
		return 0
	}

	if (
		normalizedName.startsWith(normalizedQuery) ||
		normalizedIconName.startsWith(normalizedQuery)
	) {
		return 1
	}

	const words = normalizedName.split(' ')
	if (words.some((word) => word.startsWith(normalizedQuery))) {
		return 2
	}

	return 3
}

async function getPackModule(packId: ReactIconPackId) {
	const cachedModule = moduleCache.get(packId)

	if (cachedModule) {
		return cachedModule
	}

	const modulePromise = PACK_LOADERS[packId]()
	moduleCache.set(packId, modulePromise)
	return modulePromise
}

async function getPackIndex(packId: ReactIconPackId) {
	const cachedIndex = packIndexCache.get(packId)

	if (cachedIndex) {
		return cachedIndex
	}

	const iconModule = await getPackModule(packId)
	const packLabel = PACK_LABELS[packId]
	const indexedIcons = Object.entries(iconModule)
		.filter(([name, value]) => isIconExport(name, value))
		.map(([iconName]) => {
			const iconLabel = toWords(removeComponentPrefix(packId, iconName))
			const searchText = normalize(
				`${iconName} ${iconLabel} ${packId} ${packLabel}`,
			)

			return {
				id: createReactIconId(packId, iconName),
				name: iconLabel,
				pack: packId,
				packLabel,
				iconName,
				searchText,
			}
		})
		.sort((first, second) => first.name.localeCompare(second.name))

	packIndexCache.set(packId, indexedIcons)
	return indexedIcons
}

export function isReactIconId(iconId: string) {
	return parseReactIconId(iconId) !== null
}

export async function getReactIconById(iconId: string) {
	const parsedIconId = parseReactIconId(iconId)

	if (!parsedIconId) {
		return null
	}

	const iconModule = await getPackModule(parsedIconId.packId)
	const iconCandidate = iconModule[parsedIconId.iconName]

	if (!isIconExport(parsedIconId.iconName, iconCandidate)) {
		return null
	}

	return iconCandidate
}

interface SearchReactIconsOptions {
	limit?: number
}

export async function searchReactIcons(
	query: string,
	options: SearchReactIconsOptions = {},
) {
	const normalizedQuery = normalize(query)

	if (normalizedQuery.length < 2) {
		return [] as ReactIconSearchResult[]
	}

	const limit = options.limit ?? 80
	const matches: IndexedReactIcon[] = []

	for (const packId of REACT_ICON_PACKS) {
		const packIcons = await getPackIndex(packId)
		const matchingIcons = packIcons.filter((icon) =>
			icon.searchText.includes(normalizedQuery),
		)

		matches.push(...matchingIcons)

		if (matches.length >= limit * 2) {
			break
		}
	}

	const rankedResults = matches
		.sort((first, second) => {
			const firstRank = getMatchRank(first, normalizedQuery)
			const secondRank = getMatchRank(second, normalizedQuery)

			if (firstRank !== secondRank) {
				return firstRank - secondRank
			}

			if (first.name.length !== second.name.length) {
				return first.name.length - second.name.length
			}

			return first.name.localeCompare(second.name)
		})
		.slice(0, limit)
		.map(({ id, name, pack, packLabel, iconName }) => ({
			id,
			name,
			pack,
			packLabel,
			iconName,
		}))

	return rankedResults
}
