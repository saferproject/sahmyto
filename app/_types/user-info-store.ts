import User from "../_types/user";
import UserInfoActions from "./user-info-actions";

type UserInfoStore = User & UserInfoActions;

export default UserInfoStore;
