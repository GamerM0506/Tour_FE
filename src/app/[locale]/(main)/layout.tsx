import { Header } from "@/features/landing/components/header";
import { Footer } from "@/features/landing/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  );
}