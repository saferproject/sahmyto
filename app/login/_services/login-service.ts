import { LoginFormType } from "../_schemas/login-schema";
import LoginData from "../_types/login-data";
import { http } from "@/app/_services/http";

export const loginService = {
  loginUser: (body: LoginFormType) =>
    http.post<LoginData>("user/login", { body }),
};
