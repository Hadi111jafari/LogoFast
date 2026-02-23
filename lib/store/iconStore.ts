import { create } from 'zustand';
import { DEFAULT_LOGO_ICON_ID } from '@/lib/logo-icons';

interface IconState {
  selectedIconId: string;
  size: number;
  rotate: number;
  borderWidth: number;
  borderColor: string;
  fillOpacity: number;
  color: string;
}

interface IconActions {
  setSelectedIconId: (id: string) => void;
  setSize: (size: number) => void;
  setRotate: (rotate: number) => void;
  setBorderWidth: (width: number) => void;
  setBorderColor: (color: string) => void;
  setFillOpacity: (opacity: number) => void;
  setColor: (color: string) => void;
}

type IconStore = IconState & IconActions;

const useIconStore = create<IconStore>((set) => ({
  selectedIconId: DEFAULT_LOGO_ICON_ID,
  size: 200,
  rotate: 0,
  borderWidth: 0,
  borderColor: '#000000',
  fillOpacity: 100,
  color: '#000000',

  setSelectedIconId: (id) => set({ selectedIconId: id }),
  setSize: (size) => set({ size }),
  setRotate: (rotate) => set({ rotate }),
  setBorderWidth: (width) => set({ borderWidth: width }),
  setBorderColor: (color) => set({ borderColor: color }),
  setFillOpacity: (opacity) => set({ fillOpacity: opacity }),
  setColor: (color) => set({ color }),
}));

export default useIconStore;
