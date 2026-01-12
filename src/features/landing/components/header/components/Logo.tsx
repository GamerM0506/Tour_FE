import { cn } from "@/core/utils/cn";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";

interface LogoProps {
    className?: string;
    priority?: boolean;
    hideTextOnTablet?: boolean;
}

export const Logo = ({
    className,
    priority = false,
    hideTextOnTablet = true
}: LogoProps) => {
    const isHomepage = typeof window !== 'undefined' && window.location.pathname === '/';
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkTablet = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 768 && width <= 1024);
        };

        checkTablet();
        window.addEventListener('resize', checkTablet);
        return () => window.removeEventListener('resize', checkTablet);
    }, []);

    if (isTablet && hideTextOnTablet) {
        return (
            <>
                <Link href="/" className={cn("flex items-center group z-[60]", className)}> 
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-jet/10 shadow-lg">
                        <Image
                            src="Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1080x1080_fq0bpa.png"
                            alt="Random Tours Logo"
                            fill
                            className="object-cover bg-white"
                            priority={priority || isHomepage}
                            sizes="56px"
                        />
                    </div>

                </Link>
                <div className="flex flex-col">
                    <span className="font-serif text-lg md:text-xl font-semibold tracking-tight uppercase leading-none text-jet">
                        Random Tours
                    </span>
                    <span className="text-[7px] tracking-[0.18em] uppercase font-medium text-terracotta hidden md:block">
                        Vietnam Travel
                    </span>
                </div>

            </>
        );
    }

    return (
        <Link href="/" className={cn("flex items-center gap-3 group z-[60]", className)}>
            {/* Logo normal size */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-jet/10 shadow-sm">
                <Image
                    src="Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1080x1080_fq0bpa.png"
                    alt="Random Tours Logo"
                    fill
                    className="object-cover bg-white"
                    priority={priority || isHomepage}
                    sizes="(max-width: 768px) 40px, 48px"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter uppercase leading-none text-jet">
                    Random Tours
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-terracotta hidden md:block">
                    Vietnam Travel
                </span>
            </div>
        </Link>
    );
};