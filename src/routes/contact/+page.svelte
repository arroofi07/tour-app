<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-svelte';

	let form = $state({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		interest: ''
	});
	let submitted = $state(false);
	let submitting = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitting = true;
		setTimeout(() => {
			submitted = true;
			submitting = false;
		}, 1200);
	}

	const offices = [
		{
			icon: MapPin,
			title: 'Kantor Pusat',
			lines: ['Jl. Diponegoro No. 88', 'Menteng, Jakarta Pusat 10310'],
			color: 'from-teal-400 to-cyan-500'
		},
		{
			icon: Phone,
			title: 'Telepon & WhatsApp',
			lines: ['+62 812-3456-7890', '+62 21-5555-0088'],
			color: 'from-emerald-400 to-green-600'
		},
		{
			icon: Mail,
			title: 'Email',
			lines: ['hello@nusatravel.id', 'booking@nusatravel.id'],
			color: 'from-violet-400 to-purple-600'
		},
		{
			icon: Clock,
			title: 'Jam Operasional',
			lines: ['Senin – Jumat: 08.00 – 20.00', 'Sabtu – Minggu: 09.00 – 17.00'],
			color: 'from-amber-400 to-orange-500'
		}
	];
</script>

<svelte:head>
	<title>Hubungi Kami — NusaTravel</title>
</svelte:head>

<!-- Header -->
<section
	class="relative overflow-hidden pt-32 pb-20 text-white"
	style="background-image: url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80'); background-size: cover; background-position: center;"
>
	<div
		class="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-teal-900/70 to-slate-900/80"
	></div>
	<div class="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<span
			class="mb-4 inline-block rounded-full bg-teal-400/20 px-3 py-1 text-xs font-semibold tracking-wider text-teal-300 uppercase"
			>Kontak</span
		>
		<h1 class="mb-4 text-4xl font-bold md:text-6xl">
			Hubungi <span class="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent"
				>Kami</span
			>
		</h1>
		<p class="mx-auto max-w-lg text-white/70">
			Ada pertanyaan atau ingin booking tur? Tim kami siap membantu Anda merencanakan perjalanan
			impian.
		</p>
	</div>
</section>

