'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '../ui/container';   

export default function FormSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // Get user after login to determine redirect
      const user = useAuthStore.getState().user;
      if (user?.admin) {
        router.push('/admin');
      } else {
        router.push('/visiteur');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="meru-auth-container">
      <div className="meru-auth-wrapper">
        {/* Logo et titre */}
        <div className="meru-auth-header">
          <div className="meru-auth-logo">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="meru-auth-title">Esport Manager</h1>
          <p className="meru-auth-subtitle">Connectez-vous à votre compte</p>
        </div>

        {/* Formulaire de connexion */}
        <div className="meru-auth-card">
          <form onSubmit={handleLogin} className="meru-auth-form">
            {/* Message d'erreur */}
            {error && (
              <div className="meru-auth-error">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Champ Email */}
            <div className="meru-auth-field">
              <label htmlFor="email" className="meru-auth-label">
                Adresse email
              </label>
              <div className="meru-auth-input-wrapper">
                <div className="meru-auth-input-icon">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="meru-auth-input"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="meru-auth-field">
              <label htmlFor="password" className="meru-auth-label">
                Mot de passe
              </label>
              <div className="meru-auth-input-wrapper">
                <div className="meru-auth-input-icon">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="meru-auth-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="meru-auth-submit"
            >
              {loading ? (
                <>
                  <svg className="meru-auth-spinner h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Liens supplémentaires */}
          <div className="meru-auth-links">
            <Link 
              href="/" 
              className="meru-auth-link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="meru-auth-footer">
          <p>© 2025 Esport Zone. Tous droits réservés.</p>
        </div>
      </div>
    </Container>
  );
}