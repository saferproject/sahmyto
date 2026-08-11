import AddPartnerEndpointBody from "./add-partner-endpoint-body";

type EditPartnerEndpointBody = Omit<AddPartnerEndpointBody, "karboom_id"> & {
  partner_id: number;
};

export default EditPartnerEndpointBody;
