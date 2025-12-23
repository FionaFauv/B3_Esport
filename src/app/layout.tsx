import type { Metadata } from "next";
import{ ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from "next/font/google";
import { AuthInitializer } from "@/components/AuthInitializer";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Esport - Paris sportif",
  description: "Site de paris sportif spécialisé dans l'esport.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthInitializer />
          <ParticlesBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
