'use client'

import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'next/navigation';
import  CardSection  from '@/components/admin/dashboard/CardSection';
import AccessSection from '@/components/admin/dashboard/AccessSection';

// Fonction pour le tableau de bord (falcutatif à revoir si j'ai le temps.)
export default function Adminpage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated && !user?.admin) {
    router.push('/auth/login');
    return null;
  }

  return (
    <>
    <CardSection />
    </>
  );
}