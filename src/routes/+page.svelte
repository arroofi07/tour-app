<script lang="ts">
	import { tours } from '$lib/data/tours';
	import { categories } from '$lib/data/categories';
	import { testimonials } from '$lib/data/testimonials';
	import TourCard from '$lib/components/ui/TourCard.svelte';
	import CategoryCard from '$lib/components/ui/CategoryCard.svelte';
	import TestimonialCard from '$lib/components/ui/TestimonialCard.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import {
		Search,
		MapPin,
		Calendar,
		Users,
		Shield,
		Headphones,
		Award,
		ThumbsUp,
		ChevronRight,
		Plane,
		Star
	} from 'lucide-svelte';

	// Hero search state
	let destination = $state('');
	let date = $state('');
	let guests = $state(2);

	// Tour filter
	type FilterKey = 'semua' | 'pantai' | 'petualangan' | 'budaya' | 'ekowisata';
	let activeFilter = $state<FilterKey>('semua');

	const filters: { key: FilterKey; label: string }[] = [
		{ key: 'semua', label: 'Semua' },
		{ key: 'pantai', label: '🌊 Pantai' },
		{ key: 'petualangan', label: '🏔️ Petualangan' },
		{ key: 'budaya', label: '🏯 Budaya' },
		{ key: 'ekowisata', label: '🌿 Ekowisata' }
	];

	const filteredTours = $derived(
		activeFilter === 'semua'
			? tours.slice(0, 6)
			: tours.filter((t) => t.categorySlug === activeFilter).slice(0, 6)
	);

	// Stats
	const stats = [
		{ value: '250+', label: 'Destinasi', icon: MapPin },
		{ value: '50K+', label: 'Wisatawan Puas', icon: Users },
		{ value: '180+', label: 'Paket Tur', icon: Plane },
		{ value: '4.9', label: 'Rating Rata-rata', icon: Star }
	];

	// Why choose us
	const whyUs = [
		{
			icon: Shield,
			title: 'Terjamin & Terpercaya',
			desc: 'Terdaftar resmi di Kemenparekraf RI dengan jaminan kepuasan 100%.',
			color: 'from-teal-400 to-cyan-500'
		},
		{
			icon: Headphones,
			title: 'Support 24/7',
			desc: 'Tim kami siap membantu Anda kapan saja sebelum, selama, dan setelah perjalanan.',
			color: 'from-violet-400 to-purple-600'
		},
		{
			icon: Award,
			title: 'Pemandu Berpengalaman',
			desc: 'Semua pemandu kami bersertifikat dan memiliki pengalaman lebih dari 5 tahun.',
			color: 'from-amber-400 to-orange-500'
		},
		{
			icon: ThumbsUp,
			title: 'Harga Terbaik',
			desc: 'Kami menjamin harga terbaik. Temukan lebih murah, kami refund selisihnya.',
			color: 'from-emerald-400 to-green-600'
		}
	];

	// Gallery images
	const galleryImages = [
		{
			src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
			alt: 'Bali',
			span: 'col-span-2 row-span-2'
		},
		{
			src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
			alt: 'Diving',
			span: 'col-span-1 row-span-1'
		},
		{
			src: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80',
			alt: 'Lombok',
			span: 'col-span-1 row-span-1'
		},
		{
			src: 'https://images.unsplash.com/photo-1584550813774-1f7a35e0eaed?w=600&q=80',
			alt: 'Borobudur',
			span: 'col-span-1 row-span-2'
		},
		{
			src: 'https://images.unsplash.com/photo-1570705502185-3b3a66fe7204?w=600&q=80',
			alt: 'Bromo',
			span: 'col-span-2 row-span-1'
		}
	];

	function handleSearch() {
		const params = new URLSearchParams();
		if (destination) params.set('q', destination);
		if (date) params.set('date', date);
		if (guests) params.set('guests', String(guests));
		window.location.href = `/tours?${params.toString()}`;
	}
</script>

<svelte:head>
	<title>NusaTravel — Jelajahi Dunia Bersamamu</title>
</svelte:head>

<!-- ========== HERO ========== -->
<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden"
	style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90'); background-size: cover; background-position: center; background-attachment: fixed;"
