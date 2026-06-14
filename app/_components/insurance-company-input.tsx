import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import InsuranceCompanyInputProps from "../_interfaces/insurance-company-input-props";
import useGetInsuranceCompaniesEndpoint from "../_hooks/use-get-insurance-companies-endpoint";

export default function InsuranceCompanyInput({
  control,
}: InsuranceCompanyInputProps) {
  const { data } = useGetInsuranceCompaniesEndpoint();

  return (
    <Controller
      control={control}
      name="insurance_company_id"
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="insurance-company-id-label">شرکت بیمه</InputLabel>
          <Select
            {...field}
            labelId="insurance-company-id-label"
            id="insurance-company-id"
            label="شرکت بیمه"
          >
            <MenuItem value={undefined}></MenuItem>
            {data?.data?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
