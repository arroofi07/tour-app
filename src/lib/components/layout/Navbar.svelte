<script lang="ts">
	import { page } from '$app/stores';
	import { MapPin, Menu, X, Phone, ChevronDown } from 'lucide-svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);

	const navLinks = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Tur & Paket', href: '/tours' },
		{ label: 'Tentang Kami', href: '/about' },
		{ label: 'Kontak', href: '/contact' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 40;
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	function isActive(href: string) {
		return $page.url.pathname === href;
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {scrolled
		? 'glass shadow-lg shadow-black/5'
		: 'bg-transparent'}"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 md:h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 group" onclick={closeMobile}>
				<div
					class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow"
				>
					<MapPin class="w-5 h-5 text-white" />
				</div>
				<div class="leading-none">
					<span class="font-bold text-lg {scrolled ? 'text-foreground' : 'text-white'} transition-colors">
						Nusa<span class="text-gradient-amber font-extrabold">Travel</span>
					</span>
					<p class="text-[10px] {scrolled ? 'text-muted-foreground' : 'text-white/70'} transition-colors tracking-widest uppercase">
						Jelajahi Dunia
					</p>
				</div>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
						  {isActive(link.href)
							? (scrolled ? 'text-primary' : 'text-white')
							: (scrolled ? 'text-foreground/70 hover:text-foreground hover:bg-black/5' : 'text-white/80 hover:text-white hover:bg-white/10')}
						"
					>
						{link.label}
						{#if isActive(link.href)}
							<span
								class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full {scrolled
									? 'bg-primary'
									: 'bg-white'}"
							></span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Desktop CTA -->
			<div class="hidden md:flex items-center gap-3">
				<a
					href="tel:+6281234567890"
					class="flex items-center gap-1.5 text-sm {scrolled ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'} transition-colors"
				>
					<Phone class="w-3.5 h-3.5" />
					+62 812-3456-7890
				</a>
				<a
					href="/contact"
					class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
					  {scrolled
						? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25'
						: 'bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/20'}"
				>
					Book Sekarang
				</a>
			</div>

			<!-- Mobile Hamburger -->
			<button
				onclick={toggleMobile}
				class="md:hidden p-2 rounded-lg transition-colors {scrolled
					? 'text-foreground hover:bg-black/5'
					: 'text-white hover:bg-white/10'}"
				aria-label="Menu"
			>
				{#if mobileOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileOpen}
		<div class="md:hidden glass border-t border-white/20">
			<div class="px-4 py-4 space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={closeMobile}
						class="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all
						  {isActive(link.href)
							? 'bg-primary/10 text-primary font-semibold'
							: 'text-foreground/70 hover:text-foreground hover:bg-black/5'}"
					>
						{link.label}
					</a>
				{/each}
				<div class="pt-3 border-t border-border mt-3">
					<a
						href="/contact"
						onclick={closeMobile}
						class="block w-full text-center px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
					>
						Book Sekarang
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
