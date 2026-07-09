import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/shared/ThemeProvider";
import { ToastProvider } from "../components/shared/Toast";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelForge - Professional Online Image Cropper & Format Converter",
  description:
    "Crop and convert images instantly in your browser. Fully private, offline-first image editor with custom aspects, formats (PNG, JPG, WebP, AVIF, BMP, ICO), and compression quality control.",
  keywords: "image cropper, format converter, client-side, resize image, webp converter, avif converter, icon generator, privacy first",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-500">
        <ThemeProvider>
          <ToastProvider>
            {/* Header / Navigation */}
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow flex flex-col w-full mx-auto max-w-7xl px-4 py-8 md:px-8">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
