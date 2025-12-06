import type { Metadata } from 'next';
import NavbarAdmin from '@/components/NavbarAdmin';

export const metadata: Metadata = {
  title: 'Gestion Admin - Esport Paris Sportif',
  description: 'Gestion de la plateforme esport.',

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
      <NavbarAdmin />
      {children}
    </>
  );
}

