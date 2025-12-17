import { Navbar } from '@/components/ui/navbar'
import HeroSection from "@/components/explication/HeroSection";
import TempsReelSection from "@/components/explication/TempsRéelSection";
import ParisSection from "@/components/explication/ParisSection";
import CTASection from "@/components/explication/CTASection";
import Footer from "@/components/home/Footer";

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