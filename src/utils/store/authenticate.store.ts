import { AccountProfileGetApiResponse } from "../apis/account/profile/GET/accountProfileGetApi";
import { create } from "zustand";

enum AuthenticateFormStateEnum {
  REGISTER_STEP1 = "REGISTER_STEP1",
  REGISTER_STEP2 = "REGISTER_STEP2",
  LOGIN = "LOGIN",
  OTP = "OTP",
}

type KeyOFAuthenticateFormState = keyof typeof AuthenticateFormStateEnum;
interface UserInfoProfile {
  userProfileInfo?: AccountProfileGetApiResponse;
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

export { AuthenticateFormStateEnum, useAuthStore };
export type { KeyOFAuthenticateFormState };
