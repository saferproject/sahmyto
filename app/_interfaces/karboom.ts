import karboomTypes from "../_types/karboom-types";
import Plate from "./plate";
import User from "./user";

export default interface Karboom {
  id: number;
  name: string;
  smart_number: number;
  description: string | null;
  image: string | null;
  expense: number;
  income: number;
  plate: Plate;
  type: karboomTypes;
  owner: User;
}
