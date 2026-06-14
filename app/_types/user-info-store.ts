import User from "../_interfaces/user";
import UserInfoActions from "./user-info-actions";

type UserInfoStore = User & UserInfoActions;

export default UserInfoStore;