'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/AuthStore'
import Link from 'next/link'

export default function VisiteurDashboard() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])


  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      
      <main className="container mx-auto px-6 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Tableau de bord
          </h1>
          <p className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            Bienvenue dans votre espace esport
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 - Paris actifs */}
          <div className="rounded-2xl p-6 border transition-all duration-300 hover:scale-105" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(216, 121, 67, 0.2)',
            boxShadow: '0 4px 15px rgba(216, 121, 67, 0.1)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold" style={{ color: '#d87943' }}>0</span>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Paris actifs</h3>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>En cours</p>
          </div>

          {/* Card 2 - Matchs disponibles */}
          <div className="rounded-2xl p-6 border transition-all duration-300 hover:scale-105" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(59, 130, 246, 0.2)',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-blue-500">12</span>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Matchs à venir</h3>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Cette semaine</p>
          </div>

          {/* Card 3 - Gains totaux */}
          <div className="rounded-2xl p-6 border transition-all duration-300 hover:scale-105" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-green-500">0 €</span>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Gains totaux</h3>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Tous vos gains</p>
          </div>

          {/* Card 4 - Taux de réussite */}
          <div className="rounded-2xl p-6 border transition-all duration-300 hover:scale-105" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(168, 85, 247, 0.2)',
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.1)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-purple-500">0%</span>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Taux de réussite</h3>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Paris gagnants</p>
          </div>
        </div>

        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prochains matchs */}
          <div className="lg:col-span-2 rounded-2xl p-6 border" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(128, 128, 128, 0.2)',
          }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                Prochains matchs
              </h2>
              <Link 
                href="/visiteur/matchs"
                className="text-sm font-medium px-4 py-2 rounded-lg transition-all hover:scale-105"
                style={{ 
                  color: '#d87943',
                  backgroundColor: 'rgba(216, 121, 67, 0.1)',
                  border: '1px solid rgba(216, 121, 67, 0.3)'
                }}
              >
                Voir tout
              </Link>
            </div>

            {/* Liste de matchs fictifs */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02]" style={{ 
                  borderColor: 'rgba(128, 128, 128, 0.1)',
                  backgroundColor: 'rgba(128, 128, 128, 0.05)'
                }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#d87943' }}>
                      <span className="text-white font-bold">T{i}</span>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--foreground)' }}>
                        Team {i} vs Team {i + 1}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                        Aujourd&apos;hui à {14 + i}h00
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/visiteur/matchs"
                    className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)' }}
                  >
                    Parier
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Activité récente */}
          <div className="rounded-2xl p-6 border" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(128, 128, 128, 0.2)',
          }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Activité récente
            </h2>

            <div className="space-y-4">
              {/* Message vide pour le moment */}
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
                  backgroundColor: 'rgba(216, 121, 67, 0.1)',
                }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Aucune activité
                </p>
                <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Commencez à parier sur des matchs !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bannière d'action */}
        <div className="mt-8 rounded-2xl p-8 text-center relative overflow-hidden" style={{ 
          background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
        }}>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Prêt à parier ?
            </h2>
            <p className="text-white text-lg opacity-90 mb-6">
              Découvrez les matchs disponibles et tentez votre chance !
            </p>
            <Link
              href="/visiteur/matchs"
              className="inline-block px-8 py-3 rounded-lg font-bold text-lg transition-all hover:scale-105"
              style={{ 
                backgroundColor: 'white',
                color: '#d87943',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              }}
            >
              Voir les matchs
            </Link>
          </div>
          
          {/* Décoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ 
            background: 'white',
            transform: 'translate(30%, -30%)'
          }}></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ 
            background: 'white',
            transform: 'translate(-30%, 30%)'
          }}></div>
        </div>
      </main>
    </div>
  )
}
