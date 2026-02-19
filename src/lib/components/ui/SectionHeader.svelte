<script lang="ts">
	interface Props {
		badge?: string;
		label?: string;
		title: string;
		subtitle?: string;
		align?: 'left' | 'center' | 'right';
		class?: string;
	}

	let { badge, label, title, subtitle, align = 'center', class: cls = '' }: Props = $props();

	const alignClass = {
		left: 'items-start text-left',
		center: 'items-center text-center',
		right: 'items-end text-right'
	};
</script>

<div class="flex flex-col gap-3 {alignClass[align]} {cls}">
	{#if badge || label}
		<div class="flex items-center gap-2">
			{#if badge}
				<span
					class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase"
				>
					{badge}
				</span>
			{/if}
			{#if label}
				<span class="text-sm text-muted-foreground">{label}</span>
			{/if}
		</div>
	{/if}

	<h2 class="text-3xl leading-tight font-bold text-foreground md:text-4xl lg:text-5xl">
		{@html title}
	</h2>

	{#if subtitle}
		<p class="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
			{subtitle}
		</p>
	{/if}

	<div class="flex items-center gap-1.5 {align === 'center' ? 'justify-center' : ''}">
		<div class="h-1 w-10 rounded-full bg-primary"></div>
		<div class="h-1 w-4 rounded-full bg-accent"></div>
		<div class="h-1 w-2 rounded-full bg-primary/30"></div>
	</div>
</div>
