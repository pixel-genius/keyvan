import { create } from "zustand";

type AuthStoreVariables = {
  phoneNumber: string | null;
  nationalCode: string | null;
};

type AuthStoreFns = {
  setAuthStore: (str: Partial<AuthStoreVariables>) => void;
};

type AuthStore = AuthStoreVariables & AuthStoreFns;

const useAuthStore = create<AuthStore>((set) => ({
  phoneNumber: null,
  nationalCode: null,
  setAuthStore: (arg) => set((state) => ({ ...state, ...arg })),
}));

export { useAuthStore };
