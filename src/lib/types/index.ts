export interface Tour {
	id: string;
	slug: string;
	name: string;
	location: string;
	country: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviewCount: number;
	image: string;
	images?: string[];
	duration: string;
	durationDays: number;
	category: string;
	categorySlug: string;
	tags: string[];
	description: string;
	shortDescription: string;
	highlights: string[];
	included: string[];
	excluded: string[];
	itinerary: ItineraryDay[];
	maxGroupSize: number;
	difficulty: 'Easy' | 'Moderate' | 'Challenging';
	departure: string;
	featured?: boolean;
	badge?: string;
}

export interface ItineraryDay {
	day: number;
	title: string;
	description: string;
	activities: string[];
}

export interface Category {
	id: string;
	slug: string;
	name: string;
	icon: string;
	description: string;
	tourCount: number;
	color: string;
	gradient: string;
	image: string;
}

export interface Testimonial {
	id: string;
	name: string;
	origin: string;
	avatar: string;
	rating: number;
	comment: string;
	tour: string;
	date: string;
}

export interface TeamMember {
	id: string;
	name: string;
	role: string;
	avatar: string;
	bio: string;
}

export interface NavItem {
	label: string;
	href: string;
	children?: NavItem[];
}
