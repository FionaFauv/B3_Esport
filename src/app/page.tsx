import  HeroSection from '@/components/home/HeroSection'
import StreamLolSection from '@/components/home/StreamLolSection'
import ChoiceSection from '@/components/home/ChoiceSection'
import Footer from '@/components/home/Footer'
import LiveRiotGamesSection from '@/components/home/LiveRiotGamesSection'
import { MeruBackground } from '@/components/ui/Merubackground'
import { Navbar } from '@/components/ui/navbar'

export default function HomePage() {
  return (
    <>
        {/** Menu - navigation*/}
        <Navbar />
        <MeruBackground>
        {/** Section Hero */}
        <HeroSection />
        {/** Section Streams LoL et Sidebar */}
        <LiveRiotGamesSection />
        {/** Section Streams LoL et Sidebar */}
        <StreamLolSection />
        {/** Section Call-to-Action */}
        <ChoiceSection />
        </MeruBackground>
      {/** Footer */}
      <Footer />
    </>
  )
}
