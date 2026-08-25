import InsuranceFormComponent from "../../_components/insurance-form-component";

import { ThirdPartyInsuranceFormProps } from "../_types/third-party-insurance-form-props";

import useAddThirdPartyInsuranceEndpoint from "../_hooks/use-add-third-party-insurance-endpoint";

export default function ThirdPartyInsuranceFormComponent({
  isOpen,
  onSuccess,
}: ThirdPartyInsuranceFormProps) {
  const { mutate, isPending } = useAddThirdPartyInsuranceEndpoint();

  return (
    <InsuranceFormComponent
      isOpen={isOpen}
      onSuccess={onSuccess}
      karboomIdKey="karboom_id"
      mutation={{
        mutate: mutate as (
          body: Record<string, unknown>,
          options?: {
            onSuccess: () => void;
            onError: (error: Error) => void;
          },
        ) => void,
        isPending,
      }}
    />
  );
}