<div class="section-padding bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Office cards -->
		<div class="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each offices as office}
				<div
					class="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg"
				>
					<div
						class="h-12 w-12 rounded-xl bg-gradient-to-br {office.color} mb-4 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
					>
						<office.icon class="h-6 w-6 text-white" />
					</div>
					<h3 class="mb-2 text-sm font-bold text-foreground">{office.title}</h3>
					{#each office.lines as line}
						<p class="text-sm leading-relaxed text-muted-foreground">{line}</p>
					{/each}
				</div>
			{/each}
		</div>

		<div class="grid items-start gap-12 lg:grid-cols-2">
			<!-- Contact Form -->
			<div>
				<SectionHeader
					badge="Kirim Pesan"
					title={`Mari <span class="text-gradient">Bicara</span>`}
					subtitle="Isi form berikut dan kami akan membalas dalam 1x24 jam kerja."
					align="left"
					class="mb-8"
				/>

				{#if submitted}
					<div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
						<div class="mb-4 text-5xl">✅</div>
						<h3 class="mb-2 text-xl font-bold text-emerald-700">Pesan Terkirim!</h3>
						<p class="text-sm text-emerald-600">
							Terima kasih telah menghubungi kami. Kami akan membalas dalam 1x24 jam kerja.
						</p>
						<button
							onclick={() => {
								submitted = false;
								form = { name: '', email: '', phone: '', subject: '', message: '', interest: '' };
							}}
							class="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
						>
							Kirim Pesan Lain
						</button>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-5">
						<div class="grid gap-4 sm:grid-cols-2">
							<div>
								<label
									class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
									>Nama Lengkap *</label
								>
								<input
									type="text"
									bind:value={form.name}
									required
									placeholder="Nama Anda"
									class="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary/30 focus:outline-none"
								/>
							</div>
							<div>
								<label
									class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
									>Nomor WhatsApp</label
								>
								<input
									type="tel"
									bind:value={form.phone}
									placeholder="+62 812..."
									class="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary/30 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label
								class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
								>Email *</label
							>
							<input
								type="email"
								bind:value={form.email}
								required
								placeholder="email@anda.com"
								class="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary/30 focus:outline-none"
							/>
						</div>

						<div>
							<label
								class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
								>Minat Wisata</label
							>
							<select
								bind:value={form.interest}
								class="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/30 focus:outline-none"
							>
								<option value="">Pilih kategori...</option>
								<option value="pantai">Wisata Pantai</option>
								<option value="petualangan">Petualangan & Trekking</option>
								<option value="budaya">Budaya & Sejarah</option>
								<option value="honeymoon">Honeymoon</option>
								<option value="keluarga">Wisata Keluarga</option>
								<option value="group">Group Tour</option>
							</select>
						</div>

						<div>
							<label
								class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
								>Subjek *</label
							>
							<input
								type="text"
								bind:value={form.subject}
								required
								placeholder="Pertanyaan tentang..."
								class="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary/30 focus:outline-none"
							/>
						</div>

						<div>
							<label
								class="mb-1.5 block text-xs font-semibold tracking-wider text-foreground/60 uppercase"
								>Pesan *</label
							>
							<textarea
								bind:value={form.message}
								required
								placeholder="Ceritakan perjalanan impian Anda..."
								rows={5}
								class="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary/30 focus:outline-none"
							></textarea>
						</div>

						<button
							type="submit"
							disabled={submitting}
							class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-4 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-400 hover:to-cyan-400 disabled:opacity-70"
						>
							{#if submitting}
								<div
									class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
								></div>
								Mengirim...
							{:else}
								<Send class="h-4 w-4" />
								Kirim Pesan
							{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Map placeholder + Quick contact -->
			<div class="space-y-6">
				<!-- Map placeholder -->
				<div
					class="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted"
					style="background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80'); background-size: cover; background-position: center;"
				>
					<div class="absolute inset-0 bg-teal-900/50 backdrop-blur-sm"></div>
					<div class="relative p-6 text-center text-white">
						<MapPin class="mx-auto mb-3 h-10 w-10 text-teal-300" />
						<p class="text-lg font-bold">Kantor Pusat NusaTravel</p>
						<p class="mt-1 text-sm text-white/70">Jl. Diponegoro No. 88, Jakarta Pusat</p>
						<a
							href="https://maps.google.com"
							target="_blank"
							class="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
						>
							Buka di Google Maps
						</a>
					</div>
				</div>

				<!-- WhatsApp CTA -->
				<div class="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
					<div class="flex items-start gap-4">
						<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
							<MessageCircle class="h-6 w-6" />
						</div>
						<div>
							<h3 class="mb-1 text-lg font-bold">Chat via WhatsApp</h3>
							<p class="mb-4 text-sm text-white/80">
								Respon lebih cepat! Tim kami online setiap hari 08.00–20.00 WIB.
							</p>
							<a
								href="https://wa.me/6281234567890?text=Halo%20NusaTravel,%20saya%20ingin%20tanya%20tentang%20paket%20wisata"
								target="_blank"
								class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-white/90"
							>
								💬 Chat Sekarang
							</a>
						</div>
					</div>
				</div>

				<!-- FAQ teaser -->
				<div class="rounded-2xl border border-border/50 bg-card p-6">
					<h3 class="mb-4 font-bold text-foreground">Pertanyaan Umum</h3>
					<div class="space-y-3">
						{#each ['Apakah bisa custom itinerary?', 'Berapa DP minimal untuk booking?', 'Apakah tersedia paket honeymoon?'] as faq}
							<div
								class="flex items-center justify-between border-b border-border py-2 last:border-0"
							>
								<span class="text-sm text-foreground/70">{faq}</span>
								<a
									href="/contact"
									class="ml-2 shrink-0 text-xs font-medium text-primary hover:underline">Tanya →</a
								>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
