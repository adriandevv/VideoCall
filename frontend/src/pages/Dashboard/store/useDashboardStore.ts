import { create } from 'zustand';

interface DashboardState {
    isIncomingCallVisible: boolean;
    activeMeetingCode: string;
    setIncomingCallVisible: (visible: boolean) => void;
    setActiveMeetingCode: (code: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    isIncomingCallVisible: true,
    activeMeetingCode: '',
    setIncomingCallVisible: (visible) => set({ isIncomingCallVisible: visible }),
    setActiveMeetingCode: (code) => set({ activeMeetingCode: code }),
}));
