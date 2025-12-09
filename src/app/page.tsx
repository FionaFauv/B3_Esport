import  HeroSection from '@/components/home/HeroSection'
import Menu from '@/components/home/Menu'
import StreamLolSection from '@/components/home/StreamLolSection'
import ChoiceSection from '@/components/home/ChoiceSection'
import Footer from '@/components/home/Footer'
import LiveRiotGamesSection from '@/components/home/LiveRiotGamesSection'


export default function HomePage() {
  return (
    <>
      <Menu />

        <HeroSection />
        <LiveRiotGamesSection />
        <StreamLolSection />
        <ChoiceSection />
    
      <Footer />
    </>
  )
}
 