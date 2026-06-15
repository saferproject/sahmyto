"use client";

import { TextField } from "@mui/material";
import { SearchNormal1 } from "iconsax-reactjs";

export default function SearchInputComponent() {
  return (
    <TextField
      type="search"
      variant="outlined"
      size="small"
      color="secondary"
      placeholder="جستجو کنید"
      slotProps={{
        input: {
          startAdornment: (
            <SearchNormal1 variant="Broken" className="text-primary ml-2" />
          ),
        },
      }}
      fullWidth
    />
  );
}
