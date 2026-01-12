export interface Feature {
    icon: React.ComponentType<any>;
    title: string;
    desc: string;
    accentColor?: string;
}

export interface PhilosophyProps {
    className?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    features?: Feature[];
}