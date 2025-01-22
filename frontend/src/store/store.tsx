import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the User interface based on your backend's user model
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  // Add any additional fields from your User model
}

// Define the shape of your Zustand store
interface ZustandStore {
  user: User | null;
  token: string | null;
  isSignedIn: boolean;
  detailsFilled: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setDetailsFilled: (detailsFilled: boolean) => void;
}

export const useZustandStore = create<ZustandStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isSignedIn: false,
      detailsFilled: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      setDetailsFilled: (detailsFilled) => set({ detailsFilled }),
    }),
    {
      name: 'zustand-store', // unique name for the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // You can customize which parts of the state to persist
      // partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);