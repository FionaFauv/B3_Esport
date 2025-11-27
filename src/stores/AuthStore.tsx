import { create } from 'zustand';
import { pb } from '@/lib/pocketbase';
import type { RecordModel } from 'pocketbase';

interface User extends RecordModel {
  email: string;
  admin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

// Initialize auth state from PocketBase
const initializeAuth = () => {
  try {
    if (pb.authStore.isValid) {
      const authData = pb.authStore.record;
      const authToken = pb.authStore.token;
      
      if (authData && authToken) {
        return {
          user: authData as unknown as User,
          token: authToken,
          isAuthenticated: true,
          isLoading: false,
        };
      }
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
    pb.authStore.clear();
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

export const useAuthStore = create<AuthState>((set) => {
  // Set up listener for PocketBase auth changes
  pb.authStore.onChange((token, record) => {
    if (token && record) {
      set({
        user: record as unknown as User,
        token,
        isAuthenticated: true,
      });
    } else {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  });

  return {
    ...initializeAuth(),
    
    initialize: () => {
      set(initializeAuth());
    },
    
    login: async (email: string, password: string) => {
      const authData = await pb.collection('users').authWithPassword(email, password);
      const authToken = pb.authStore.token;
      
      if (authToken && authData.record) {
        set({
          user: authData.record as unknown as User,
          token: authToken,
          isAuthenticated: true,
        });
      }
    },
    
    logout: () => {
      pb.authStore.clear();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },
  };
});