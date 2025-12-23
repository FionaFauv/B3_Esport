import { Navbar } from '@/components/ui/navbar'
import type { Metadata } from "next";
import HeroSection from "@/components/explication/HeroSection";
import TempsReelSection from "@/components/explication/TempsRéelSection";
import ParisSection from "@/components/explication/ParisSection";
import CTASection from "@/components/explication/CTASection";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Explication - Fonctionnement de la plateforme",
  description: "Apprends à utiliser notre plateforme de paris esportifs et découvre toutes ses fonctionnalités.",
};

export default function ExplicationPage() {
    return (
        <>
        {/** Menu - navigation*/}
        <Navbar />
        {/** Hero section */}
        <HeroSection />
        {/** Temps Réel section */}
        <ParisSection />
        {/** Call to Action section */}
        <TempsReelSection />
        {/** Paris section */}
        <CTASection />
        {/** Footer */}
        <Footer />
        </>
    )
}