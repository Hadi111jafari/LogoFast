export interface LogoPresetValues {
	selectedIconId: string
	size: number
	rotate: number
	borderWidth: number
	borderColor: string
	fillOpacity: number
	color: string
	rounded: number
	padding: number
	shadow: number
	bgColor: string
}

export interface LogoPreset extends LogoPresetValues {
	id: string
	name: string
}

export const DEFAULT_LOGO_EDITOR_VALUES: LogoPresetValues = {
	selectedIconId: 'bs-apple',
	size: 200,
	rotate: 0,
	borderWidth: 0,
	borderColor: '#000000',
	fillOpacity: 100,
	color: '#000000',
	rounded: 50,
	padding: 10,
	shadow: 1,
	bgColor: '#000000',
}

export const LOGO_PRESETS: LogoPreset[] = [
	{
		id: 'startup',
		name: 'Startup',
		selectedIconId: 'bs-rocket',
		size: 230,
		rotate: -8,
		borderWidth: 0,
		borderColor: '#fff7ed',
		fillOpacity: 100,
		color: '#fff7ed',
		rounded: 36,
		padding: 20,
		shadow: 4,
		bgColor: '#ea580c',
	},
	{
		id: 'eco',
		name: 'Eco',
		selectedIconId: 'io-leaf',
		size: 220,
		rotate: 0,
		borderWidth: 0,
		borderColor: '#dcfce7',
		fillOpacity: 100,
		color: '#dcfce7',
		rounded: 120,
		padding: 24,
		shadow: 2,
		bgColor: '#166534',
	},
	{
		id: 'secure',
		name: 'Secure',
		selectedIconId: 'bs-shield',
		size: 220,
		rotate: 0,
		borderWidth: 1,
		borderColor: '#dbeafe',
		fillOpacity: 100,
		color: '#eff6ff',
		rounded: 44,
		padding: 18,
		shadow: 3,
		bgColor: '#1d4ed8',
	},
	{
		id: 'creative',
		name: 'Creative',
		selectedIconId: 'bs-palette',
		size: 210,
		rotate: -12,
		borderWidth: 0,
		borderColor: '#fef3c7',
		fillOpacity: 100,
		color: '#fef3c7',
		rounded: 22,
		padding: 22,
		shadow: 2,
		bgColor: '#a16207',
	},
	{
		id: 'premium',
		name: 'Premium',
		selectedIconId: 'bs-gem',
		size: 215,
		rotate: 0,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		fillOpacity: 100,
		color: '#f9fafb',
		rounded: 52,
		padding: 18,
		shadow: 4,
		bgColor: '#111827',
	},
]
