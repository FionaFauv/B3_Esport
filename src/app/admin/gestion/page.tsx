'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/AuthStore';

interface User {
  id: string;
  email: string;
  name: string;
  admin: boolean;
  SuperAdmin: boolean;
  verified: boolean;
  created: string;
  updated: string;
}

export default function GestionUsersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!isAuthenticated || !user?.SuperAdmin) {
      router.push('/admin');
    }
  }, [isAuthenticated, user?.SuperAdmin, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const records = await pb.collection('users').getFullList<User>({
          sort: '-created',
        });
        setUsers(records);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.SuperAdmin) {
      fetchUsers();
    }
  }, [isAuthenticated, user?.SuperAdmin]);



  if (!isAuthenticated || !user?.SuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#d87943' }}></div>
          <p style={{ color: 'var(--foreground)' }}>Vérification...</p>
        </div>
      </div>
    );
  }

  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.admin);
  const superAdminUsers = users.filter(u => u.SuperAdmin);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Gestion des Utilisateurs
          </h2>
          <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
            {loading ? 'Chargement...' : `${totalUsers} utilisateur${totalUsers > 1 ? 's' : ''} enregistré${totalUsers > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Total Users */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(216, 121, 67, 0.05)',
                 border: '1px solid rgba(216, 121, 67, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Total Utilisateurs</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {loading ? '...' : totalUsers}
              </p>
            </div>
          </div>

          {/* Card Admins */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(34, 197, 94, 0.05)',
                 border: '1px solid rgba(34, 197, 94, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#22c55e' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Administrateurs</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {loading ? '...' : adminUsers.length}
              </p>
            </div>
          </div>

          {/* Card Super Admins */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(239, 68, 68, 0.05)',
                 border: '1px solid rgba(239, 68, 68, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ef4444' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Super Admins</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {loading ? '...' : superAdminUsers.length}
              </p>
            </div>
          </div>
        </div>


        {/* Liste des Admins */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(34, 197, 94, 0.05)' }}>
            <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#22c55e' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Liste des Administrateurs
            </h3>
          </div>

          <div className="p-6">
            {adminUsers.length === 0 ? (
              <p className="text-center py-8" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                Aucun administrateur
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminUsers.map((admin) => (
                  <div 
                    key={admin.id}
                    className="card-hover rounded-xl p-4 transition-all"
                    style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                           style={{ background: admin.SuperAdmin ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)' }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                             style={{ color: admin.SuperAdmin ? '#ef4444' : '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: 'var(--foreground)' }}>{admin.email}</p>
                        <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                          {admin.SuperAdmin ? 'Super Admin' : 'Admin'}
                        </p>
                      </div>
                      {admin.SuperAdmin && (
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                          ★
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
