import InsuranceFormComponent from "../../_components/insurance-form-component";

import { BodyInsuranceDrawerFormProps } from "../_types/body-insurance-drawer-form-props";

import useAddBodyInsuranceEndpoint from "../_hooks/use-add-body-insurance-endpoint";

export default function BodyInsuranceFormComponent({
  isOpen,
  onSuccess,
}: BodyInsuranceDrawerFormProps) {
  const { mutate, isPending } = useAddBodyInsuranceEndpoint();

  return (
    <InsuranceFormComponent
      isOpen={isOpen}
      onSuccess={onSuccess}
      karboomIdKey="karboomId"
      mutation={{
        mutate: mutate as (
          body: Record<string, unknown>,
          options?: { onSuccess: () => void },
        ) => void,
        isPending,
      }}
    />
  );
}