>
	<!-- Overlay -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-teal-900/60 to-slate-900/70"
	></div>

	<!-- Floating blobs -->
	<div
		class="animate-float absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl"
	></div>
	<div
		class="animate-float absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
		style="animation-delay: 2s;"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-12 text-center sm:px-6 lg:px-8">
		<!-- Badge -->
		<div
			class="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm"
		>
			<span class="relative flex h-2 w-2">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"
				></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-teal-400"></span>
			</span>
			✨ 50,000+ Wisatawan Telah Mempercayai Kami
		</div>

		<!-- Headline -->
		<h1 class="mb-6 text-4xl leading-tight font-bold text-white sm:text-6xl lg:text-7xl">
			Jelajahi Keindahan
			<br />
			<span
				class="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent"
			>
				Indonesia & Dunia
			</span>
		</h1>

		<p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
			Paket wisata lengkap dengan pemandu lokal berpengalaman, akomodasi terbaik, dan kenangan yang
			tak terlupakan.
		</p>

		<!-- Search Bar -->
		<div
			class="mx-auto max-w-4xl rounded-2xl bg-white/95 p-2 shadow-2xl shadow-black/20 backdrop-blur-md"
		>
			<div class="flex flex-col gap-2 md:flex-row">
				<!-- Destination -->
				<div class="flex flex-1 items-center gap-3 px-4 py-3">
					<MapPin class="h-5 w-5 shrink-0 text-primary" />
					<div class="flex-1 text-left">
						<p class="text-xs font-semibold tracking-wider text-foreground/50 uppercase">
							Destinasi
						</p>
						<input
							type="text"
							bind:value={destination}
							placeholder="Mau ke mana?"
							class="w-full border-none bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
						/>
					</div>
				</div>

				<div class="my-3 hidden w-px bg-border md:block"></div>

				<!-- Date -->
				<div class="flex items-center gap-3 px-4 py-3">
					<Calendar class="h-5 w-5 shrink-0 text-primary" />
					<div class="text-left">
						<p class="text-xs font-semibold tracking-wider text-foreground/50 uppercase">Tanggal</p>
						<input
							type="date"
							bind:value={date}
							class="w-36 border-none bg-transparent text-sm font-medium text-foreground outline-none"
						/>
					</div>
				</div>

				<div class="my-3 hidden w-px bg-border md:block"></div>

				<!-- Guests -->
				<div class="flex items-center gap-3 px-4 py-3">
					<Users class="h-5 w-5 shrink-0 text-primary" />
					<div class="text-left">
						<p class="text-xs font-semibold tracking-wider text-foreground/50 uppercase">Peserta</p>
						<div class="flex items-center gap-2">
							<button
								onclick={() => guests > 1 && guests--}
								class="flex h-6 w-6 items-center justify-center rounded-full border border-border text-sm font-bold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white"
							>
								−
							</button>
							<span class="w-6 text-center text-sm font-semibold">{guests}</span>
							<button
								onclick={() => guests < 30 && guests++}
								class="flex h-6 w-6 items-center justify-center rounded-full border border-border text-sm font-bold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white"
							>
								+
							</button>
						</div>
					</div>
				</div>

				<!-- Search Button -->
				<button
					onclick={handleSearch}
					class="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-400 hover:to-cyan-400"
				>
					<Search class="h-4 w-4" />
					Cari Tur
				</button>
			</div>
		</div>

		<!-- Quick destinations -->
		<div class="mt-8 flex flex-wrap items-center justify-center gap-2">
			<span class="text-sm text-white/50">Populer:</span>
			{#each ['Bali', 'Raja Ampat', 'Komodo', 'Lombok', 'Yogyakarta'] as dest}
				<button
					onclick={() => {
						destination = dest;
						handleSearch();
					}}
					class="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
				>
					{dest}
				</button>
			{/each}
		</div>
	</div>

	<!-- Wave bottom -->
	<div class="absolute right-0 bottom-0 left-0">
		<svg
			class="h-16 w-full"
			viewBox="0 0 1440 60"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<path
				d="M0 60L60 53.3C120 46.7 240 33.3 360 26.7C480 20 600 20 720 26.7C840 33.3 960 46.7 1080 46.7C1200 46.7 1320 33.3 1380 26.7L1440 20V60H0Z"
				fill="oklch(0.99 0.003 200)"
			/>
		</svg>
	</div>
</section>

<!-- ========== STATS ========== -->
<section class="bg-background py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each stats as stat}
				<div
					class="group flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20"
					>
						<stat.icon class="h-6 w-6 text-primary" />
					</div>
					<p class="mb-1 text-3xl font-bold text-foreground">{stat.value}</p>
					<p class="text-sm text-muted-foreground">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========== CATEGORIES ========== -->
<section class="section-padding bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			badge="Kategori"
			title={`Jelajahi <span class="text-gradient">Berdasarkan</span> Minat`}
			subtitle="Dari pantai tropis hingga petualangan gunung, temukan paket wisata yang sesuai dengan gaya perjalanan Anda."
			class="mb-12"
		/>

		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
			{#each categories as category}
				<CategoryCard {category} />
			{/each}
		</div>
	</div>
</section>

<!-- ========== FEATURED TOURS ========== -->
<section class="section-padding bg-muted/30">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<SectionHeader
				badge="Paket Pilihan"
				title={`Tour <span class="text-gradient">Terpopuler</span>`}
				subtitle="Dipilih oleh ribuan wisatawan, dijamin berkualitas."
				align="left"
			/>
			<a
				href="/tours"
				class="hidden shrink-0 items-center gap-2 rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white md:flex"
			>
				Lihat Semua Tur
				<ChevronRight class="h-4 w-4" />
			</a>
		</div>

		<!-- Filter tabs -->
		<div class="mb-8 flex flex-wrap gap-2">
			{#each filters as f}
				<button
					onclick={() => (activeFilter = f.key)}
					class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
					  {activeFilter === f.key
						? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
						: 'border border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground'}"
				>
					{f.label}
				</button>
			{/each}
		</div>

		<!-- Tour Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredTours as tour (tour.id)}
				<TourCard {tour} />
			{/each}
		</div>

		{#if filteredTours.length === 0}
			<div class="py-16 text-center text-muted-foreground">
				<p>Tidak ada tur untuk kategori ini saat ini.</p>
			</div>
		{/if}

		<!-- Mobile CTA -->
		<div class="mt-8 text-center md:hidden">
			<a
				href="/tours"
				class="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
			>
				Lihat Semua Tur
				<ChevronRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</section>

<!-- ========== WHY CHOOSE US ========== -->
<section class="section-padding relative overflow-hidden bg-background">
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent"
	></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- Left: text -->
			<div>
				<SectionHeader
					badge="Keunggulan"
					title={`Kenapa Pilih <span class="text-gradient">NusaTravel?</span>`}
					subtitle="Lebih dari sekedar agen perjalanan. Kami adalah mitra perjalanan Anda yang siap mewujudkan liburan impian."
					align="left"
					class="mb-10"
				/>

				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
					{#each whyUs as item}
						<div
							class="group flex gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
						>
							<div
								class="h-12 w-12 rounded-xl bg-gradient-to-br {item.color} flex shrink-0 items-center justify-center shadow-lg transition-transform group-hover:scale-110"
							>
								<item.icon class="h-6 w-6 text-white" />
							</div>
							<div>
								<h4 class="mb-1 text-sm font-bold text-foreground">{item.title}</h4>
								<p class="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-8">
					<a
						href="/about"
						class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
					>
						Tentang Kami
						<ChevronRight class="h-4 w-4" />
					</a>
				</div>
			</div>

			<!-- Right: image mosaic -->
			<div class="relative grid h-[480px] grid-cols-2 gap-4">
				<div class="relative overflow-hidden rounded-2xl">
					<img
						src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
						alt="Bali tour"
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="flex flex-col gap-4">
					<div class="relative flex-1 overflow-hidden rounded-2xl">
						<img
							src="https://images.unsplash.com/photo-1570705502185-3b3a66fe7204?w=600&q=80"
							alt="Bromo"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="relative flex-1 overflow-hidden rounded-2xl">
						<img
							src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80"
							alt="Raja Ampat"
							class="h-full w-full object-cover"
						/>
					</div>
				</div>

				<!-- Floating stat card -->
				<div
					class="glass absolute -bottom-4 -left-4 rounded-2xl border border-white/50 px-5 py-4 shadow-xl"
				>
					<div class="flex items-center gap-3">
						<div class="text-3xl font-bold text-primary">98%</div>
						<div>
							<p class="text-xs font-semibold text-foreground">Kepuasan Pelanggan</p>
							<p class="text-xs text-muted-foreground">Berdasarkan 50K+ ulasan</p>
						</div>
					</div>
				</div>

				<!-- Floating badge -->
				<div
					class="glass absolute -top-4 -right-4 rounded-2xl border border-white/50 px-4 py-3 shadow-xl"
				>
					<div class="flex items-center gap-2">
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/20">
							<Award class="h-4 w-4 text-amber-500" />
						</div>
						<div>
							<p class="text-xs font-bold text-foreground">Best Tour Agency</p>
							<p class="text-xs text-muted-foreground">Kemenparekraf 2025</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ========== TESTIMONIALS ========== -->
<section
	class="section-padding bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			badge="Ulasan"
			title={`Kata Mereka yang <span class="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">Sudah Merasakan</span>`}
			subtitle="Ribuan pelanggan puas telah mempercayakan perjalanan mereka kepada NusaTravel."
			class="mb-12 [&_h2]:text-white [&_p]:text-white/60"
		/>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as testimonial}
				<div
					class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
				>
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20">
						<svg class="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.78-3 .63-1 1.52-1.86 2.67-2.58.37-.22.77-.33 1.19-.33.43 0 .82.13 1.16.38.62.45.93 1.08.93 1.9 0 .22-.04.44-.1.66l-3.07 1.9c.64.95.96 1.95.96 3 0 1.04-.35 1.87-1.04 2.5-.68.63-1.5.94-2.45.94-.64 0-1.2-.18-1.69-.54-.48-.36-.83-.84-1.04-1.43-.21-.6-.31-1.25-.31-1.96 0-.71.1-1.4.31-2.07H4.5c.1.53.15 1.06.15 1.6 0 .53-.05 1.05-.15 1.55.78.35 1.58.53 2.4.53.82 0 1.51-.18 2.07-.55.56-.37.97-.87 1.23-1.5.26-.63.39-1.3.39-2.02h.59zM20.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.78-3 .63-1 1.52-1.86 2.67-2.58.37-.22.77-.33 1.19-.33.43 0 .82.13 1.16.38.62.45.93 1.08.93 1.9 0 .22-.04.44-.1.66l-3.07 1.9c.64.95.96 1.95.96 3 0 1.04-.35 1.87-1.04 2.5-.68.63-1.5.94-2.45.94-.64 0-1.2-.18-1.69-.54-.48-.36-.83-.84-1.04-1.43-.21-.6-.31-1.25-.31-1.96 0-.71.1-1.4.31-2.07h-.5c.1.53.15 1.06.15 1.6 0 .53-.05 1.05-.15 1.55.78.35 1.58.53 2.4.53.82 0 1.51-.18 2.07-.55.56-.37.97-.87 1.23-1.5.26-.63.39-1.3.39-2.02h.59z"
							/>
						</svg>
					</div>
					<div class="mb-4 flex items-center gap-1">
						{#each Array(5) as _, i}
							<svg
								class="h-4 w-4 {i < testimonial.rating ? 'text-amber-400' : 'text-white/20'}"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
								/>
							</svg>
						{/each}
					</div>
					<p class="mb-4 text-sm leading-relaxed text-white/75 italic">"{testimonial.comment}"</p>
					<p class="mb-4 text-xs font-medium text-teal-400">✈ {testimonial.tour}</p>
					<div class="flex items-center gap-3 border-t border-white/10 pt-4">
						<img
							src={testimonial.avatar}
							alt={testimonial.name}
							class="h-10 w-10 rounded-full object-cover ring-2 ring-teal-400/30"
						/>
						<div>
							<p class="text-sm font-semibold text-white">{testimonial.name}</p>
							<p class="text-xs text-white/50">{testimonial.origin} · {testimonial.date}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========== GALLERY STRIP ========== -->
<section class="section-padding bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			badge="Galeri"
			title={`Momen <span class="text-gradient">Tak Terlupakan</span>`}
			subtitle="Sebagian dari ribuan foto perjalanan indah bersama NusaTravel."
			class="mb-10"
		/>

		<div class="grid h-[400px] grid-cols-3 grid-rows-2 gap-3 md:h-[500px] md:gap-4">
			{#each galleryImages as img, i}
				<div class="{img.span} group relative cursor-pointer overflow-hidden rounded-2xl">
					<img
						src={img.src}
						alt={img.alt}
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						loading="lazy"
					/>
					<div
						class="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					>
						<span class="text-sm font-semibold text-white">{img.alt}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========== NEWSLETTER ========== -->
<section
	class="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 py-20"
>
	<div class="absolute inset-0 opacity-10">
		<div
			class="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"
		></div>
		<div
			class="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-white blur-3xl"
		></div>
	</div>

	<div class="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white/90"
		>
			🎉 Penawaran Eksklusif untuk Member
		</div>
		<h2 class="mb-4 text-3xl leading-tight font-bold text-white md:text-5xl">
			Dapatkan Diskon <span class="text-yellow-300">20%</span> untuk
			<br />Booking Pertama Anda!
		</h2>
		<p class="mx-auto mb-8 max-w-lg text-white/75">
			Daftar newsletter sekarang dan dapatkan penawaran eksklusif, tips perjalanan, dan inspirasi
			destinasi langsung di inbox Anda.
		</p>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				alert('Terima kasih! Penawaran telah dikirim ke email Anda.');
			}}
			class="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
		>
			<input
				type="email"
				placeholder="Masukkan email Anda..."
				required
				class="flex-1 rounded-xl border border-white/30 bg-white/15 px-5 py-3.5 text-sm text-white backdrop-blur-sm placeholder:text-white/50 focus:border-transparent focus:ring-2 focus:ring-white/50 focus:outline-none"
			/>
			<button
				type="submit"
				class="rounded-xl bg-white px-8 py-3.5 text-sm font-bold whitespace-nowrap text-teal-700 shadow-lg transition-all hover:bg-white/90"
			>
				Daftar Gratis
			</button>
		</form>

		<p class="mt-4 text-xs text-white/50">
			*Berlaku untuk booking melalui website. Tidak ada spam.
		</p>
	</div>
</section>
