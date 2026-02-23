import { create } from 'zustand';

interface IconBackgroundState {
  rounded: number;
  padding: number;
  shadow: number;
  bgColor: string;
}

interface IconBackgroundActions {
  setRounded: (rounded: number) => void;
  setPadding: (padding: number) => void;
  setShadow: (shadow: number) => void;
  setBgColor: (color: string) => void;
}

type IconBackgroundStore = IconBackgroundState & IconBackgroundActions;

const useIconBackgroundStore = create<IconBackgroundStore>((set) => ({
  rounded: 50,
  padding: 10,
  shadow: 1,
  bgColor: '#000000',

  setRounded: (rounded) => set({ rounded }),
  setPadding: (padding) => set({ padding }),
  setShadow: (shadow) => set({ shadow }),
  setBgColor: (color) => set({ bgColor: color }),
}));

export default useIconBackgroundStore;