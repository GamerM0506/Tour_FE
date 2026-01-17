export interface Tour {
    id: string;
    title: string;
    description?: string;
    location: string;
    region?: string;
    price: number;
    originalPrice?: number;
    currency: string;
    duration: string;
    days: number;
    nights: number;
    rating: number;
    reviewCount: number;
    image: string;
    images?: string[];
    tags: string[];
    category: string[];
    difficulty?: 'Easy' | 'Moderate' | 'Challenging';
    highlights?: string[];
    inclusions?: string[];
    exclusions?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FilterOptions {
    categories: string[];
    durations: string[];
    priceRange: [number, number];
    difficulties: string[];
    regions: string[];
}

export interface SortOption {
    label: string;
    value: string;
    field: string;
    order: 'asc' | 'desc';
}