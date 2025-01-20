import { create } from 'zustand';

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

export const useZustandStore = create<ZustandStore>((set) => ({
  user: null,
  token: null,
  isSignedIn: false,
  detailsFilled: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  setDetailsFilled: (detailsFilled) => set({ detailsFilled }),
}));