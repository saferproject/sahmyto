import VerifyData from "../_interfaces/verify-data";
import VerifyBody from "../_interfaces/verify-body";

import { fetchWithAuth } from "@/app/proxy";

export const verifyService = {
  verify: (body: VerifyBody) =>
    fetchWithAuth<VerifyData>("user/verify", {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
