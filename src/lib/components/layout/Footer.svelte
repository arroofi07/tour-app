<script lang="ts">
	import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-svelte';

	const quickLinks = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Semua Paket Tur', href: '/tours' },
		{ label: 'Tentang Kami', href: '/about' },
		{ label: 'Blog Perjalanan', href: '/blog' },
		{ label: 'Hubungi Kami', href: '/contact' }
	];

	const destinations = [
		{ label: 'Bali, Indonesia', href: '/tours?location=bali' },
		{ label: 'Raja Ampat', href: '/tours?location=raja-ampat' },
		{ label: 'Komodo Island', href: '/tours?location=komodo' },
		{ label: 'Lombok & Gili', href: '/tours?location=lombok' },
		{ label: 'Yogyakarta', href: '/tours?location=yogyakarta' }
	];

	const socials = [
		{ icon: Instagram, href: '#', label: 'Instagram' },
		{ icon: Facebook, href: '#', label: 'Facebook' },
		{ icon: Twitter, href: '#', label: 'Twitter' },
		{ icon: Youtube, href: '#', label: 'YouTube' }
	];

	let email = $state('');

	function handleNewsletter(e: Event) {
		e.preventDefault();
		email = '';
		alert('Terima kasih! Email Anda telah terdaftar.');
	}
</script>

<footer class="bg-slate-900 text-slate-300">
	<!-- Top wave -->
	<div class="wave-shape">
		<svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
			<path d="M0 60L48 53.3C96 46.7 192 33.3 288 26.7C384 20 480 20 576 26.7C672 33.3 768 46.7 864 46.7C960 46.7 1056 33.3 1152 26.7C1248 20 1344 20 1392 20L1440 20V0H0V60Z" fill="rgb(15 23 42)"/>
		</svg>
	</div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
			<!-- Brand -->
			<div class="lg:col-span-1">
				<a href="/" class="flex items-center gap-2 mb-5">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
						<MapPin class="w-5 h-5 text-white" />
					</div>
					<span class="font-bold text-xl text-white">Nusa<span class="text-amber-400">Travel</span></span>
				</a>
				<p class="text-sm text-slate-400 leading-relaxed mb-6">
					Mewujudkan impian perjalanan Anda dengan layanan terpercaya, pemandu berpengalaman, dan paket wisata terbaik sejak 2015.
				</p>
				<div class="space-y-2.5">
					<div class="flex items-center gap-2.5 text-sm text-slate-400">
						<MapPin class="w-4 h-4 text-teal-400 shrink-0" />
						Jl. Diponegoro No. 88, Jakarta Pusat
					</div>
					<div class="flex items-center gap-2.5 text-sm text-slate-400">
						<Phone class="w-4 h-4 text-teal-400 shrink-0" />
						+62 812-3456-7890
					</div>
					<div class="flex items-center gap-2.5 text-sm text-slate-400">
						<Mail class="w-4 h-4 text-teal-400 shrink-0" />
						hello@nusatravel.id
					</div>
				</div>
				<div class="flex items-center gap-3 mt-6">
					{#each socials as social}
						<a
							href={social.href}
							aria-label={social.label}
							class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-200"
						>
							<social.icon class="w-4 h-4" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="font-semibold text-white mb-5">Menu</h4>
				<ul class="space-y-3">
					{#each quickLinks as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
							>
								<ArrowRight class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Destinations -->
			<div>
				<h4 class="font-semibold text-white mb-5">Destinasi Populer</h4>
				<ul class="space-y-3">
					{#each destinations as dest}
						<li>
							<a
								href={dest.href}
								class="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
							>
								<ArrowRight class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								{dest.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Newsletter -->
			<div>
				<h4 class="font-semibold text-white mb-2">Newsletter</h4>
				<p class="text-sm text-slate-400 mb-4">Dapatkan penawaran eksklusif dan inspirasi perjalanan setiap minggu.</p>
				<form onsubmit={handleNewsletter} class="space-y-3">
					<input
						type="email"
						bind:value={email}
						placeholder="email@kamu.com"
						required
						class="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
					/>
					<button
						type="submit"
						class="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-sm hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/20"
					>
						Daftar Sekarang
					</button>
				</form>
				<p class="text-xs text-slate-500 mt-3">Tidak ada spam. Berhenti berlangganan kapan saja.</p>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-slate-500">
				&copy; 2026 NusaTravel. Semua hak dilindungi.
			</p>
			<div class="flex items-center gap-6 text-sm text-slate-500">
				<a href="/privacy" class="hover:text-teal-400 transition-colors">Kebijakan Privasi</a>
				<a href="/terms" class="hover:text-teal-400 transition-colors">Syarat & Ketentuan</a>
			</div>
		</div>
	</div>
</footer>
