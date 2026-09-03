import VerifyData from "../_interfaces/verify-data";
import VerifyBody from "../_interfaces/verify-body";

import { http } from "@/app/_services/http";

export const verifyService = {
  verify: (body: VerifyBody) => http.post<VerifyData>("user/verify", { body }),
};
