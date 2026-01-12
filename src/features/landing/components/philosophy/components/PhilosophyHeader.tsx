import { cn } from "@/core/utils/cn";

interface PhilosophyHeaderProps {
    className?: string;
    subtitle?: string;
    title?: string;
    description?: string;
}

export const PhilosophyHeader = ({
    className,
    subtitle = "Our Philosophy",
    title = "Không chỉ là du lịch, đó là sự trở về.",
    description = "Chúng tôi tin rằng sự sang trọng đích thực không nằm ở khách sạn dát vàng, mà nằm ở khoảnh khắc bạn chạm tay vào rêu phong cổ kính, hay hít thở bầu không khí tinh khiết của núi rừng."
}: PhilosophyHeaderProps) => {
    return (
        <div className={cn(
            "max-w-4xl mx-auto text-center mb-16 md:mb-24 relative",
            className
        )}>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-px bg-terracotta/30" />

            <span className={cn(
                "text-terracotta text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 block",
                "inline-block px-4 py-2 bg-terracotta/5 rounded-full"
            )}>
                {subtitle}
            </span>

            <h2 className={cn(
                "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                "font-serif text-forest font-medium leading-tight mb-8",
                "relative"
            )}>
                {title.split(', ').map((line, index, array) => (
                    <span key={index} className="block">
                        {line}
                        {index < array.length - 1 && ','}
                    </span>
                ))}

                <span className={cn(
                    "absolute -bottom-4 left-1/2 transform -translate-x-1/2",
                    "w-24 h-1 bg-gradient-to-r from-terracotta to-forest rounded-full"
                )} />
            </h2>

            <div className="relative">
                <p className={cn(
                    "text-jet/70 text-lg md:text-xl xl:text-2xl",
                    "font-light leading-relaxed md:leading-loose",
                    "max-w-3xl mx-auto",
                    "px-4 md:px-0"
                )}>
                    {description}
                </p>

                <div className="absolute -top-8 -left-4 text-terracotta/20 font-serif text-6xl">
                    "
                </div>
                <div className="absolute -bottom-8 -right-4 text-terracotta/20 font-serif text-6xl">
                    "
                </div>
            </div>
        </div>
    );
};