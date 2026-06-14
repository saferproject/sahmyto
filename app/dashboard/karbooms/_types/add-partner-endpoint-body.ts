import { PartnerFormType } from "../_schemas/partner-form-schema";

type AddPartnerEndpointBody = Omit<
  PartnerFormType,
  "share_capital" | "share_decimal" | "started_at" | "ended_at"
> & { started_at: string; ended_at: string; karboom_id: number; share: number };

export default AddPartnerEndpointBody;
