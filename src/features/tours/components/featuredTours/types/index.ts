// components/FeaturedTours/types/index.ts
export interface Tour {
    id: number;
    title: string;
    location: string;
    price: string;
    originalPrice?: string;
    image: string;
    days: string;
    rating?: number;
    category?: string;
    difficulty?: 'Easy' | 'Moderate' | 'Challenging';
    description?: string;
}

export interface FeaturedToursProps {
    className?: string;
    title?: string;
    subtitle?: string;
    showViewAllButton?: boolean;
    limit?: number;
}