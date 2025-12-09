'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulation d'envoi (remplacer par votre API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Formulaire envoyé:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Navigation */}
      <nav className="border-b" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#d87943' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>ESport App</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium transition-colors" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Accueil
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors" style={{ color: '#d87943' }}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-16" style={{ background: 'linear-gradient(135deg, rgba(216, 121, 67, 0.1) 0%, rgba(216, 121, 67, 0.05) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Contactez-nous
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            Une question, une suggestion ou besoin d&apos;aide ? Notre équipe est là pour vous répondre.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="card-hover rounded-2xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>Email</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                Envoyez-nous un email
              </p>
              <a href="mailto:contact@esportapp.fr" className="text-sm font-medium transition-colors" style={{ color: '#d87943' }}>
                contact@esportapp.fr
              </a>
            </div>

            {/* Discord Card */}
            <div className="card-hover rounded-2xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(88, 101, 242, 0.2)' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#5865F2' }}>
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>Discord</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                Rejoignez notre serveur
              </p>
              <a href="https://discord.gg/esportapp" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors" style={{ color: '#5865F2' }}>
                discord.gg/esportapp
              </a>
            </div>

            {/* Twitter Card */}
            <div className="card-hover rounded-2xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(29, 155, 240, 0.2)' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#1DA1F2' }}>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>Twitter</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                Suivez-nous sur Twitter
              </p>
              <a href="https://twitter.com/esportapp" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors" style={{ color: '#1DA1F2' }}>
                @esportapp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-8" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                Envoyez-nous un message
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22c55e' }}>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Message envoyé avec succès !</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-medium">Erreur lors de l&apos;envoi. Réessayez plus tard.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg focus:outline-none transition-all"
                      style={{ 
                        background: 'var(--background)', 
                        color: 'var(--foreground)', 
                        border: '1px solid var(--border)',
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg focus:outline-none transition-all"
                      style={{ 
                        background: 'var(--background)', 
                        color: 'var(--foreground)', 
                        border: '1px solid var(--border)',
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg focus:outline-none transition-all"
                    style={{ 
                      background: 'var(--background)', 
                      color: 'var(--foreground)', 
                      border: '1px solid var(--border)',
                    }}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="bug">Signaler un bug</option>
                    <option value="feature">Suggestion de fonctionnalité</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 rounded-lg focus:outline-none transition-all resize-none"
                    style={{ 
                      background: 'var(--background)', 
                      color: 'var(--foreground)', 
                      border: '1px solid var(--border)',
                    }}
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: '#d87943', color: '#ffffff' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
            Questions fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-hover rounded-xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#d87943', color: '#ffffff' }}>
                  ?
                </span>
                Comment créer un compte ?
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Cliquez sur le bouton &quot;Inscription&quot; en haut à droite, remplissez le formulaire et validez votre email.
              </p>
            </div>

            <div className="card-hover rounded-xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#d87943', color: '#ffffff' }}>
                  ?
                </span>
                Comment rejoindre un tournoi ?
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Consultez la liste des tournois disponibles et cliquez sur &quot;S&apos;inscrire&quot; sur celui de votre choix.
              </p>
            </div>

            <div className="card-hover rounded-xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#d87943', color: '#ffffff' }}>
                  ?
                </span>
                Les tournois sont-ils gratuits ?
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Certains tournois sont gratuits, d&apos;autres peuvent nécessiter des frais d&apos;inscription. Vérifiez les détails.
              </p>
            </div>

            <div className="card-hover rounded-xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#d87943', color: '#ffffff' }}>
                  ?
                </span>
                Comment devenir partenaire ?
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Contactez-nous via le formulaire en sélectionnant &quot;Partenariat&quot; comme sujet de votre message.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#d87943' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>ESport App</span>
              </div>
              <p className="text-sm max-w-md" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                La plateforme complète pour gérer vos tournois esport, suivre vos équipes favorites et rester connecté avec la communauté.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: 'var(--foreground)' }}>Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm transition-colors footer-link" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-sm transition-colors footer-link" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    Administration
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm transition-colors footer-link" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: 'var(--foreground)' }}>Réseaux sociaux</h3>
              <div className="flex gap-3">
                <a href="https://twitter.com/esportapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://discord.gg/esportapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              © {new Date().getFullYear()} ESport App. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
