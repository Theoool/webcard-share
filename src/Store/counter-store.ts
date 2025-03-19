import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 定义设置存储的状态接口
interface SettingsState {
  model: string;
  apikey: string;
  BaseURl: string;
}

// 定义设置存储的操作接口
interface SettingsActions {
  setModel: (model: string) => void;
  setApikey: (apikey: string) => void;
  setBaseURl: (BaseURl: string) => void;
  resetSettings: () => void;
}

// 组合完整的存储接口
type SettingsStore = SettingsState & SettingsActions;

const useSettingsModleStore = create<SettingsStore>()(
  persist(
    (set) => ({
      model: '',
      apikey: '',
      BaseURl: '',
      setModel: (model: string) => set({ model }),
      setApikey: (apikey: string) => set({ apikey }),
      setBaseURl: (BaseURl: string) => set({ BaseURl }),
      resetSettings: () => set({ model: '', apikey: '', BaseURl: '' }),
    }),
    {
      name: 'app-settings', // 存储在 localStorage 中的 key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSettingsModleStore;
