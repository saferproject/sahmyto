import karboomTypes from "../_types/karboom-types";
import Plate from "./plate";

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
}
