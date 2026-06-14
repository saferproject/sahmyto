import User from "../_interfaces/user";

type UserInfoActions = {
  setPhone: (phone: string) => void;
  setUser: (user: User) => void;
};

export default UserInfoActions;
