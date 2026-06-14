"use client";

import { TextField } from "@mui/material";
import { Magnifer } from "@solar-icons/react";

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
            <Magnifer weight="Broken" className="text-primary ml-2" />
          ),
        },
      }}
      fullWidth
    />
  );
}
