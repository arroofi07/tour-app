<script lang="ts">
	import type { Category } from '$lib/types';
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		category: Category;
	}

	let { category }: Props = $props();
</script>

<a
	href="/tours?category={category.slug}"
	class="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
>
	<!-- Background image -->
	<img
		src={category.image}
		alt={category.name}
		class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
		loading="lazy"
	/>

	<!-- Gradient overlay -->
	<div
		class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300"
	></div>

	<!-- Content -->
	<div class="absolute inset-0 flex flex-col justify-end p-5">
		<!-- Icon bubble -->
		<div
			class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-2xl backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-white/25"
		>
			{category.icon}
		</div>

		<h3 class="mb-0.5 text-lg leading-tight font-bold text-white">{category.name}</h3>
		<p class="mb-3 line-clamp-1 text-xs text-white/70">{category.description}</p>

		<div class="flex items-center justify-between">
			<span class="text-xs text-white/60">{category.tourCount} paket tur</span>
			<div
				class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-primary"
			>
				<ArrowRight class="h-3.5 w-3.5 text-white" />
			</div>
		</div>
	</div>
</a>
