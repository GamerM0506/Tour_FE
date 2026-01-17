export interface PromiseCardProps {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
  }>;
  title: string;
  description: string;
  className?: string;
}
