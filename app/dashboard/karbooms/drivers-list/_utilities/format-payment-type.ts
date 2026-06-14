import { DriverPaymentTypes } from "../_types/driver-payment-types";

export default function formatPaymentType(type: DriverPaymentTypes) {
  switch (type) {
    case "monthly":
      return "ماهانه";

    case "daily":
      return "روزانه";
  }
}
