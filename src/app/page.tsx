import  HeroSection from '@/components/home/HeroSection'
import Menu from '@/components/home/Menu'
import StreamLolSection from '@/components/home/StreamLolSection'
import ChoiceSection from '@/components/home/ChoiceSection'
import Footer from '@/components/home/Footer'
import LiveRiotGamesSection from '@/components/home/LiveRiotGamesSection'


export default function HomePage() {
  return (
    <>
        {/** Menu - navigation*/}
      <Menu />

        {/** Section Hero */}
        <HeroSection />
        {/** Section Streams LoL et Sidebar */}
        <LiveRiotGamesSection />
        {/** Section Streams LoL et Sidebar */}
        <StreamLolSection />
        {/** Section Call-to-Action */}
        <ChoiceSection />
      {/** Footer */}
      <Footer />
    </>
  )
}
