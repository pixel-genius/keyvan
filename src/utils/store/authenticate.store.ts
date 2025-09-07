import { create } from "zustand";

enum AuthenticateFormStateEnum {
  REGISTER_STEP1 = "REGISTER_STEP1",
  REGISTER_STEP2 = "REGISTER_STEP2",
  LOGIN = "LOGIN",
  OTP = "OTP",
}

type KeyOFAuthenticateFormState = keyof typeof AuthenticateFormStateEnum;
interface UserInfoProfile {
  userProfileInfo?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    date_of_birth?: string | null;
    address?: string;
    bio?: string;
    certificate?: {
      id: number;
      file: string;
      original_filename: string;
      size: number;
      created_at: string;
    };
    license?: {
      id: number;
      file: string;
      original_filename: string;
      size: number;
      created_at: string;
    };
  };
}
interface AuthStoreVariables {
  authenticateFormState: KeyOFAuthenticateFormState;
}

type AuthStoreFns = {
  setAuthStore: (str: KeyOFAuthenticateFormState) => void;
  setUserInfo: (data?: UserInfoProfile) => void;
};

type AuthStore = AuthStoreVariables & AuthStoreFns & UserInfoProfile;

const useAuthStore = create<AuthStore>((set) => ({
  authenticateFormState: AuthenticateFormStateEnum.LOGIN,
  userProfileInfo: {},
  setAuthStore: (arg: KeyOFAuthenticateFormState) =>
    set(() => ({ authenticateFormState: arg })),
  setUserInfo: (data?: UserInfoProfile) =>
    set((state) => ({ ...state, ...data })),
}));

export type { KeyOFAuthenticateFormState };
export { useAuthStore, AuthenticateFormStateEnum };
