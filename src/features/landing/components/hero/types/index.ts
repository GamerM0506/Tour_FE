export interface HeroProps {
    className?: string;
    imageUrl?: string;
    overlayOpacity?: number;
    showScrollIndicator?: boolean;
    onCtaClick?: () => void;
}

export interface HeroBackgroundProps {
    imageUrl?: string;
    overlayOpacity?: number;
    className?: string;
}

export interface HeroContentProps {
    className?: string;
    onCtaClick?: () => void;
}

export interface ScrollIndicatorProps {
    className?: string;
    targetId?: string;
}