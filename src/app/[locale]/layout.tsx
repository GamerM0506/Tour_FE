import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Fredoka } from 'next/font/google';
import { Toaster } from "@/core/components/ui/sonner";
import "@/app/globals.css";
import ReactQueryProvider from '@/core/providers/react-query-provider';
import { FloatingContact } from '@/components/common/FloatingContact';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fredoka',
});

export const metadata = {
  title: 'Random Tailored Tours',
  description: 'Du lịch độc bản tại Việt Nam',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fredoka.variable} font-sans antialiased bg-sand text-jet`}>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <main className="min-h-screen flex flex-col">
              {children}
              <FloatingContact />
            </main>
            <Toaster />
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}