// components/Footer/components/NewsletterSection.tsx
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { cn } from "@/core/utils/cn";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface NewsletterSectionProps {
  className?: string;
}

export const NewsletterSection = ({ className }: NewsletterSectionProps) => {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed:", email);
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      "border-b border-sand/10 pb-16 mb-16",
      className
    )}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-terracotta/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-sand/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        <div className="max-w-2xl text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
            <span className="text-terracotta text-sm font-bold tracking-widest uppercase">
              Exclusive Updates
            </span>
          </div>
          
          <h3 className="font-serif text-4xl lg:text-5xl text-sand mb-4 leading-tight">
            {t("newsletter_title") || "Stay Inspired"}
          </h3>
          
          <p className="text-sand/60 text-lg font-light leading-relaxed">
            {t("newsletter_desc") || "Join our community of travelers. Get curated stories, exclusive offers, and travel inspiration delivered to your inbox."}
          </p>
        </div>

        <div className="w-full lg:w-auto">
          <form onSubmit={handleSubscribe} className="relative">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email_placeholder") || "Your email address"}
                  className={cn(
                    "bg-transparent border-sand/30",
                    "text-sand placeholder:text-sand/40",
                    "focus-visible:ring-terracotta focus-visible:border-terracotta",
                    "h-14 px-6 min-w-[300px] lg:min-w-[380px]",
                    "rounded-xl backdrop-blur-sm"
                  )}
                  required
                />
                {/* Success message */}
                {isSubscribed && (
                  <div className="absolute -bottom-10 left-0 text-green-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Thank you for subscribing!
                  </div>
                )}
              </div>
              
              <Button 
                type="submit"
                className={cn(
                  "bg-gradient-to-r from-terracotta to-amber-600",
                  "hover:from-terracotta/90 hover:to-amber-600/90",
                  "text-white h-14 px-8",
                  "font-medium uppercase tracking-wider",
                  "rounded-xl shadow-lg hover:shadow-xl",
                  "transition-all duration-300 hover:-translate-y-0.5",
                  "flex items-center gap-3"
                )}
              >
                <Send size={18} />
                {t("subscribe") || "Subscribe"}
              </Button>
            </div>
            
            {/* Privacy note */}
            <p className="text-sand/40 text-xs mt-4 text-center sm:text-left">
              By subscribing, you agree to our Privacy Policy. We respect your inbox.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};