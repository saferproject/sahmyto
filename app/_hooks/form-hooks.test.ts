import { beforeEach, describe, expect, it, vi } from "vitest";

const useZodFormMock = vi.hoisted(() => vi.fn(() => ({ source: "zod" })));
const useFormMock = vi.hoisted(() =>
  vi.fn(() => ({ source: "react-hook-form" })),
);
const resolver = vi.hoisted(() => Symbol("resolver"));
const zodResolverMock = vi.hoisted(() => vi.fn(() => resolver));

vi.mock("@/app/_hooks/use-zod-form", () => ({ default: useZodFormMock }));
vi.mock("react-hook-form", () => ({ useForm: useFormMock }));
vi.mock("@hookform/resolvers/zod", () => ({ zodResolver: zodResolverMock }));

import useLoginForm from "@/app/login/_hooks/use-login-form";
import LoginFormSchema from "@/app/login/_schemas/login-schema";
import useVerifyForm from "@/app/login/verify/_hooks/use-verify-form";
import VerifyFormSchema from "@/app/login/verify/_schemas/verify-schema";
import useProfileForm from "@/app/dashboard/profile/_hooks/use-profile-form";
import ProfileFormSchema from "@/app/dashboard/profile/_schemas/profile-schema";
import { PROFILE_FORM_DEFAULTS } from "@/app/dashboard/profile/_constants/profile-form-defaults";
import useActivityForm from "@/app/dashboard/karbooms/activities-list/_hooks/use-activity-form";
import ActivityFormSchema from "@/app/dashboard/karbooms/activities-list/_schemas/activity-form-schema";
import useDriverTipForm from "@/app/dashboard/karbooms/financial-management/drivers-salary/_hooks/use-driver-tip-form";
import DriverTipFormSchema from "@/app/dashboard/karbooms/financial-management/drivers-salary/_schemas/driver-tip-form-schema";
import { DRIVER_TIP_FORM_DEFAULTS } from "@/app/dashboard/karbooms/financial-management/drivers-salary/_constants/driver-tip-form-defaults";
import useDriverForm from "@/app/dashboard/karbooms/_hooks/use-driver-form";
import DriverFormSchema from "@/app/dashboard/karbooms/_schemas/driver-form-schema";
import useExpenseForm from "@/app/dashboard/karbooms/_hooks/use-expense-form";
import ExpenseFormSchema from "@/app/dashboard/karbooms/_schemas/expense-form-schema";
import { EXPENSE_FORM_INITIAL } from "@/app/dashboard/karbooms/_constants/expense-form-initial";
import useIncomeForm from "@/app/dashboard/karbooms/_hooks/use-income-form";
import IncomeFormSchema from "@/app/dashboard/karbooms/_schemas/income-form-schema";
import { INCOME_FORM_INITIAL } from "@/app/dashboard/karbooms/_constants/income-form-initial";
import useKarboomForm from "@/app/dashboard/karbooms/_hooks/use-karboom-form";
import KarboomFormSchema from "@/app/dashboard/karbooms/_schemas/karboom-form-schema";
import { KARBOOM_FORM_INITIAL } from "@/app/dashboard/karbooms/_constants/karboom-form-initial";
import usePartnerForm from "@/app/dashboard/karbooms/_hooks/use-partner-form";
import PartnerFormSchema from "@/app/dashboard/karbooms/_schemas/partner-form-schema";
import usePaymentForm from "@/app/dashboard/karbooms/_hooks/use-payment-form";
import PaymentFormSchema from "@/app/dashboard/karbooms/_schemas/payment-form-schema";
import { PAYMENT_FORM_INITIAL } from "@/app/dashboard/karbooms/_constants/payment-form-initial";
import useRejectForm from "@/app/dashboard/karbooms/_hooks/use-reject-form";
import RejectFormSchema from "@/app/dashboard/karbooms/_schemas/reject-form-schema";
import { REJECT_FORM_INITIAL } from "@/app/dashboard/karbooms/_constants/reject-form-initial";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("form hook configuration", () => {
  it("connects login validation", () => {
    useLoginForm();

    expect(useZodFormMock).toHaveBeenCalledWith({ schema: LoginFormSchema });
  });

  it("connects verification-code validation", () => {
    useVerifyForm();

    expect(useZodFormMock).toHaveBeenCalledWith({ schema: VerifyFormSchema });
  });

  it("connects activity validation with a fresh initial date", () => {
    useActivityForm();

    expect(useZodFormMock).toHaveBeenCalledWith({
      schema: ActivityFormSchema,
      defaultValues: expect.objectContaining({ description: "" }),
    });
  });

  it("connects driver validation with fresh defaults", () => {
    useDriverForm();

    expect(useZodFormMock).toHaveBeenCalledWith({
      schema: DriverFormSchema,
      defaultValues: expect.objectContaining({
        phone: "",
        payment_type: "monthly",
      }),
    });
  });

  it("connects partner validation and submit-time revalidation", () => {
    usePartnerForm();

    expect(useZodFormMock).toHaveBeenCalledWith({
      schema: PartnerFormSchema,
      defaultValues: expect.objectContaining({ phone: "", share_capital: 1 }),
      reValidateMode: "onSubmit",
    });
  });

  it.each([
    [useExpenseForm, ExpenseFormSchema, EXPENSE_FORM_INITIAL],
    [useIncomeForm, IncomeFormSchema, INCOME_FORM_INITIAL],
    [usePaymentForm, PaymentFormSchema, PAYMENT_FORM_INITIAL],
    [useRejectForm, RejectFormSchema, REJECT_FORM_INITIAL],
    [useDriverTipForm, DriverTipFormSchema, DRIVER_TIP_FORM_DEFAULTS],
  ] as const)(
    "connects a schema and stable defaults for %s",
    (useHook, schema, defaultValues) => {
      useHook();

      expect(useZodFormMock).toHaveBeenCalledWith({ schema, defaultValues });
    },
  );

  it("connects karboom validation and submit-time revalidation", () => {
    useKarboomForm();

    expect(useZodFormMock).toHaveBeenCalledWith({
      schema: KarboomFormSchema,
      defaultValues: KARBOOM_FORM_INITIAL,
      reValidateMode: "onSubmit",
    });
  });

  it("preserves dirty profile values when refreshed data arrives", () => {
    const values = {
      ...PROFILE_FORM_DEFAULTS,
      phone: "09123456789",
      first_name: "Ali",
    };

    useProfileForm(values);

    expect(zodResolverMock).toHaveBeenCalledWith(ProfileFormSchema);
    expect(useFormMock).toHaveBeenCalledWith({
      resolver,
      defaultValues: PROFILE_FORM_DEFAULTS,
      values,
      resetOptions: { keepDirtyValues: true },
    });
  });
});
