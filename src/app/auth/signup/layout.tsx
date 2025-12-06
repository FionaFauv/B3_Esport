import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Inscription',
  description: 'Créez votre compte Paris Esportif.',

  robots: {
    index: true,       
    follow: true,       
    nocache: true,      
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
