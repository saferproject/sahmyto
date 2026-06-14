import { Genders } from "../_types/genders";

export default interface User {
  avatar: string | null;
  bio: string | null;
  email: string | null;
  father_name: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  gender: Genders | null;
  id: number;
  is_complete_profile: boolean;
  phone: string;
  status: "active" | "inactive";
  created_at?: string;
  last_login?: string;
  updated_at?: string;
  validated_at?: string;
}
