'use client';

import { useEffect } from 'react';
import type { MouseEvent } from 'react';
import { GrRedo, GrUndo } from 'react-icons/gr';
import {
	LOGO_PRESETS,
	type LogoPresetValues,
} from '@/lib/logo-presets';
import { getLogoIconById } from '@/lib/logo-icons';
import useIconStore from '@/lib/store/iconStore';
import useIconBackgroundStore from '@/lib/store/iconBackgroundStore';
import useLogoEditorHistoryStore, {
	applyHistoryBatch,
	initializeLogoEditorHistory,
} from '@/lib/store/logoEditorHistoryStore';
import { cn } from '@/lib/utils';

function normalizeColor(color: string) {
	return color.trim().toLowerCase();
}

function isPresetActive(
	preset: LogoPresetValues,
	currentValues: LogoPresetValues,
) {
	return (
		preset.selectedIconId === currentValues.selectedIconId &&
		preset.size === currentValues.size &&
		preset.rotate === currentValues.rotate &&
		preset.borderWidth === currentValues.borderWidth &&
		normalizeColor(preset.borderColor) ===
			normalizeColor(currentValues.borderColor) &&
		preset.fillOpacity === currentValues.fillOpacity &&
		normalizeColor(preset.color) === normalizeColor(currentValues.color) &&
		preset.rounded === currentValues.rounded &&
		preset.padding === currentValues.padding &&
		preset.shadow === currentValues.shadow &&
		normalizeColor(preset.bgColor) === normalizeColor(currentValues.bgColor)
	);
}

const presetMap = new Map(LOGO_PRESETS.map((preset) => [preset.id, preset]));

const Presets = () => {
	const selectedIconId = useIconStore((state) => state.selectedIconId);
	const iconSize = useIconStore((state) => state.size);
	const iconRotate = useIconStore((state) => state.rotate);
	const iconBorderWidth = useIconStore((state) => state.borderWidth);
	const iconBorderColor = useIconStore((state) => state.borderColor);
	const iconFillOpacity = useIconStore((state) => state.fillOpacity);
	const iconColor = useIconStore((state) => state.color);

	const backgroundRounded = useIconBackgroundStore((state) => state.rounded);
	const backgroundPadding = useIconBackgroundStore((state) => state.padding);
	const backgroundShadow = useIconBackgroundStore((state) => state.shadow);
	const backgroundColor = useIconBackgroundStore((state) => state.bgColor);
	const pastLength = useLogoEditorHistoryStore((state) => state.past.length);
	const futureLength = useLogoEditorHistoryStore((state) => state.future.length);
	const undo = useLogoEditorHistoryStore((state) => state.undo);
	const redo = useLogoEditorHistoryStore((state) => state.redo);

	const currentValues: LogoPresetValues = {
		selectedIconId,
		size: iconSize,
		rotate: iconRotate,
		borderWidth: iconBorderWidth,
		borderColor: iconBorderColor,
		fillOpacity: iconFillOpacity,
		color: iconColor,
		rounded: backgroundRounded,
		padding: backgroundPadding,
		shadow: backgroundShadow,
		bgColor: backgroundColor,
	};

	useEffect(() => {
		initializeLogoEditorHistory();
	}, []);

	const applyPreset = (preset: LogoPresetValues) => {
		applyHistoryBatch(() => {
			useIconStore.setState({
				selectedIconId: preset.selectedIconId,
				size: preset.size,
				rotate: preset.rotate,
				borderWidth: preset.borderWidth,
				borderColor: preset.borderColor,
				fillOpacity: preset.fillOpacity,
				color: preset.color,
			});

			useIconBackgroundStore.setState({
				rounded: preset.rounded,
				padding: preset.padding,
				shadow: preset.shadow,
				bgColor: preset.bgColor,
			});
		});
	};

	const handlePresetClick = (event: MouseEvent<HTMLButtonElement>) => {
		const presetId = event.currentTarget.dataset.presetId;
		if (!presetId) {
			return;
		}

		const preset = presetMap.get(presetId);
		if (!preset) {
			return;
		}

		applyPreset(preset);
	};

	const canUndo = pastLength > 0;
	const canRedo = futureLength > 0;

	return (
		<div className="flex items-center gap-5">
			<button
				type="button"
				aria-label="Undo last edit"
				onClick={undo}
				disabled={!canUndo}
				className="text-muted-foreground hover:text-foreground disabled:text-muted-foreground/40 inline-flex size-9 items-center justify-center rounded-md border border-border transition-colors disabled:cursor-not-allowed"
			>
				<GrUndo size={18} />
			</button>
			<button
				type="button"
				aria-label="Redo last undone edit"
				onClick={redo}
				disabled={!canRedo}
				className="text-muted-foreground hover:text-foreground disabled:text-muted-foreground/40 inline-flex size-9 items-center justify-center rounded-md border border-border transition-colors disabled:cursor-not-allowed"
			>
				<GrRedo size={18} />
			</button>

			<div className="flex items-center justify-between gap-2 border-l border-border pl-4">
				<span className="hidden text-sm md:block">Presets</span>
				{LOGO_PRESETS.map((preset) => {
					const Icon = getLogoIconById(preset.selectedIconId).Icon;
					const active = isPresetActive(preset, currentValues);

					return (
						<button
							key={preset.id}
							type="button"
							aria-label={`Apply ${preset.name} preset`}
							title={preset.name}
							data-preset-id={preset.id}
							onClick={handlePresetClick}
							className={cn(
								'inline-flex size-10 items-center justify-center rounded-md border',
								active ? 'ring-2 ring-offset-2 ring-black' : '',
							)}
							style={{
								backgroundColor: preset.bgColor,
								color: preset.color,
								borderColor: active ? preset.color : 'transparent',
							}}
						>
							<Icon size={20} />
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Presets;
