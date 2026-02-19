<script lang="ts">
	import { page } from '$app/stores';
	import { tours } from '$lib/data/tours';
	import { categories } from '$lib/data/categories';
	import TourCard from '$lib/components/ui/TourCard.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { Search, SlidersHorizontal, X } from 'lucide-svelte';

	// Read URL params
	const q = $derived($page.url.searchParams.get('q') ?? '');
	const categoryParam = $derived($page.url.searchParams.get('category') ?? '');

	let searchQuery = $state(q);
	let selectedCategory = $state(categoryParam);
	let selectedDifficulty = $state('');
	let maxPrice = $state(10000000);
	let maxDuration = $state(10);
	let showFilters = $state(false);
	let sortBy = $state<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

	const filteredTours = $derived(
		tours
			.filter((t) => {
				const matchSearch =
					!searchQuery ||
					t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
					t.country.toLowerCase().includes(searchQuery.toLowerCase());

				const matchCategory = !selectedCategory || t.categorySlug === selectedCategory;
				const matchPrice = t.price <= maxPrice;
				const matchDuration = t.durationDays <= maxDuration;
				const matchDifficulty = !selectedDifficulty || t.difficulty === selectedDifficulty;

				return matchSearch && matchCategory && matchPrice && matchDuration && matchDifficulty;
			})
			.sort((a, b) => {
				if (sortBy === 'price-asc') return a.price - b.price;
				if (sortBy === 'price-desc') return b.price - a.price;
				if (sortBy === 'rating') return b.rating - a.rating;
				return b.reviewCount - a.reviewCount; // popular
			})
	);

	function clearFilters() {
		searchQuery = '';
		selectedCategory = '';
		selectedDifficulty = '';
		maxPrice = 10000000;
		maxDuration = 10;
	}

	function formatPrice(n: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(n);
	}
</script>

<svelte:head>
	<title>Semua Paket Tour — NusaTravel</title>
</svelte:head>

<!-- Page header -->
<section class="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 pt-28 pb-14 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<span
			class="mb-4 inline-block rounded-full bg-teal-400/20 px-3 py-1 text-xs font-semibold tracking-wider text-teal-300 uppercase"
		>
			Semua Paket
		</span>
		<h1 class="mb-4 text-4xl font-bold md:text-6xl">
			Temukan <span class="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent"
				>Tur Impian</span
			> Anda
		</h1>
		<p class="mx-auto max-w-xl text-white/60">
			{tours.length} paket wisata tersedia — tinggal pilih dan kami urus semuanya.
		</p>
	</div>
</section>

<div class="min-h-screen bg-background">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Search + Sort bar -->
		<div class="mb-6 flex flex-col gap-3 sm:flex-row">
			<div class="relative flex-1">
				<Search class="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari destinasi, nama tur..."
					class="w-full rounded-xl border border-border bg-card py-3 pr-4 pl-11 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<X class="h-4 w-4" />
					</button>
				{/if}
			</div>

			<select
				bind:value={sortBy}
				class="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none"
			>
				<option value="popular">Paling Populer</option>
				<option value="rating">Rating Tertinggi</option>
				<option value="price-asc">Harga: Terendah</option>
				<option value="price-desc">Harga: Tertinggi</option>
			</select>

			<button
				onclick={() => (showFilters = !showFilters)}
				class="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40"
			>
				<SlidersHorizontal class="h-4 w-4" />
				Filter
				{#if selectedCategory || selectedDifficulty || maxPrice < 10000000}
					<span
						class="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
						>!</span
					>
				{/if}
			</button>
		</div>

		<!-- Filter Panel -->
		{#if showFilters}
			<div
				class="mb-6 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-4"
			>
				<!-- Category -->
				<div>
					<label
						class="mb-2 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
						>Kategori</label
					>
					<select
						bind:value={selectedCategory}
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
					>
						<option value="">Semua Kategori</option>
						{#each categories as cat}
							<option value={cat.slug}>{cat.name}</option>
						{/each}
					</select>
				</div>

				<!-- Difficulty -->
				<div>
					<label
						class="mb-2 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
						>Tingkat Kesulitan</label
					>
					<select
						bind:value={selectedDifficulty}
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
					>
						<option value="">Semua Level</option>
						<option value="Easy">Easy</option>
						<option value="Moderate">Moderate</option>
						<option value="Challenging">Challenging</option>
					</select>
				</div>

				<!-- Max Price -->
				<div>
					<label
						class="mb-2 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
					>
						Harga Maks: {formatPrice(maxPrice)}
					</label>
					<input
						type="range"
						bind:value={maxPrice}
						min={1000000}
						max={10000000}
						step={500000}
						class="w-full accent-teal-500"
					/>
				</div>

				<!-- Max Duration -->
				<div>
					<label
						class="mb-2 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
					>
						Durasi Maks: {maxDuration} Hari
					</label>
					<input
						type="range"
						bind:value={maxDuration}
						min={2}
						max={10}
						step={1}
						class="w-full accent-teal-500"
					/>
				</div>

				<div class="col-span-full flex justify-end">
					<button
						onclick={clearFilters}
						class="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
					>
						Reset Filter
					</button>
				</div>
			</div>
		{/if}

		<!-- Results count -->
		<p class="mb-6 text-sm text-muted-foreground">
			Menampilkan <span class="font-semibold text-foreground">{filteredTours.length}</span> paket
			tur
			{searchQuery ? `untuk "${searchQuery}"` : ''}
		</p>

		<!-- Grid -->
		{#if filteredTours.length > 0}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredTours as tour (tour.id)}
					<TourCard {tour} />
				{/each}
			</div>
		{:else}
			<div class="py-24 text-center">
				<div class="mb-4 text-5xl">🔍</div>
				<h3 class="mb-2 text-lg font-bold text-foreground">Tur tidak ditemukan</h3>
				<p class="mb-6 text-muted-foreground">Coba ubah filter atau kata kunci pencarian</p>
				<button
					onclick={clearFilters}
					class="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
				>
					Reset Semua Filter
				</button>
			</div>
		{/if}
	</div>
</div>
