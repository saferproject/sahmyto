import { LoginFormType } from "../_schemas/login-schema";
import LoginData from "../_interfaces/login-data";
import { fetchWithAuth } from "@/app/proxy";

export const loginService = {
  loginUser: (body: LoginFormType) =>
    fetchWithAuth<LoginData>("user/login", {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
