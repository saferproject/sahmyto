import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { UIEvent } from "react";

import InsuranceCompanyInputProps from "../_interfaces/insurance-company-input-props";
import useGetInsuranceCompaniesEndpoint from "../_hooks/use-get-insurance-companies-endpoint";
import loadNextPageOnScroll from "../_utilities/load-next-page-on-scroll";

export default function InsuranceCompanyInput({
  control,
  enableGettingData,
  error,
  helperText,
}: InsuranceCompanyInputProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetInsuranceCompaniesEndpoint(enableGettingData);

  return (
    <Controller
      control={control}
      name="insurance_company_id"
      render={({ field }) => (
        <FormControl error={error} fullWidth>
          <InputLabel id="insurance-company-id-label">شرکت بیمه</InputLabel>
          <Select
            {...field}
            labelId="insurance-company-id-label"
            id="insurance-company-id"
            label="شرکت بیمه"
            MenuProps={{
              slotProps: {
                paper: {
                  onScroll: (event: UIEvent<HTMLElement>) =>
                    loadNextPageOnScroll(event.currentTarget, {
                      hasNextPage,
                      isFetchingNextPage,
                      fetchNextPage,
                    }),
                },
              },
            }}
          >
            <MenuItem value={0} disabled>
              انتخاب کنید
            </MenuItem>
            {data?.data?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
