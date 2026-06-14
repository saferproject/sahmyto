import User from "@/app/_interfaces/user";

export default interface VerifyData {
  token: string;
  user: User;
}