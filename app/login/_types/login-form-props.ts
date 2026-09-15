import { LoginFormType } from "../_schemas/login-schema";

type LoginFormProps = {
  onSubmit: (data: LoginFormType) => void;
};

export default LoginFormProps;
