import Image from "next/image";
import { Link } from "@/i18n/routing";
import { AuthForm } from "@/features/auth/components/auth-form";
import { ArrowLeft } from "lucide-react";

// Metadata SEO
export const metadata = {
  title: "Login / Register | Random Tailored Tours",
  description: "Join our community of travelers.",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex bg-sand">
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <Image
          src="wallhaven_opqtwn.jpg" 
          alt="Travel Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-transparent"></div>

        <div className="absolute bottom-12 left-12 right-12 text-sand z-10">
            <p className="font-serif text-3xl md:text-4xl leading-tight mb-4">
                "The journey of a thousand miles begins with a single step."
            </p>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                — Lao Tzu
            </p>
        </div>
      </div>

     <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 pt-24 pb-8 md:px-16 relative">
        <Link 
            href="/" 
            className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2 text-jet/50 hover:text-terracotta transition-colors text-sm font-bold uppercase tracking-wider"
        >
            <ArrowLeft size={16} /> Back to Home
        </Link>
        <AuthForm />
      </div>

    </div>
  );
}