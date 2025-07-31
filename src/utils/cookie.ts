import Cookies from "js-cookie";

const tokenName = process?.env?.NEXT_PUBLIC_APP_NAME_COOKIE || "";
export const setToken = (token: string) => {
  Cookies.set(tokenName, token, {
    expires: 1,
  });
};

export const removeToken = () => {
  Cookies.remove(tokenName);
};

export const getToken = () => Cookies.get(tokenName);
