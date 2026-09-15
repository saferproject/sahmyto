import { KarboomRoles } from "../_types/karboom-roles";
import karboomTypes from "../_types/karboom-types";
import Plate from "./plate";
import User from "./user";

type Karboom = {
  id: number;
  name: string;
  smart_number: number | null;
  description: string | null;
  image: string | null;
  expense: number;
  income: number;
  plate: Plate;
  type: karboomTypes;
  owner: User;
  roles: Array<KarboomRoles>;
};

export default Karboom;
