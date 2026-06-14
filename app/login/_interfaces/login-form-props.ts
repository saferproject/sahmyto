import { LoginFormType } from "../_schemas/login-schema";

export default interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void;
}
