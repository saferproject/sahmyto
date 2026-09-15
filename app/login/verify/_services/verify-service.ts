import VerifyData from "../_types/verify-data";
import VerifyBody from "../_types/verify-body";

import { http } from "@/app/_services/http";

export const verifyService = {
  verify: (body: VerifyBody) => http.post<VerifyData>("user/verify", { body }),
};
