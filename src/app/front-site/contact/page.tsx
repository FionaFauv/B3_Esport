import Menu from '@/components/home/Menu'
import HeroSection from '@/components/contact/HeroSection'
import ReseauxSociauxSection from '@/components/contact/ReseauxSociauxSection'
import FAQSection from '@/components/contact/FAQSection'
import Footer from '@/components/home/Footer'


export default function ContactPage() {
  return (
    <>
        {/** Menu - navigation*/}
      <Menu />
      
        {/** Section Hero */}
      <HeroSection />
        {/** Section Réseaux Sociaux */}
      <ReseauxSociauxSection />
        {/** Section FAQ */}
      <FAQSection />
      {/** Footer */}
      <Footer />
    </>
  )
}