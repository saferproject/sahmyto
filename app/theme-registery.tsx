"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { prefixer } from "stylis";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { faIR as datePickerFaIR } from "@mui/x-date-pickers/locales";

import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");
dayjs.locale("fa");

import { theme } from "./theme";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="fa"
          localeText={{
            ...datePickerFaIR.components.MuiLocalizationProvider.defaultProps
              .localeText,
            okButtonLabel: "تایید",
            cancelButtonLabel: "انصراف",
          }}
        >
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
