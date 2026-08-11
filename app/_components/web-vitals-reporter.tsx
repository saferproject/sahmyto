"use client";

import { useReportWebVitals } from "next/web-vitals";

import { reportWebVital } from "../_utilities/telemetry";

export default function WebVitalsReporter() {
  useReportWebVitals(reportWebVital);

  return null;
}
