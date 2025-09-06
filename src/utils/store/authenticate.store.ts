import { create } from "zustand";

enum AuthenticateFormStateEnum {
  REGISTER_STEP1 = "REGISTER_STEP1",
  REGISTER_STEP2 = "REGISTER_STEP2",
  LOGIN = "LOGIN",
  OTP = "OTP",
}

type KeyOFAuthenticateFormState = keyof typeof AuthenticateFormStateEnum;

type AuthStoreVariables = {
  authenticateFormState: KeyOFAuthenticateFormState;
};

type AuthStoreFns = {
  setAuthStore: (str: KeyOFAuthenticateFormState) => void;
};

type AuthStore = AuthStoreVariables & AuthStoreFns;

const useAuthStore = create<AuthStore>((set) => ({
  authenticateFormState: AuthenticateFormStateEnum.LOGIN,
  setAuthStore: (arg: KeyOFAuthenticateFormState) =>
    set(() => ({ authenticateFormState: arg })),
}));

export type { KeyOFAuthenticateFormState };
export { useAuthStore, AuthenticateFormStateEnum };
