import Link from 'next/link';

const controlItems = [
	'Icon size',
	'Icon rotate',
	'Border width',
	'Border color',
	'Fill opacity',
	'Fill color',
	'Background rounded',
	'Background padding',
	'Background shadow',
	'Background color',
	'Extra option 1',
	'Extra option 2',
	'Extra option 3',
	'Extra option 4',
	'Extra option 5',
	'Extra option 6',
	'Extra option 7',
	'Extra option 8',
	'Extra option 9',
	'Extra option 10',
];

const feedbacks = Array.from({ length: 24 }, (_, index) => ({
	id: index + 1,
	text: `Feedback ${index + 1}: This card is here to stress-test rightbar scrolling behavior.`,
}));

function ControlRow({ label, value }: { label: string; value: number }) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span>{label}</span>
				<span className="tabular-nums">{value}</span>
			</div>
			<div className="bg-muted h-2 rounded">
				<div
					className="bg-foreground h-2 rounded"
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	);
}

export default function LogoFastScrollPracticePage() {
	return (
		<div className="bg-background mx-auto flex min-h-dvh flex-col overflow-y-auto px-3 py-3 lg:h-dvh lg:overflow-hidden">
			<header className="shrink-0 rounded-md border border-border px-4 py-3">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div>
						<h1 className="text-balance text-lg font-semibold">
							Scroll Pattern Practice
						</h1>
						<p className="text-muted-foreground text-sm text-pretty">
							Desktop: fixed shell + inner panel scrolling. Mobile/tablet:
							content-flow first.
						</p>
					</div>
					<Link
						href="/tools/logo-fast"
						className="rounded border border-border px-3 py-2 text-sm"
					>
						Back to Logo Editor
					</Link>
				</div>
				<div className="text-muted-foreground mt-3 text-xs leading-relaxed">
					Test matrix: 375x812, 768x1024, 1366x768. Check hidden content,
					double scroll, scroll chaining, clipped panels.
				</div>
			</header>

			<main className="grid grid-cols-1 gap-4 pb-4 pt-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)_minmax(260px,0.8fr)] lg:overflow-hidden lg:pb-0">
				<div className="lg:min-h-0 lg:overflow-hidden">
					<aside className="max-h-[60dvh] min-h-0 flex flex-col overflow-hidden rounded-md border border-border p-3 lg:h-full lg:max-h-none">
						<div className="shrink-0 border-b border-border pb-2">
							<div className="flex gap-2">
								<button className="rounded bg-foreground px-3 py-1 text-xs text-background">
									Icon
								</button>
								<button className="rounded bg-muted px-3 py-1 text-xs">
									Background
								</button>
							</div>
						</div>

						<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 pt-3">
							<div className="space-y-4">
								{controlItems.map((item, index) => (
									<ControlRow
										key={item}
										label={item}
										value={((index * 11) % 80) + 20}
									/>
								))}
							</div>
						</div>
					</aside>
				</div>

				<div className="lg:min-h-0 lg:overflow-hidden">
					<section className="bg-muted/40 flex min-h-0 w-full justify-center overflow-hidden rounded-md border border-border p-4 lg:h-full lg:overflow-auto lg:overscroll-contain">
						<div className="mx-auto py-6 lg:py-8">
							<div className="size-[min(88vw,360px)] sm:size-[min(78vw,520px)] lg:size-[420px] xl:size-[560px] rounded-2xl border border-border bg-white p-8 shadow-lg">
								<div className="flex size-full items-center justify-center rounded-[32px] bg-black text-white">
									<div className="text-center">
										<div className="mx-auto mb-3 flex size-20 items-center justify-center rounded-full border-4 border-white text-4xl">
											*
										</div>
										<p className="text-sm text-pretty">
											Fixed parent box. Scale content, not container.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<div className="lg:min-h-0 lg:overflow-hidden">
					<aside className="min-h-0 rounded-md border border-border p-4 lg:flex lg:h-full lg:flex-col lg:overflow-hidden">
						<div className="shrink-0">
							<h2 className="text-base font-semibold">Rightbar Header</h2>
							<p className="text-muted-foreground text-sm">
								On desktop only feedback list should scroll.
							</p>
						</div>

						<div className="mt-3 space-y-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
							{feedbacks.map((feedback) => (
								<div
									key={feedback.id}
									className="rounded border border-border p-3 text-sm"
								>
									{feedback.text}
								</div>
							))}
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}
