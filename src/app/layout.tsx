import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'TryUsBD - Premium Gadget Store',
  description: 'Discover the latest technology with amazing deals. Buy headphones, earbuds, smartwatches, powerbanks and more from TryUsBD.',
  keywords: 'TryUsBD, gadget store, Bangladesh, headphones, AirPods, smartwatch, powerbank, Bose, Sony, Apple',
  authors: [{ name: 'Gazi Faizul Islam' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <AppProvider>
          <Navbar />
          <ToastContainer />
          <main className="flex-grow pt-28">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
