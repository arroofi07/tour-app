<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { Award, Target, Heart, Globe, CheckCircle2 } from 'lucide-svelte';

	const team = [
		{
			name: 'Arya Wijaya',
			role: 'Founder & CEO',
			avatar: 'https://i.pravatar.cc/150?img=11',
			bio: '15 tahun pengalaman di industri pariwisata Indonesia.'
		},
		{
			name: 'Dewi Sanjaya',
			role: 'Head of Operations',
			avatar: 'https://i.pravatar.cc/150?img=49',
			bio: 'Passionate traveler dengan keahlian logistik tour premium.'
		},
		{
			name: 'Rizky Pratama',
			role: 'Lead Tour Guide',
			avatar: 'https://i.pravatar.cc/150?img=17',
			bio: 'Bersertifikat nasional, fasih 4 bahasa, 10 tahun memandu.'
		},
		{
			name: 'Sarah Amelia',
			role: 'Customer Experience',
			avatar: 'https://i.pravatar.cc/150?img=44',
			bio: 'Memastikan setiap wisatawan mendapat pengalaman terbaik.'
		}
	];

	const milestones = [
		{
			year: '2015',
			title: 'Awal Berdiri',
			desc: 'NusaTravel didirikan dengan 5 paket tur perdana di Bali.'
		},
		{
			year: '2017',
			title: '10.000 Wisatawan',
			desc: 'Mencapai 10.000 pelanggan dan ekspansi ke 30 destinasi.'
		},
		{
			year: '2019',
			title: 'Penghargaan Nasional',
			desc: 'Meraih penghargaan Best Tour Agency dari Kemenparekraf.'
		},
		{
			year: '2021',
			title: 'Platform Digital',
			desc: 'Meluncurkan platform booking online dan app mobile.'
		},
		{
			year: '2023',
			title: 'Ekspansi Regional',
			desc: 'Membuka layanan ke destinasi Asia Tenggara.'
		},
		{
			year: '2025',
			title: '50K Wisatawan',
			desc: 'Merayakan 50.000+ pelanggan puas dari seluruh Indonesia.'
		}
	];

	const values = [
		{
			icon: Heart,
			title: 'Passion',
			desc: 'Kami mencintai perjalanan dan ingin berbagi keindahan itu dengan Anda.',
			color: 'from-rose-400 to-pink-600'
		},
		{
			icon: Award,
			title: 'Excellence',
			desc: 'Standar kualitas tinggi di setiap detail perjalanan Anda.',
			color: 'from-amber-400 to-orange-500'
		},
		{
			icon: Globe,
			title: 'Sustainability',
			desc: 'Wisata bertanggung jawab yang menjaga alam dan budaya lokal.',
			color: 'from-emerald-400 to-teal-600'
		},
		{
			icon: Target,
			title: 'Customer First',
			desc: 'Kepuasan Anda adalah prioritas utama kami, selalu.',
			color: 'from-violet-400 to-purple-600'
		}
	];
</script>

<svelte:head>
	<title>Tentang Kami — NusaTravel</title>
</svelte:head>

<!-- Hero -->
<section
	class="relative overflow-hidden pt-32 pb-24 text-white"
	style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'); background-size: cover; background-position: center;"
>
	<div
		class="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-teal-900/70 to-slate-900/80"
	></div>
	<div class="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<span
			class="mb-4 inline-block rounded-full bg-teal-400/20 px-3 py-1 text-xs font-semibold tracking-wider text-teal-300 uppercase"
			>Tentang Kami</span
		>
		<h1 class="mb-6 text-4xl font-bold md:text-6xl">
			Kami <span class="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent"
				>Mewujudkan</span
			><br />Liburan Impian Anda
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-white/70">
			Sejak 2015, NusaTravel telah membantu lebih dari 50.000 wisatawan menemukan keindahan
			Indonesia dan dunia dengan pengalaman tak terlupakan.
		</p>
	</div>
</section>

