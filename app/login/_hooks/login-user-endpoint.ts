import { useMutation } from "@tanstack/react-query";
import { loginService } from "../_services/login-service";

export default function useLoginUser() {
  return useMutation({
    mutationFn: loginService.loginUser,
  });
}
