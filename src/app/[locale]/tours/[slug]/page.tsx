import { ItinerarySlider } from "@/features/tours/components/tour-detail/itinerary-slider";
import { Button } from "@/core/components/ui/button";

// Layout cơ bản cho trang chi tiết
export default function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <div className="bg-sand min-h-screen">

            {/* 1. HERO BANNER (Tạm thời) */}
            <div className="h-[60vh] bg-forest relative flex items-center justify-center">
                <h1 className="text-sand text-5xl font-serif z-10">Tour Detail Header</h1>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* 2. INTRO & HIGHLIGHTS */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-serif text-forest">Tổng quan hành trình</h2>
                    <p className="text-jet/70 text-lg leading-relaxed">
                        Đây là đoạn mô tả ngắn về tour. Trải nghiệm đẳng cấp 5 sao, kết nối văn hóa và thiên nhiên...
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-forest/10 h-fit">
                    <div className="text-2xl font-serif text-forest mb-2">$1,200 <span className="text-sm text-jet/50 font-sans">/ người</span></div>
                    <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full py-6 text-lg">
                        Book This Tour
                    </Button>
                </div>
            </div>

            {/* 3. PHẦN XE CHẠY LỘ TRÌNH (ITINERARY) */}
            {/* 👇 Nhúng component xe chạy vào đây */}
            <ItinerarySlider />

            {/* 4. GALLERY & REVIEWS (Sẽ làm sau) */}
            <div className="h-96 flex items-center justify-center text-jet/30">
                Other sections...
            </div>

        </div>
    );
}