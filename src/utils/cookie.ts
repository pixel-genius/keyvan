import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("auth-token", token, {
    expires: 7,
  });
};

export const removeToken = () => {
  Cookies.remove("auth-token");
};

export const getToken = () => Cookies.get("auth-token");
