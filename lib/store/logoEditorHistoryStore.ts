import { create } from 'zustand'
import useIconStore from './iconStore'
import useIconBackgroundStore from './iconBackgroundStore'
import type { LogoPresetValues } from '@/lib/logo-presets'

interface LogoEditorHistoryState {
	past: LogoPresetValues[]
	future: LogoPresetValues[]
	undo: () => void
	redo: () => void
	clear: () => void
}

const MAX_HISTORY_ITEMS = 120

let initialized = false
let pauseTracking = false
let lastSnapshot: LogoPresetValues | null = null

function getCurrentSnapshot(): LogoPresetValues {
	const iconState = useIconStore.getState()
	const backgroundState = useIconBackgroundStore.getState()

	return {
		selectedIconId: iconState.selectedIconId,
		size: iconState.size,
		rotate: iconState.rotate,
		borderWidth: iconState.borderWidth,
		borderColor: iconState.borderColor,
		fillOpacity: iconState.fillOpacity,
		color: iconState.color,
		rounded: backgroundState.rounded,
		padding: backgroundState.padding,
		shadow: backgroundState.shadow,
		bgColor: backgroundState.bgColor,
	}
}

function normalizeColor(color: string) {
	return color.trim().toLowerCase()
}

function areSnapshotsEqual(
	first: LogoPresetValues,
	second: LogoPresetValues,
) {
	return (
		first.selectedIconId === second.selectedIconId &&
		first.size === second.size &&
		first.rotate === second.rotate &&
		first.borderWidth === second.borderWidth &&
		normalizeColor(first.borderColor) === normalizeColor(second.borderColor) &&
		first.fillOpacity === second.fillOpacity &&
		normalizeColor(first.color) === normalizeColor(second.color) &&
		first.rounded === second.rounded &&
		first.padding === second.padding &&
		first.shadow === second.shadow &&
		normalizeColor(first.bgColor) === normalizeColor(second.bgColor)
	)
}

function pushToPast(
	past: LogoPresetValues[],
	snapshot: LogoPresetValues,
) {
	const nextPast = [...past, snapshot]

	if (nextPast.length <= MAX_HISTORY_ITEMS) {
		return nextPast
	}

	return nextPast.slice(nextPast.length - MAX_HISTORY_ITEMS)
}

function trackStoreChange() {
	if (pauseTracking) {
		return
	}

	const snapshot = getCurrentSnapshot()

	if (!lastSnapshot) {
		lastSnapshot = snapshot
		return
	}

	if (areSnapshotsEqual(snapshot, lastSnapshot)) {
		return
	}

	useLogoEditorHistoryStore.setState((state) => ({
		past: pushToPast(state.past, lastSnapshot as LogoPresetValues),
		future: [],
	}))

	lastSnapshot = snapshot
}

function applySnapshot(snapshot: LogoPresetValues) {
	useIconStore.setState({
		selectedIconId: snapshot.selectedIconId,
		size: snapshot.size,
		rotate: snapshot.rotate,
		borderWidth: snapshot.borderWidth,
		borderColor: snapshot.borderColor,
		fillOpacity: snapshot.fillOpacity,
		color: snapshot.color,
	})

	useIconBackgroundStore.setState({
		rounded: snapshot.rounded,
		padding: snapshot.padding,
		shadow: snapshot.shadow,
		bgColor: snapshot.bgColor,
	})
}

export function initializeLogoEditorHistory() {
	if (initialized) {
		return
	}

	lastSnapshot = getCurrentSnapshot()

	useIconStore.subscribe(() => {
		trackStoreChange()
	})

	useIconBackgroundStore.subscribe(() => {
		trackStoreChange()
	})

	initialized = true
}

export function applyHistoryBatch(updateFn: () => void) {
	initializeLogoEditorHistory()

	const before = getCurrentSnapshot()
	pauseTracking = true

	try {
		updateFn()
	} finally {
		pauseTracking = false
	}

	const after = getCurrentSnapshot()

	if (areSnapshotsEqual(before, after)) {
		lastSnapshot = after
		return
	}

	useLogoEditorHistoryStore.setState((state) => ({
		past: pushToPast(state.past, before),
		future: [],
	}))

	lastSnapshot = after
}

const useLogoEditorHistoryStore = create<LogoEditorHistoryState>(
	(set, get) => ({
		past: [],
		future: [],
		undo: () => {
			initializeLogoEditorHistory()

			const { past, future } = get()
			const previous = past[past.length - 1]

			if (!previous) {
				return
			}

			const current = getCurrentSnapshot()
			pauseTracking = true

			try {
				applySnapshot(previous)
			} finally {
				pauseTracking = false
			}

			lastSnapshot = previous

			set({
				past: past.slice(0, -1),
				future: [current, ...future],
			})
		},
		redo: () => {
			initializeLogoEditorHistory()

			const { past, future } = get()
			const next = future[0]

			if (!next) {
				return
			}

			const current = getCurrentSnapshot()
			pauseTracking = true

			try {
				applySnapshot(next)
			} finally {
				pauseTracking = false
			}

			lastSnapshot = next

			set({
				past: pushToPast(past, current),
				future: future.slice(1),
			})
		},
		clear: () => {
			lastSnapshot = getCurrentSnapshot()
			set({
				past: [],
				future: [],
			})
		},
	}),
)

export default useLogoEditorHistoryStore
