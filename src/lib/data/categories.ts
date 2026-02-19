import type { Category } from '$lib/types';

export const categories: Category[] = [
	{
		id: '1',
		slug: 'pantai',
		name: 'Wisata Pantai',
		icon: '🌊',
		description: 'Pantai eksotis dengan pasir putih & air biru jernih',
		tourCount: 24,
		color: '#0891b2',
		gradient: 'from-cyan-400 to-blue-600',
		image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'
	},
	{
		id: '2',
		slug: 'petualangan',
		name: 'Petualangan',
		icon: '🏔️',
		description: 'Trekking gunung, diving, dan petualangan alam liar',
		tourCount: 18,
		color: '#059669',
		gradient: 'from-emerald-400 to-teal-600',
		image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
	},
	{
		id: '3',
		slug: 'budaya',
		name: 'Budaya & Sejarah',
		icon: '🏯',
		description: 'Warisan budaya, candi bersejarah & tradisi lokal',
		tourCount: 21,
		color: '#d97706',
		gradient: 'from-amber-400 to-orange-600',
		image: 'https://images.unsplash.com/photo-1584550813774-1f7a35e0eaed?w=600&q=80'
	},
	{
		id: '4',
		slug: 'ekowisata',
		name: 'Ekowisata',
		icon: '🌿',
		description: 'Wisata alam lestari & konservasi satwa liar',
		tourCount: 12,
		color: '#16a34a',
		gradient: 'from-green-400 to-emerald-600',
		image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=600&q=80'
	},
	{
		id: '5',
		slug: 'city-tour',
		name: 'City Tour',
		icon: '🏙️',
		description: 'Jelajahi kota modern, kuliner & destinasi urban',
		tourCount: 9,
		color: '#7c3aed',
		gradient: 'from-violet-400 to-purple-600',
		image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80'
	},
	{
		id: '6',
		slug: 'alam',
		name: 'Alam & Danau',
		icon: '🏞️',
		description: 'Danau vulkanik, air terjun & panorama alam indah',
		tourCount: 15,
		color: '#0284c7',
		gradient: 'from-sky-400 to-blue-600',
		image: 'https://images.unsplash.com/photo-1571993655213-d2c38e5a2f40?w=600&q=80'
	}
];
