'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { LOGO_ICONS } from '@/lib/logo-icons';
import { cn } from '@/lib/utils';

interface IconsMenuProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedIconId: string;
	onSelectIcon: (iconId: string) => void;
}

function IconsMenu({
	open,
	onOpenChange,
	selectedIconId,
	onSelectIcon,
}: IconsMenuProps) {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredIcons = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		if (!normalizedSearch) {
			return LOGO_ICONS;
		}

		return LOGO_ICONS.filter((icon) => {
			const name = icon.name.toLowerCase();
			const keywords = icon.keywords.join(' ').toLowerCase();

			return (
				name.includes(normalizedSearch) ||
				keywords.includes(normalizedSearch)
			);
		});
	}, [searchTerm]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			setSearchTerm('');
		}

		onOpenChange(nextOpen);
	};

	const handleSelect = (iconId: string) => {
		onSelectIcon(iconId);
		handleOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-balance">
						Choose an icon
					</DialogTitle>
					<DialogDescription className="text-pretty">
						Search and select the icon you want to use for your logo.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-3">
					<div className="relative">
						<Search
							className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2"
							aria-hidden="true"
						/>
						<Input
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder="Search icons..."
							className="pl-9"
						/>
					</div>

					<div className="no-scrollbar max-h-[55vh] overflow-y-auto pr-1">
						{filteredIcons.length === 0 ? (
							<div className="text-muted-foreground py-8 text-center text-sm">
								No icons matched your search.
							</div>
						) : (
							<div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
								{filteredIcons.map((icon) => {
									const Icon = icon.Icon;
									const isSelected = icon.id === selectedIconId;

									return (
										<button
											key={icon.id}
											type="button"
											aria-label={`Select ${icon.name}`}
											onClick={() => handleSelect(icon.id)}
											className={cn(
												'hover:bg-muted/60 flex min-h-18 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border p-2 transition-colors',
												isSelected
													? 'border-primary bg-muted'
													: 'border-border',
											)}
										>
											<Icon size={22} />
											<span className="w-full truncate text-center text-[11px] leading-tight">
												{icon.name}
											</span>
										</button>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default IconsMenu;
