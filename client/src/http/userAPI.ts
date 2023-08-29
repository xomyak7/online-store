import { IUser } from "../types/user.types";
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  email: string,
  password: string
): Promise<IUser> => {
  const { data } =
    email === "admin@mail.ru" && password === "12345"
      ? await $host.post("api/user/registration", {
          email,
          password,
          role: "ADMIN",
        })
      : await $host.post("api/user/registration", {
          email,
          password,
          role: "USER",
        });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (
  email: string,
  password: string
): Promise<IUser> => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async (): Promise<IUser> => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
