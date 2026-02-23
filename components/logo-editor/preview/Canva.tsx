'use client';

import { useLogoIconComponent } from '@/hooks/use-logo-icon-component';
import { LOGO_EXPORT_TARGET_ID } from '@/lib/logo-editor';
import useIconBackgroundStore from '@/lib/store/iconBackgroundStore';
import useIconStore from '@/lib/store/iconStore';
import { cn } from '@/lib/utils';

const SHADOW_CLASSES = [
	'shadow-none',
	'shadow-sm',
	'shadow-md',
	'shadow-lg',
	'shadow-xl',
	'shadow-2xl',
] as const;

function getContrastColor(color: string) {
	const normalized = color.trim().toLowerCase();
	const hex = normalized.startsWith('#') ? normalized.slice(1) : normalized;

	if (hex.length !== 3 && hex.length !== 6) {
		return '#ffffff';
	}

	const fullHex =
		hex.length === 3 ? hex.split('').map((char) => `${char}${char}`).join('') : hex;

	const red = Number.parseInt(fullHex.slice(0, 2), 16);
	const green = Number.parseInt(fullHex.slice(2, 4), 16);
	const blue = Number.parseInt(fullHex.slice(4, 6), 16);

	const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
	return luminance > 150 ? '#111827' : '#ffffff';
}

const Canva = () => {
	const iconSize = useIconStore((state) => state.size);
	const selectedIconId = useIconStore((state) => state.selectedIconId);
	const iconRotate = useIconStore((state) => state.rotate);
	const iconBorderWidth = useIconStore((state) => state.borderWidth);
	const iconBorderColor = useIconStore((state) => state.borderColor);
	const iconFillOpacity = useIconStore((state) => state.fillOpacity);
	const iconFillColor = useIconStore((state) => state.color);

	const backgroundRounded = useIconBackgroundStore((state) => state.rounded);
	const backgroundPadding = useIconBackgroundStore((state) => state.padding);
	const backgroundShadowIndex = useIconBackgroundStore((state) => state.shadow);
	const backgroundColor = useIconBackgroundStore((state) => state.bgColor);
	const { Icon: SelectedIcon } = useLogoIconComponent(selectedIconId);

	const shadowClass =
		SHADOW_CLASSES[backgroundShadowIndex] ?? SHADOW_CLASSES[0];
	const normalizedOpacity = Math.min(Math.max(iconFillOpacity, 0), 100) / 100;
	const normalizedIconColor = iconFillColor.trim().toLowerCase();
	const normalizedBackgroundColor = backgroundColor.trim().toLowerCase();
	const shouldUseContrastColor =
		iconBorderWidth === 0 && normalizedIconColor === normalizedBackgroundColor;
	const visibleIconColor = shouldUseContrastColor
		? getContrastColor(backgroundColor)
		: iconFillColor;

	return (
		<div
			className="bg-base-200/50 flex min-h-0 w-full justify-center overflow-hidden rounded-md border border-border lg:h-full lg:overflow-auto lg:overscroll-contain lg:rounded-none lg:border-0"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath opacity='.3' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
			}}
		>
			<div className="mx-auto py-8 md:py-10">
				<div
					className="outline-2 outline-dashed outline-[#9C92AC20] hover:outline-[#9C92AC50] bg-[#9C92AC15] hover:bg-[#9C92AC25] duration-100 overflow-hidden"
					data-tooltip-id="tooltip-logofast"
					data-tooltip-content="Downloadable zone"
				>
						<div
							id={LOGO_EXPORT_TARGET_ID}
							className="bg-transparent size-[min(88vw,360px)] sm:size-[min(78vw,520px)] lg:size-[400px] xl:size-[600px]"
							style={{ padding: `${backgroundPadding}px` }}
						>
							<div
								className={cn(
									'size-full overflow-hidden flex justify-center items-center',
									shadowClass,
								)}
								style={{
									background: backgroundColor,
									borderRadius: `${backgroundRounded}px`,
								}}
							>
								<span
									className="shrink-0 leading-none"
									style={{ transform: `rotate(${iconRotate}deg)` }}
								>
									<SelectedIcon
										size={iconSize}
										color={visibleIconColor}
										fillOpacity={normalizedOpacity}
										style={{
											display: 'block',
											stroke: iconBorderColor,
											strokeWidth: iconBorderWidth,
										}}
									/>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Canva;
