import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import LoginFormSchema from "@/app/login/_schemas/login-schema";
import VerifyFormSchema from "@/app/login/verify/_schemas/verify-schema";
import ProfileFormSchema from "@/app/dashboard/profile/_schemas/profile-schema";
import ActivityFormSchema from "@/app/dashboard/karbooms/activities-list/_schemas/activity-form-schema";
import BodyInsuranceFormSchema from "@/app/dashboard/karbooms/body-insurance-list/_schemas/body-insurance-form-schema";
import ThirdPartyInsuranceFormSchema from "@/app/dashboard/karbooms/third-party-insurance-list/_schemas/third-party-insurance-form-schema";
import DriverTipFormSchema from "@/app/dashboard/karbooms/financial-management/drivers-salary/_schemas/driver-tip-form-schema";
import DriverFormSchema from "@/app/dashboard/karbooms/_schemas/driver-form-schema";
import ExpenseFormSchema from "@/app/dashboard/karbooms/_schemas/expense-form-schema";
import IncomeFormSchema from "@/app/dashboard/karbooms/_schemas/income-form-schema";
import InsuranceFormSchema from "@/app/dashboard/karbooms/_schemas/insurance-form-schema";
import KarboomFormSchema from "@/app/dashboard/karbooms/_schemas/karboom-form-schema";
import PartnerFormSchema from "@/app/dashboard/karbooms/_schemas/partner-form-schema";
import PaymentFormSchema from "@/app/dashboard/karbooms/_schemas/payment-form-schema";
import RejectFormSchema from "@/app/dashboard/karbooms/_schemas/reject-form-schema";
import PlateFormSchema from "@/app/_schemas/plate-form-schema";
import { USER_DEFAULTS } from "@/app/dashboard/_constants/user-defaults";

const member = {
  member: { id: 7 },
  user: { ...USER_DEFAULTS, id: 11, phone: "09123456789" },
};

describe("authentication form schemas", () => {
  it.each(["09123456789", "09999999999"])(
    "accepts valid Iranian mobile number %s",
    (phone) => {
      expect(LoginFormSchema.safeParse({ phone }).success).toBe(true);
    },
  );

  it.each(["", "9123456789", "08123456789", "0912345678a"])(
    "rejects invalid mobile number %s",
    (phone) => {
      expect(LoginFormSchema.safeParse({ phone }).success).toBe(false);
    },
  );

  it("requires exactly one character in every verification-code field", () => {
    expect(
      VerifyFormSchema.safeParse({
        firstDigit: "1",
        secondDigit: "2",
        thirdDigit: "3",
        fourthDigit: "4",
      }).success,
    ).toBe(true);
    expect(
      VerifyFormSchema.safeParse({
        firstDigit: "",
        secondDigit: "22",
        thirdDigit: "3",
        fourthDigit: "4",
      }).success,
    ).toBe(false);
  });
});

describe("profile and plate form schemas", () => {
  it("accepts a complete profile and rejects a malformed phone length", () => {
    const profile = {
      phone: "09123456789",
      first_name: "Ali",
      last_name: "Ahmadi",
      birthday: dayjs("1990-01-01"),
      father_name: null,
      gender: "male" as const,
      email: null,
    };

    expect(ProfileFormSchema.safeParse(profile).success).toBe(true);
    expect(
      ProfileFormSchema.safeParse({ ...profile, phone: "0912" }).success,
    ).toBe(false);
  });

  it("accepts either an empty plate or a fully populated valid plate", () => {
    expect(PlateFormSchema.safeParse({}).success).toBe(true);
    expect(
      PlateFormSchema.safeParse({
        first_number: "12",
        second_character: "ب",
        third_number: "345",
        fourth_number: "67",
      }).success,
    ).toBe(true);
  });

  it("rejects partial plates and unsupported plate characters", () => {
    expect(PlateFormSchema.safeParse({ first_number: "12" }).success).toBe(
      false,
    );
    expect(
      PlateFormSchema.safeParse({
        first_number: "12",
        second_character: "A",
        third_number: "345",
        fourth_number: "67",
      }).success,
    ).toBe(false);
  });
});

describe("karboom form schemas", () => {
  it("validates a karboom name, optional complete plate, and description limit", () => {
    const valid = {
      name: "My Karboom",
      first_number: "12",
      second_character: "ب",
      third_number: "345",
      fourth_number: "67",
      smart_number: "1234567",
      description: "A useful description",
    };

    expect(KarboomFormSchema.safeParse(valid).success).toBe(true);
    expect(KarboomFormSchema.safeParse({ ...valid, name: "   " }).success).toBe(
      false,
    );
    expect(
      KarboomFormSchema.safeParse({ ...valid, description: "x".repeat(201) })
        .success,
    ).toBe(false);
  });

  it("reports every missing part when a plate is only partially entered", () => {
    const result = KarboomFormSchema.safeParse({
      name: "Truck",
      first_number: "12",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
        expect.arrayContaining([
          "second_character",
          "third_number",
          "fourth_number",
        ]),
      );
    }
  });

  it("requires a non-blank rejection reason", () => {
    expect(
      RejectFormSchema.safeParse({ reject_reason: "Incorrect amount" }).success,
    ).toBe(true);
    expect(RejectFormSchema.safeParse({ reject_reason: "   " }).success).toBe(
      false,
    );
  });
});

