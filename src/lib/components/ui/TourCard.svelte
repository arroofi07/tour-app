<script lang="ts">
	import type { Tour } from '$lib/types';
	import StarRating from './StarRating.svelte';
	import { MapPin, Clock, Users, ArrowRight } from 'lucide-svelte';

	interface Props {
		tour: Tour;
	}

	let { tour }: Props = $props();

	function formatPrice(price: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(price);
	}

	const badgeColors: Record<string, string> = {
		'Best Seller': 'bg-amber-500',
		'Top Rated': 'bg-emerald-500',
		New: 'bg-sky-500',
		Eksklusif: 'bg-purple-600',
		Promo: 'bg-rose-500'
	};
</script>

<article
	class="group card-hover relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
>
	<!-- Image -->
	<div class="relative aspect-[4/3] overflow-hidden">
		<img
			src={tour.image}
			alt={tour.name}
			class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			loading="lazy"
		/>
		<!-- Overlay gradient -->
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

		<!-- Category badge -->
		<div class="absolute top-3 left-3">
			<span
				class="rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
			>
				{tour.category}
			</span>
		</div>

		<!-- Badge (Best Seller, etc.) -->
		{#if tour.badge}
			<div class="absolute top-3 right-3">
				<span
					class="rounded-lg px-2.5 py-1 text-xs font-bold text-white {badgeColors[tour.badge] ??
						'bg-primary'}"
				>
					{tour.badge}
				</span>
			</div>
		{/if}

		<!-- Bottom info overlay -->
		<div class="absolute right-0 bottom-0 left-0 p-4">
			<div class="flex items-center gap-1.5 text-white/90">
				<MapPin class="h-3.5 w-3.5" />
				<span class="text-xs font-medium">{tour.location}, {tour.country}</span>
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="flex flex-1 flex-col p-4">
		<!-- Rating -->
		<div class="mb-2 flex items-center justify-between">
			<div class="flex items-center gap-1.5">
				<StarRating rating={tour.rating} size="sm" />
				<span class="text-xs font-semibold text-foreground">{tour.rating}</span>
				<span class="text-xs text-muted-foreground">({tour.reviewCount})</span>
			</div>
		</div>

		<!-- Title -->
		<h3
			class="mb-2 line-clamp-2 text-base leading-snug font-bold text-foreground transition-colors group-hover:text-primary"
		>
			{tour.name}
		</h3>

		<p class="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
			{tour.shortDescription}
		</p>

		<!-- Meta -->
		<div class="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
			<span class="flex items-center gap-1">
				<Clock class="h-3.5 w-3.5" />
				{tour.duration}
			</span>
			<span class="text-border">•</span>
			<span class="flex items-center gap-1">
				<Users class="h-3.5 w-3.5" />
				Max {tour.maxGroupSize} orang
			</span>
		</div>

		<!-- Price + CTA -->
		<div class="flex items-center justify-between border-t border-border pt-3">
			<div>
				{#if tour.originalPrice}
					<p class="text-xs text-muted-foreground line-through">
						{formatPrice(tour.originalPrice)}
					</p>
				{/if}
				<p class="text-lg font-bold text-primary">{formatPrice(tour.price)}</p>
				<p class="text-xs text-muted-foreground">per orang</p>
			</div>
			<a
				href="/tours/{tour.slug}"
				class="group/btn flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
			>
				Detail
				<ArrowRight class="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
			</a>
		</div>
	</div>
</article>
