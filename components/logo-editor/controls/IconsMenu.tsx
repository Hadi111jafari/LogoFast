'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useLogoIconComponent } from '@/hooks/use-logo-icon-component';
import { LOGO_ICONS } from '@/lib/logo-icons';
import {
	searchReactIcons,
	type ReactIconSearchResult,
} from '@/lib/react-icons-library';
import { cn } from '@/lib/utils';

interface IconsMenuProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedIconId: string;
	onSelectIcon: (iconId: string) => void;
}

const MIN_LIBRARY_SEARCH_LENGTH = 2;
const MAX_LIBRARY_RESULTS = 120;
const SEARCH_DEBOUNCE_MS = 150;

interface LibraryIconPreviewProps {
	iconId: string;
}

function LibraryIconPreview({ iconId }: LibraryIconPreviewProps) {
	const { Icon, isLoading } = useLogoIconComponent(iconId);

	if (isLoading) {
		return <span aria-hidden="true" className="size-[22px]" />;
	}

	return <Icon size={22} />;
}

function IconsMenu({
	open,
	onOpenChange,
	selectedIconId,
	onSelectIcon,
}: IconsMenuProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [libraryResults, setLibraryResults] = useState<ReactIconSearchResult[]>(
		[],
	);
	const [isSearchingLibrary, setIsSearchingLibrary] = useState(false);
	const requestIdRef = useRef(0);
	const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const normalizedSearchTerm = searchTerm.trim().toLowerCase();

	const filteredCuratedIcons = useMemo(() => {
		if (!normalizedSearchTerm) {
			return LOGO_ICONS;
		}

		return LOGO_ICONS.filter((icon) => {
			const name = icon.name.toLowerCase();
			const keywords = icon.keywords.join(' ').toLowerCase();

			return (
				name.includes(normalizedSearchTerm) ||
				keywords.includes(normalizedSearchTerm)
			);
		});
	}, [normalizedSearchTerm]);

	const runLibrarySearch = async (
		normalizedTerm: string,
		requestId: number,
	) => {
		try {
			const results = await searchReactIcons(normalizedTerm, {
				limit: MAX_LIBRARY_RESULTS,
			});

			if (requestId !== requestIdRef.current) {
				return;
			}

			setLibraryResults(results);
			setIsSearchingLibrary(false);
		} catch {
			if (requestId !== requestIdRef.current) {
				return;
			}

			setLibraryResults([]);
			setIsSearchingLibrary(false);
		}
	};

	const filteredLibraryIcons = useMemo(() => {
		if (libraryResults.length === 0) {
			return [] as ReactIconSearchResult[];
		}

		const curatedNames = new Set(
			filteredCuratedIcons.map((icon) => icon.name.toLowerCase()),
		);

		return libraryResults.filter(
			(icon) => !curatedNames.has(icon.name.toLowerCase()),
		);
	}, [filteredCuratedIcons, libraryResults]);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			requestIdRef.current += 1;
		};
	}, []);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
				debounceTimerRef.current = null;
			}

			requestIdRef.current += 1;
			setSearchTerm('');
			setLibraryResults([]);
			setIsSearchingLibrary(false);
		}

		onOpenChange(nextOpen);
	};

	const handleSearchChange = (nextSearchTerm: string) => {
		setSearchTerm(nextSearchTerm);
		const normalizedTerm = nextSearchTerm.trim().toLowerCase();

		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
			debounceTimerRef.current = null;
		}

		const requestId = requestIdRef.current + 1;
		requestIdRef.current = requestId;

		if (!open) {
			return;
		}

		if (normalizedTerm.length < MIN_LIBRARY_SEARCH_LENGTH) {
			setLibraryResults([]);
			setIsSearchingLibrary(false);
			return;
		}

		setIsSearchingLibrary(true);
		debounceTimerRef.current = setTimeout(() => {
			void runLibrarySearch(normalizedTerm, requestId);
		}, SEARCH_DEBOUNCE_MS);
	};

	const handleSelect = (iconId: string) => {
		onSelectIcon(iconId);
		handleOpenChange(false);
	};

	const shouldSearchLibrary =
		normalizedSearchTerm.length >= MIN_LIBRARY_SEARCH_LENGTH;
	const activeLibraryIcons = shouldSearchLibrary ? filteredLibraryIcons : [];
	const hasNoResults =
		filteredCuratedIcons.length === 0 &&
		activeLibraryIcons.length === 0 &&
		!isSearchingLibrary;

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
							onChange={(event) =>
								handleSearchChange(event.target.value)
							}
							placeholder="Search icons..."
							className="pl-9"
						/>
					</div>

					<div className="no-scrollbar max-h-[55vh] overflow-y-auto pr-1">
						{shouldSearchLibrary && isSearchingLibrary ? (
							<div className="text-muted-foreground py-2 text-xs">
								Searching your Icon...
							</div>
						) : null}

						{hasNoResults ? (
							<div className="text-muted-foreground py-8 text-center text-sm">
								No icons matched your search.
							</div>
						) : (
							<div className="space-y-4">
								{filteredCuratedIcons.length > 0 ? (
									<div>
										<div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
											{filteredCuratedIcons.map((icon) => {
												const Icon = icon.Icon;
												const isSelected =
													icon.id === selectedIconId;

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
									</div>
								) : null}

								{shouldSearchLibrary ? (
									<div>
										<div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
											{activeLibraryIcons.map((icon) => {
												const isSelected =
													icon.id === selectedIconId;

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
														<LibraryIconPreview
															iconId={icon.id}
														/>
														<span className="w-full truncate text-center text-[11px] leading-tight">
															{icon.name}
														</span>
														<span className="text-muted-foreground text-[10px] uppercase">
															{icon.pack}
														</span>
													</button>
												);
											})}
										</div>
									</div>
								) : (
									<div className="text-muted-foreground text-xs">
										Type at least {MIN_LIBRARY_SEARCH_LENGTH}{' '}
										characters to search Icons.
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default IconsMenu;
