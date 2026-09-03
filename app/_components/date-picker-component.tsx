"use client";

import dynamic from "next/dynamic";

// The MUI date pickers (plus jalaliday/dayjs locale data) are one of the
// heaviest chunks in the bundle; only a few forms need them, so load on demand.
const DatePickerComponent = dynamic(
  () => import("./date-picker-impl-component"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-secondary-lightest h-14 w-full animate-pulse rounded-lg" />
    ),
  },
);

export default DatePickerComponent;
