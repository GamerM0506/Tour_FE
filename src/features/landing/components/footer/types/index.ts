export interface SocialLink {
    platform: string;
    icon: React.ComponentType<any>;
    url: string;
}

export interface FooterLink {
    href: string;
    label: string;
}

export interface FooterProps {
    className?: string;
}