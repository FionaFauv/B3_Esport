import FormSection from '@/components/auth/FormSection';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte Paris Esportif.',
}
export default function LoginPage() {
  return (
    <FormSection />
  );
}