describe("member form schemas", () => {
  const employment = {
    phone: "09123456789",
    first_name: "Ali",
    last_name: "Ahmadi",
    started_at: dayjs("2026-01-01"),
    ended_at: dayjs("2026-02-01"),
    description: null,
  };

  it("validates drivers, payment modes, percentage bounds, and date order", () => {
    const driver = {
      ...employment,
      payment_type: "monthly" as const,
      fixed_amount: "1000",
      service_amount: null,
      percentage_amount: 25,
    };

    expect(DriverFormSchema.safeParse(driver).success).toBe(true);
    expect(
      DriverFormSchema.safeParse({ ...driver, percentage_amount: 101 }).success,
    ).toBe(false);
    expect(
      DriverFormSchema.safeParse({
        ...driver,
        started_at: dayjs("2026-03-01"),
      }).success,
    ).toBe(false);
  });

  it("validates partner shares, phone format, description length, and dates", () => {
    const partner = {
      ...employment,
      share_capital: 2,
      share_decimal: 0.5,
    };

    expect(PartnerFormSchema.safeParse(partner).success).toBe(true);
    expect(
      PartnerFormSchema.safeParse({ ...partner, share_capital: -1 }).success,
    ).toBe(false);
    expect(
      PartnerFormSchema.safeParse({ ...partner, phone: "08123456789" }).success,
    ).toBe(false);
    expect(
      PartnerFormSchema.safeParse({
        ...partner,
        description: "x".repeat(201),
      }).success,
    ).toBe(false);
  });
});

describe("financial form schemas", () => {
  it("requires at least one expense amount and rejects future dates", () => {
    const expense = {
      payer: member,
      unit_price: "1000",
      wage_cost: null,
      date: dayjs().subtract(1, "day"),
      description: null,
      image: null,
    };

    expect(ExpenseFormSchema.safeParse(expense).success).toBe(true);
    expect(
      ExpenseFormSchema.safeParse({
        ...expense,
        unit_price: null,
        wage_cost: null,
      }).success,
    ).toBe(false);
    expect(
      ExpenseFormSchema.safeParse({
        ...expense,
        date: dayjs().add(1, "day"),
      }).success,
    ).toBe(false);
  });

  it("accepts supported receipt images and rejects other MIME types", () => {
    const expense = {
      payer: member,
      unit_price: "1000",
      wage_cost: null,
      date: dayjs(),
      description: null,
    };

    expect(
      ExpenseFormSchema.safeParse({
        ...expense,
        image: new File(["image"], "receipt.png", { type: "image/png" }),
      }).success,
    ).toBe(true);
    expect(
      ExpenseFormSchema.safeParse({
        ...expense,
        image: new File(["image"], "receipt.gif", { type: "image/gif" }),
      }).success,
    ).toBe(false);
  });

  it("validates income quantity, date order, and optional proof image", () => {
    const income = {
      reciever: member,
      quantity: 2,
      unit_price: "500",
      total_price: "1000",
      started_at: dayjs("2026-01-01"),
      ended_at: dayjs("2026-01-02"),
      description: null,
      image: new File(["image"], "proof.jpg", { type: "image/jpeg" }),
    };

    expect(IncomeFormSchema.safeParse(income).success).toBe(true);
    expect(IncomeFormSchema.safeParse({ ...income, quantity: 0 }).success).toBe(
      false,
    );
    expect(
      IncomeFormSchema.safeParse({
        ...income,
        started_at: dayjs("2026-01-03"),
      }).success,
    ).toBe(false);
  });

  it("validates payment type and prevents future payment dates", () => {
    const payment = {
      payer: member,
      reciever: member,
      total_price: "1000",
      date: dayjs().subtract(1, "day"),
      type: "cash" as const,
      description: null,
    };

    expect(PaymentFormSchema.safeParse(payment).success).toBe(true);
    expect(
      PaymentFormSchema.safeParse({ ...payment, type: "crypto" }).success,
    ).toBe(false);
    expect(
      PaymentFormSchema.safeParse({
        ...payment,
        date: dayjs().add(1, "day"),
      }).success,
    ).toBe(false);
  });
});

describe("insurance and activity form schemas", () => {
  const insurance = {
    insurance_company_id: 3,
    insurance_number: "INS-10",
    insurance_code: "UNIQUE-10",
    started_at: dayjs("2026-01-01"),
    ended_at: dayjs("2027-01-01"),
    description: null,
  };

  it("uses the shared insurance contract for body and third-party forms", () => {
    expect(InsuranceFormSchema.safeParse(insurance).success).toBe(true);
    expect(BodyInsuranceFormSchema).toBe(InsuranceFormSchema);
    expect(ThirdPartyInsuranceFormSchema).toBe(InsuranceFormSchema);
    expect(
      InsuranceFormSchema.safeParse({
        ...insurance,
        insurance_company_id: "3",
      }).success,
    ).toBe(false);
  });

  it("requires an activity description", () => {
    expect(
      ActivityFormSchema.safeParse({
        date: dayjs(),
        description: "Oil change",
      }).success,
    ).toBe(true);
    expect(
      ActivityFormSchema.safeParse({ date: dayjs(), description: "" }).success,
    ).toBe(false);
  });

  it("accepts nullable driver adjustment fields but rejects wrong types", () => {
    expect(
      DriverTipFormSchema.safeParse({ amount: null, description: null })
        .success,
    ).toBe(true);
    expect(
      DriverTipFormSchema.safeParse({ amount: 100, description: null }).success,
    ).toBe(false);
  });
});
