import type { Metadata } from 'next';
import NavbarAdmin from '@/components/admin/NavbarAdmin';

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


export default function AdminLayout({
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

