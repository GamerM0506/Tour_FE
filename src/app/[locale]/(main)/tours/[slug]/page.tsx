import { notFound } from "next/navigation";
import Image from "next/image";
import { ItinerarySlider } from "@/features/tours/components/tour-detail/itinerary-slider";
import { Button } from "@/core/components/ui/button";
import { tourService } from "@/features/tours/services/tour-service";
import { Clock, MapPin } from "lucide-react";

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let tour;
   try {
        console.log("Fetching slug:", slug); // 1. Xem slug đúng chưa
        tour = await tourService.getTourSlug(slug);
        console.log("Tour data received:", tour); // 2. Xem có data không
    } catch (error) {
        // 👇 3. QUAN TRỌNG: In lỗi ra Terminal để đọc
        console.error("❌ Error fetching tour details:", error);
        return notFound();
    }

    if (!tour) return notFound();

    const thumbnail = tour.images?.[0] || "/images/placeholder-tour.jpg";
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: tour.pricing.currency || 'USD', maximumFractionDigits: 0
    }).format(tour.pricing.basePrice);

    return (
        <div className="bg-sand min-h-screen">
            <div className="h-[60vh] relative flex items-center justify-center overflow-hidden">
                <Image 
                    src={thumbnail} 
                    alt={tour.name} 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <span className="text-sand/80 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                        {tour.category.replace('_', ' ')}
                    </span>
                    <h1 className="text-sand text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        {tour.name}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sand/90 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            {tour.durationHours} hours
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            {tour.meetingPoint}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-3xl font-serif text-forest mb-4">Overview</h2>
                        <p className="text-jet/70 text-lg leading-relaxed whitespace-pre-line">
                            {tour.description}
                        </p>
                    </div>

                    {(tour.inclusions.length > 0 || tour.exclusions.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-b border-forest/10">
                            {tour.inclusions.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-forest mb-3">Included</h3>
                                    <ul className="space-y-2">
                                        {tour.inclusions.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-jet/70 text-sm">
                                                <span className="text-green-500">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {tour.exclusions.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-forest mb-3">Excluded</h3>
                                    <ul className="space-y-2">
                                        {tour.exclusions.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-jet/70 text-sm">
                                                <span className="text-red-400">✕</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-lg sticky top-24">
                        <div className="mb-6">
                            <span className="text-sm text-jet/50">Price starts from</span>
                            <div className="text-3xl font-serif text-forest flex items-baseline gap-1">
                                {tour.pricing.isFree ? "Free" : formattedPrice}
                                {!tour.pricing.isFree && <span className="text-sm text-jet/50 font-sans font-normal">/ person</span>}
                            </div>
                        </div>

                        <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full py-6 text-lg font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                            Book This Tour
                        </Button>
                        
                        <p className="text-center text-xs text-jet/40 mt-4">
                            Instant confirmation • Free cancellation
                        </p>
                    </div>
                </div>
            </div>

            {/* --- ITINERARY SLIDER --- */}
            {tour.itinerary && tour.itinerary._steps && tour.itinerary._steps.length > 0 && (
                <ItinerarySlider data={tour.itinerary} />
            )}

            <div className="h-40 flex items-center justify-center text-jet/30">

            </div>

        </div>
    );
}