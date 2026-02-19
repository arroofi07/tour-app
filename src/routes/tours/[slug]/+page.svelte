<script lang="ts">
	import { page } from '$app/stores';
	import { tours } from '$lib/data/tours';
	import StarRating from '$lib/components/ui/StarRating.svelte';
	import TourCard from '$lib/components/ui/TourCard.svelte';
	import {
		MapPin,
		Clock,
		Users,
		Calendar,
		CheckCircle2,
		XCircle,
		ChevronDown,
		ChevronUp,
		Shield,
		ArrowLeft,
		Share2,
		Heart
	} from 'lucide-svelte';

	const slug = $derived($page.params.slug);
	const tour = $derived(tours.find((t) => t.slug === slug) ?? tours[0]);
	const relatedTours = $derived(
		tours.filter((t) => t.categorySlug === tour.categorySlug && t.slug !== tour.slug).slice(0, 3)
	);

	let selectedImage = $state(0);
	let expandedDay = $state<number | null>(1);
	let guestCount = $state(2);
	let selectedDate = $state('');
	let wishlisted = $state(false);

	function formatPrice(n: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(n);
	}

	const totalPrice = $derived(tour.price * guestCount);

	const difficultyColor = {
		Easy: 'bg-emerald-100 text-emerald-700',
		Moderate: 'bg-amber-100 text-amber-700',
		Challenging: 'bg-rose-100 text-rose-700'
	};

	const images = $derived(tour.images ?? [tour.image]);
</script>

<svelte:head>
	<title>{tour.name} — NusaTravel</title>
</svelte:head>