<!-- Mission & Story -->
<section class="section-padding bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<div>
				<SectionHeader
					badge="Misi Kami"
					title={`Menghubungkan <span class="text-gradient">Manusia</span> dengan Keindahan Dunia`}
					subtitle="NusaTravel lahir dari kecintaan mendalam terhadap keindahan alam dan kekayaan budaya Nusantara. Kami percaya setiap orang berhak mendapatkan pengalaman perjalanan yang luar biasa."
					align="left"
					class="mb-8"
				/>
				<div class="space-y-4">
					{#each ['Pemandu bersertifikat nasional & internasional', 'Akomodasi pilihan terbaik tiap destinasi', 'Itinerary yang dirancang oleh travel expert', 'Dukungan 24/7 selama perjalanan Anda'] as point}
						<div class="flex items-center gap-3">
							<CheckCircle2 class="h-5 w-5 shrink-0 text-emerald-500" />
							<span class="text-sm text-foreground/80">{point}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="grid h-80 grid-cols-2 gap-4">
				<img
					src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
					alt="Bali"
					class="h-full w-full rounded-2xl object-cover"
				/>
				<div class="flex flex-col gap-4">
					<img
						src="https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=600&q=80"
						alt="Guide"
						class="w-full flex-1 rounded-2xl object-cover"
					/>
					<img
						src="https://images.unsplash.com/photo-1570705502185-3b3a66fe7204?w=600&q=80"
						alt="Bromo"
						class="w-full flex-1 rounded-2xl object-cover"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section class="section-padding bg-muted/30">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			badge="Nilai Kami"
			title={`Prinsip yang <span class="text-gradient">Kami Junjung</span>`}
			class="mb-12"
		/>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as v}
				<div
					class="group rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-lg"
				>
					<div
						class="h-14 w-14 rounded-2xl bg-gradient-to-br {v.color} mx-auto mb-4 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
					>
						<v.icon class="h-7 w-7 text-white" />
					</div>
					<h3 class="mb-2 font-bold text-foreground">{v.title}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Timeline -->
<section class="section-padding bg-background">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			badge="Perjalanan Kami"
			title={`Dari Kecil Hingga <span class="text-gradient">Dipercaya Ribuan</span>`}
			class="mb-12"
		/>
		<div class="relative">
			<div
				class="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-border md:block"
			></div>
			<div class="space-y-8">
				{#each milestones as m, i}
					<div
						class="relative flex flex-col items-start gap-4 md:flex-row md:items-center {i % 2 === 0
							? 'md:flex-row-reverse'
							: ''}"
					>
						<div class="flex-1 {i % 2 === 0 ? 'md:text-right' : ''}">
							<div
								class="rounded-2xl border border-border/50 bg-card p-5 transition-all hover:shadow-md"
							>
								<span class="text-xs font-bold tracking-wider text-primary uppercase">{m.year}</span
								>
								<h4 class="mt-1 mb-1 font-bold text-foreground">{m.title}</h4>
								<p class="text-sm text-muted-foreground">{m.desc}</p>
							</div>
						</div>
						<div
							class="z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 md:flex"
						>
							{m.year.slice(2)}
						</div>
						<div class="hidden flex-1 md:block"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Team -->
<section class="section-padding bg-muted/30">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			badge="Tim Kami"
			title={`Orang-orang di <span class="text-gradient">Balik NusaTravel</span>`}
			class="mb-12"
		/>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each team as member}
				<div
					class="group rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/20 hover:shadow-lg"
				>
					<div class="relative mx-auto mb-4 h-20 w-20">
						<img
							src={member.avatar}
							alt={member.name}
							class="h-full w-full rounded-full object-cover ring-4 ring-primary/10 transition-all group-hover:ring-primary/30"
						/>
						<div
							class="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2 border-card bg-emerald-400"
						></div>
					</div>
					<h3 class="mb-0.5 font-bold text-foreground">{member.name}</h3>
					<p class="mb-3 text-xs font-semibold text-primary">{member.role}</p>
					<p class="text-xs leading-relaxed text-muted-foreground">{member.bio}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
