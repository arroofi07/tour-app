<script lang="ts">
	import type { Testimonial } from '$lib/types';
	import StarRating from './StarRating.svelte';
	import { Quote } from 'lucide-svelte';

	interface Props {
		testimonial: Testimonial;
	}

	let { testimonial }: Props = $props();
</script>

<div
	class="flex h-full flex-col gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
>
	<!-- Quote icon -->
	<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
		<Quote class="h-5 w-5 text-primary" />
	</div>

	<!-- Rating -->
	<StarRating rating={testimonial.rating} size="sm" />

	<!-- Comment -->
	<p class="flex-1 text-sm leading-relaxed text-foreground/80 italic">
		"{testimonial.comment}"
	</p>

	<!-- Tour name -->
	<p class="text-xs font-medium text-primary">
		✈ {testimonial.tour}
	</p>

	<!-- Divider -->
	<div class="border-t border-border"></div>

	<!-- Author -->
	<div class="flex items-center gap-3">
		<img
			src={testimonial.avatar}
			alt={testimonial.name}
			class="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
		/>
		<div>
			<p class="text-sm font-semibold text-foreground">{testimonial.name}</p>
			<p class="text-xs text-muted-foreground">{testimonial.origin} · {testimonial.date}</p>
		</div>
	</div>
</div>
