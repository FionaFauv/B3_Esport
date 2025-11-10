import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/lec-arena.jpeg"
            alt="LEC Arena"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 bg-gradient-to-b from-black/70 to-transparent">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">ESPORT ZONE</div>
              <div className="hidden md:flex space-x-8">
                <Link href="#tournaments" className="text-white hover:text-blue-400 transition">Tournois</Link>
                <Link href="#teams" className="text-white hover:text-blue-400 transition">Équipes</Link>
                <Link href="#news" className="text-white hover:text-blue-400 transition">Actualités</Link>
                <Link href="/login" className="text-white hover:text-blue-400 transition">Connexion</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Vivez l&apos;expérience <br />
              <span className="text-blue-500">Esport Français</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Découvrez l&apos;excellence de l&apos;esport français avec Karmine Corp et Team Vitality.
              Suivez les meilleurs joueurs de la scène française et européenne sur League of Legends.
            </p>
            <div className="space-x-4">
              <Link 
                href="#tournaments"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Voir les tournois
              </Link>
              <Link 
                href="#teams"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition"
              >
                Découvrir les équipes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <section id="tournaments" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Équipes Phares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* KC Card */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-blue-500">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 relative">
                    <div className="text-4xl font-bold text-white text-center">KC</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Karmine Corp</h3>
                <p className="text-gray-400 mb-4 text-center">Les Blues, la nouvelle force de la LEC</p>
                <div className="text-blue-400 text-center">Champions de France</div>
              </div>
            </div>

            {/* Vitality Card */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-yellow-500">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 relative">
                    <div className="text-4xl font-bold text-white text-center">VIT</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">Team Vitality</h3>
                <p className="text-gray-400 mb-4 text-center">Les abeilles de la LEC</p>
                <div className="text-yellow-400 text-center">L&apos;excellence française</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Inscrivez-vous maintenant et commencez votre parcours dans l&apos;esport
          </p>
          <Link 
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium inline-block transition"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}