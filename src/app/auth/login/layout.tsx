import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte Paris Esportif.',

  robots: {
    index: false,       
    follow: true,       
    nocache: true,      
    googleBot: {
      index: false,
      follow: true,
    },
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

