import { Navbar } from '@/components/ui/navbar'
import HeroSection from '@/components/contact/HeroSection'
import ReseauxSociauxSection from '@/components/contact/ReseauxSociauxSection'
import FAQSection from '@/components/contact/FAQSection'
import Footer from '@/components/home/Footer'
import { MeruBackground } from '@/components/ui/Merubackground'

export default function ContactPage() {
  return (
    <>
        {/** Menu - navigation*/}
      <Navbar />
      <MeruBackground>
        {/** Section Hero */}
      <HeroSection />
        {/** Section Réseaux Sociaux */}
      <ReseauxSociauxSection />
        {/** Section FAQ */}
      <FAQSection />
      {/** Footer */}
      <Footer />
      </MeruBackground>
    </>
  )
}