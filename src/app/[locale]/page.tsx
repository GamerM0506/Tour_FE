import { Hero } from "@/features/landing/components/hero";
import { Philosophy } from "@/features/landing/components/philosophy";
import { FeaturedTours } from "@/features/tours/components/featuredTours";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <FeaturedTours
        limit={3}
        showViewAllButton={true}
      />
    </>
  );
}