import Menu from "@/components/home/Menu";
import HeroSection from "@/components/explication/HeroSection";
import TempsReelSection from "@/components/explication/TempsRéelSection";
import ParisSection from "@/components/explication/ParisSection";
import CTASection from "@/components/explication/CTASection";
import Footer from "@/components/home/Footer";

export default function ExplicationPage() {
    return (
        <>
        {/** Menu - navigation*/}
        <Menu />
        {/** Hero section */}
        <HeroSection />
        {/** Temps Réel section */}
        <TempsReelSection />
        {/** Paris section */}
        <ParisSection />
        {/** Call to Action section */}
        <CTASection />
        {/** Footer */}
        <Footer />
        </>
    )
}