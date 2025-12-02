import type { Metadata } from 'next';
import NavbarVisiteur from '@/components/NavbarVisiteur';

export const metadata: Metadata = {
  title: 'Paris - Esport Paris Sportif',
  description: 'Compte Paris.',

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
  return (
    <>
      <NavbarVisiteur />
      {children}
    </>
  );
}

