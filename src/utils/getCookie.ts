import { Cookies } from "react-cookie";

export const getCookie = (name: string): string | undefined => {
  const cookies = new Cookies();
  return cookies.get(name);
};


export const removeCookie = (name: string): void => {
  const cookies = new Cookies();
  cookies.remove(name);
};
