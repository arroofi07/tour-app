<script lang="ts">
	interface Props {
		rating: number;
		max?: number;
		size?: 'sm' | 'md' | 'lg';
		showValue?: boolean;
	}

	let { rating, max = 5, size = 'md', showValue = false }: Props = $props();

	const sizes = {
		sm: 'w-3 h-3',
		md: 'w-4 h-4',
		lg: 'w-5 h-5'
	};

	function getStarType(index: number): 'full' | 'half' | 'empty' {
		const diff = rating - index;
		if (diff >= 1) return 'full';
		if (diff >= 0.5) return 'half';
		return 'empty';
	}
</script>

<div class="flex items-center gap-1">
	{#each Array(max) as _, i}
		{@const type = getStarType(i)}
		<svg
			class="{sizes[size]} {type === 'empty' ? 'text-slate-300' : 'text-amber-400'}"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			{#if type === 'full'}
				<path
					d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
				/>
			{:else if type === 'half'}
				<defs>
					<linearGradient id="half-grad-{i}">
						<stop offset="50%" stop-color="currentColor" />
						<stop offset="50%" stop-color="#cbd5e1" />
					</linearGradient>
				</defs>
				<path
					fill="url(#half-grad-{i})"
					d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
				/>
			{:else}
				<path
					d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
				/>
			{/if}
		</svg>
	{/each}
	{#if showValue}
		<span class="ml-1 text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
	{/if}
</div>
