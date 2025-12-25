import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TranslationProvider } from "@/components/TranslationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pham Thanh Truong - Software Developer",
  description: "Software Developer với 3 năm kinh nghiệm trong phát triển web và mobile sử dụng React, React Native, Next.js và Laravel.",
  keywords: "Software Developer, React, React Native, Next.js, TypeScript, JavaScript, Web Development",
  authors: [{ name: "Pham Thanh Truong" }],
  creator: "Pham Thanh Truong",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://thomasworks.netlify.app/",
    title: "Pham Thanh Truong - Software Developer",
    description: "Sofware Developer với 3 năm kinh nghiệm trong phát triển web và mobile",
    siteName: "Pham Thanh Truong Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pham Thanh Truong - Software Developer",
    description: "Software Developer với 3 năm kinh nghiệm trong phát triển web và mobile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <TranslationProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
