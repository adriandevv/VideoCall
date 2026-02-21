import { create } from 'zustand';
import api from '../lib/api';

interface User {
    id: number;
    username: string;
    email: string;
    avatar: string | null;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    updateProfile: (userData: any) => Promise<void>;
    updateAvatar: (avatarBase64: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    },

    register: async (userData) => {
        await api.post('/auth/register', userData);
    },

    logout: async () => {
        await api.post('/auth/logout');
        set({ user: null, isAuthenticated: false });
    },

    checkAuth: async () => {
        try {
            set({ isLoading: true });
            const response = await api.get('/auth/me');
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    updateProfile: async (userData) => {
        await api.put('/users/me', userData);
        set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null
        }));
    },

    updateAvatar: async (avatarBase64) => {
        await api.post('/users/me/avatar', { avatar: avatarBase64 });
        set((state) => ({
            user: state.user ? { ...state.user, avatar: avatarBase64 } : null
        }));
    },
}));
