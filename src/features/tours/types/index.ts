export enum TourStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    HIDDEN = 'HIDDEN',
}

export enum TourCategory {
    FOOD_TOUR = 'FOOD_TOUR',
    WALKING_TOUR = 'WALKING_TOUR',
    WORKSHOP = 'WORKSHOP',
    TRIP = 'TRIP',
    SERVICE = 'SERVICE',
}

export interface PricingTier {
    minGuests: number;
    pricePerGuest: number;
}

export interface Surcharge {
    name: string;
    amount: number;
}

export interface TourPricing {
    basePrice: number;
    currency: string;
    isFree: boolean;
    tiers?: PricingTier[];
    surcharges?: Surcharge[];
}

export interface TourStep {
    order: number;
    title: string;
    description?: string;
    images?: string[];
}

export interface TourItinerary {
    _steps: TourStep[];
}

export interface Tour {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: TourCategory;
    status: TourStatus;
    durationHours: number;
    pickupAvailable: boolean;
    meetingPoint: string;
    wheelchairAccessible: boolean;
    pricing: TourPricing;
    itinerary: TourItinerary;
    inclusions: string[];
    exclusions: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export interface GetToursRequestDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: TourStatus;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
    };
}