<div class="min-h-screen bg-background pt-20">
	<!-- Breadcrumb -->
	<div class="border-b border-border bg-muted/40">
		<div
			class="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8"
		>
			<a href="/" class="transition-colors hover:text-foreground">Beranda</a>
			<span>/</span>
			<a href="/tours" class="transition-colors hover:text-foreground">Semua Tur</a>
			<span>/</span>
			<span class="line-clamp-1 font-medium text-foreground">{tour.name}</span>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- LEFT: Content -->
			<div class="space-y-8 lg:col-span-2">
				<!-- Image Gallery -->
				<div class="space-y-3">
					<div class="relative aspect-video overflow-hidden rounded-2xl">
						<img src={images[selectedImage]} alt={tour.name} class="h-full w-full object-cover" />
						{#if tour.badge}
							<div class="absolute top-4 right-4">
								<span
									class="rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-white shadow-lg"
								>
									{tour.badge}
								</span>
							</div>
						{/if}
						<button
							onclick={() => (wishlisted = !wishlisted)}
							class="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm transition-all hover:bg-white"
						>
							<Heart
								class="h-5 w-5 {wishlisted ? 'fill-rose-500 text-rose-500' : 'text-foreground/60'}"
							/>
						</button>
					</div>
					{#if images.length > 1}
						<div class="flex gap-3">
							{#each images as img, i}
								<button
									onclick={() => (selectedImage = i)}
									class="relative h-16 w-24 overflow-hidden rounded-xl ring-2 transition-all {selectedImage ===
									i
										? 'ring-primary'
										: 'ring-transparent hover:ring-primary/40'}"
								>
									<img src={img} alt="" class="h-full w-full object-cover" />
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Title & Meta -->
				<div>
					<div class="mb-3 flex flex-wrap gap-2">
						<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
							>{tour.category}</span
						>
						<span
							class="rounded-full px-3 py-1 text-xs font-semibold {difficultyColor[
								tour.difficulty
							]}">{tour.difficulty}</span
						>
					</div>
					<h1 class="mb-3 text-2xl font-bold text-foreground md:text-4xl">{tour.name}</h1>
					<div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
						<span class="flex items-center gap-1.5"
							><MapPin class="h-4 w-4 text-primary" />{tour.location}, {tour.country}</span
						>
						<span class="flex items-center gap-1.5"
							><Clock class="h-4 w-4 text-primary" />{tour.duration}</span
						>
						<span class="flex items-center gap-1.5"
							><Users class="h-4 w-4 text-primary" />Max {tour.maxGroupSize} orang</span
						>
						<span class="flex items-center gap-1.5"
							><MapPin class="h-4 w-4 text-primary" />Berangkat dari {tour.departure}</span
						>
					</div>
					<div class="flex items-center gap-2">
						<StarRating rating={tour.rating} showValue />
						<span class="text-sm text-muted-foreground">({tour.reviewCount} ulasan)</span>
					</div>
				</div>

				<!-- Description -->
				<div>
					<h2 class="mb-4 text-xl font-bold text-foreground">Tentang Tur Ini</h2>
					<p class="leading-relaxed text-muted-foreground">{tour.description}</p>
				</div>

				<!-- Highlights -->
				<div>
					<h2 class="mb-4 text-xl font-bold text-foreground">Highlight Perjalanan</h2>
					<div class="grid gap-3 sm:grid-cols-2">
						{#each tour.highlights as hl}
							<div
								class="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/40 p-3"
							>
								<CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
								<span class="text-sm text-foreground">{hl}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Included / Excluded -->
				<div class="grid gap-6 sm:grid-cols-2">
					<div>
						<h3 class="mb-3 flex items-center gap-2 font-bold text-foreground">
							<CheckCircle2 class="h-5 w-5 text-emerald-500" /> Sudah Termasuk
						</h3>
						<ul class="space-y-2">
							{#each tour.included as item}
								<li class="flex items-start gap-2 text-sm text-foreground/80">
									<span class="mt-0.5 text-emerald-500">✓</span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<h3 class="mb-3 flex items-center gap-2 font-bold text-foreground">
							<XCircle class="h-5 w-5 text-rose-500" /> Belum Termasuk
						</h3>
						<ul class="space-y-2">
							{#each tour.excluded as item}
								<li class="flex items-start gap-2 text-sm text-foreground/80">
									<span class="mt-0.5 text-rose-400">✗</span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<!-- Itinerary -->
				{#if tour.itinerary.length > 0}
					<div>
						<h2 class="mb-4 text-xl font-bold text-foreground">Itinerary Perjalanan</h2>
						<div class="space-y-3">
							{#each tour.itinerary as day}
								<div class="overflow-hidden rounded-2xl border border-border">
									<button
										class="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/30"
										onclick={() => (expandedDay = expandedDay === day.day ? null : day.day)}
									>
										<div class="flex items-center gap-4">
											<div
												class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary"
											>
												{day.day}
											</div>
											<div>
												<p class="text-sm font-semibold text-foreground">{day.title}</p>
											</div>
										</div>
										{#if expandedDay === day.day}
											<ChevronUp class="h-5 w-5 text-muted-foreground" />
										{:else}
											<ChevronDown class="h-5 w-5 text-muted-foreground" />
										{/if}
									</button>
									{#if expandedDay === day.day}
										<div class="border-t border-border px-5 pb-5">
											<p class="mt-3 mb-3 text-sm text-muted-foreground">{day.description}</p>
											<ul class="space-y-2">
												{#each day.activities as act}
													<li class="flex items-center gap-2 text-sm">
														<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
														{act}
													</li>
												{/each}
											</ul>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- RIGHT: Booking Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-24 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-lg">
					<!-- Price -->
					<div>
						{#if tour.originalPrice}
							<p class="text-sm text-muted-foreground line-through">
								{formatPrice(tour.originalPrice)}
							</p>
						{/if}
						<div class="flex items-baseline gap-1">
							<span class="text-3xl font-bold text-primary">{formatPrice(tour.price)}</span>
							<span class="text-sm text-muted-foreground">/ orang</span>
						</div>
						{#if tour.originalPrice}
							<span
								class="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600"
							>
								Hemat {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
							</span>
						{/if}
					</div>

					<div class="space-y-4 border-t border-border pt-4">
						<!-- Date -->
						<div>
							<label
								class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
							>
								<Calendar class="mr-1 inline h-3.5 w-3.5" />
								Tanggal Keberangkatan
							</label>
							<input
								type="date"
								bind:value={selectedDate}
								class="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
							/>
						</div>

						<!-- Guest count -->
						<div>
							<label
								class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
							>
								<Users class="mr-1 inline h-3.5 w-3.5" />
								Jumlah Peserta
							</label>
							<div class="flex items-center overflow-hidden rounded-xl border border-border">
								<button
									onclick={() => guestCount > 1 && guestCount--}
									class="px-4 py-2.5 text-lg font-bold text-foreground transition-colors hover:bg-muted"
									>−</button
								>
								<span class="flex-1 py-2.5 text-center text-sm font-semibold"
									>{guestCount} orang</span
								>
								<button
									onclick={() => guestCount < tour.maxGroupSize && guestCount++}
									class="px-4 py-2.5 text-lg font-bold text-foreground transition-colors hover:bg-muted"
									>+</button
								>
							</div>
						</div>
					</div>

					<!-- Total -->
					<div class="space-y-2 rounded-xl bg-muted/50 p-4">
						<div class="flex justify-between text-sm">
							<span class="text-muted-foreground"
								>{formatPrice(tour.price)} × {guestCount} orang</span
							>
							<span class="font-semibold">{formatPrice(totalPrice)}</span>
						</div>
						<div class="flex justify-between border-t border-border pt-2 font-bold text-foreground">
							<span>Total</span>
							<span class="text-primary">{formatPrice(totalPrice)}</span>
						</div>
					</div>

					<!-- CTA -->
					<button
						class="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-4 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-400 hover:to-cyan-400"
						onclick={() => alert('Fitur booking akan segera tersedia!')}
					>
						Pesan Sekarang
					</button>

					<a
						href="/contact"
						class="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-muted/30"
					>
						Hubungi Kami
					</a>

					<!-- Trust badges -->
					<div
						class="flex items-start gap-2 rounded-xl bg-muted/40 p-3 text-xs text-muted-foreground"
					>
						<Shield class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
						<p>Pembayaran aman & terjamin. Refund 100% jika tour dibatalkan.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Related Tours -->
		{#if relatedTours.length > 0}
			<div class="mt-16">
				<h2 class="mb-6 text-2xl font-bold text-foreground">Tur Serupa</h2>
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each relatedTours as t}
						<TourCard tour={t} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
