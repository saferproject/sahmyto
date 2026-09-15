import User from "../_types/user";

type UserInfoActions = {
  setPhone: (phone: string) => void;
  setUser: (user: User) => void;
};

export default UserInfoActions;
