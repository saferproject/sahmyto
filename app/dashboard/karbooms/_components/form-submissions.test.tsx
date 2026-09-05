// @vitest-environment jsdom

import dayjs from "dayjs";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const formMocks = vi.hoisted(() => ({
  values: {} as Record<string, unknown>,
  register: vi.fn(() => ({})),
  control: {},
  handleSubmit: vi.fn(
    (submit: (values: Record<string, unknown>) => void) =>
      (event?: { preventDefault?: () => void }) => {
        event?.preventDefault?.();
        submit(formMocks.values);
      },
  ),
  setError: vi.fn(),
  setFocus: vi.fn(),
  setValue: vi.fn(),
  setValues: vi.fn(),
  reset: vi.fn(),
  watch: vi.fn(),
  formState: { errors: {} },
}));

const mutations = vi.hoisted(() => ({
  addActivity: vi.fn(),
  editActivity: vi.fn(),
  addDriver: vi.fn(),
  editDriver: vi.fn(),
  addPartner: vi.fn(),
  editPartner: vi.fn(),
  createKarboom: vi.fn(),
  addBonusPenalty: vi.fn(),
}));

const storeMocks = vi.hoisted(() => ({
  setActiveKarboom: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Autocomplete: "div",
  Button: "button",
  FormControl: "div",
  FormControlLabel: "label",
  FormLabel: "label",
  IconButton: "button",
  InputLabel: "label",
  MenuItem: "option",
  Radio: "input",
  RadioGroup: "div",
  Select: "select",
  TextField: "input",
}));
vi.mock("iconsax-reactjs", () => ({
  Add: "span",
  Book1: "span",
  InfoCircle: "span",
  Minus: "span",
}));
vi.mock("react-hook-form", () => ({
  Controller: ({ render }: { render: (props: unknown) => unknown }) =>
    render({ field: { value: "", onChange: vi.fn() } }),
  useWatch: vi.fn(() => ({})),
}));
vi.mock("@/app/_components/date-picker-component", () => ({
  default: "input",
}));
vi.mock("@/app/_components/description-input", () => ({ default: "textarea" }));
vi.mock("@/app/_components/form-drawer-component", () => ({ default: "div" }));
vi.mock("./contact-list-drawer-component", () => ({ default: () => null }));
vi.mock("../../contacts/_components/contact-drawer-component", () => ({
  default: () => null,
}));
vi.mock("../_hooks/use-contact-phone-lookup", () => ({
  default: () => vi.fn(),
}));
vi.mock("@/app/_components/insurance-company-input", () => ({
  default: "select",
}));
vi.mock("@/app/_components/plate-input", () => ({ default: "div" }));
vi.mock("@/app/_components/price-input-component", () => ({
  default: "input",
}));

vi.mock("../_hooks/use-karboom-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-driver-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-partner-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-payment-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-reject-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-expense-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-income-form", () => ({ default: () => formMocks }));
vi.mock("../../karbooms/activities-list/_hooks/use-activity-form", () => ({
  default: () => formMocks,
}));
vi.mock("@/app/_hooks/use-zod-form", () => ({ default: () => formMocks }));
vi.mock(
  "../financial-management/drivers-salary/_hooks/use-driver-tip-form",
  () => ({ default: () => formMocks }),
);

vi.mock("../_hooks/use-add-driver-endpoint", () => ({
  default: () => ({ mutate: mutations.addDriver, isPending: false }),
}));
vi.mock("../_hooks/use-edit-driver-endpoint", () => ({
  default: () => ({ mutate: mutations.editDriver, isPending: false }),
}));
vi.mock("../_hooks/use-add-partner-endpoint", () => ({
  default: () => ({ mutate: mutations.addPartner }),
}));
vi.mock("../_hooks/use-edit-partner-endpoint", () => ({
  default: () => ({ mutate: mutations.editPartner }),
}));
vi.mock("../_hooks/use-create-karboom-endpoint", () => ({
  default: () => ({ mutate: mutations.createKarboom, isPending: false }),
}));
vi.mock(
  "../../karbooms/activities-list/_hooks/use-add-activity-endpoint",
  () => ({
    default: () => ({ mutate: mutations.addActivity, isPending: false }),
  }),
);
vi.mock(
  "../../karbooms/activities-list/_hooks/use-edit-activity-endpoint",
  () => ({
    default: () => ({ mutate: mutations.editActivity, isPending: false }),
  }),
);
vi.mock(
  "../financial-management/drivers-salary/_hooks/use-add-bonus-penalty-driver-endpoint",
  () => ({
    default: () => ({ mutate: mutations.addBonusPenalty, isPending: false }),
  }),
);

vi.mock("../_providers/karbooms-store-provider", () => ({
  useKarboomsStore: (selector: (state: unknown) => unknown) =>
    selector({ id: 12, setActiveKarboom: storeMocks.setActiveKarboom }),
}));
vi.mock(
  "../financial-management/_providers/financial-managment-store-provider",
  () => ({
    useFinancialMonthStore: (selector: (state: unknown) => unknown) =>
      selector({ id: 41 }),
  }),
);

import ApiError from "@/app/_errors/api-error";
import ActivityFormComponent from "../../karbooms/activities-list/_components/activity-form-component";
import DriverFormComponent from "./driver-form-component";
import DriverTipFormComponent from "../financial-management/drivers-salary/_components/driver-tip-form-component";
import InsuranceFormComponent from "./insurance-form-component";
import KarboomFormComponent from "./karboom-form-component";
import PartnerFormComponent from "./partner-form-component";
import RejectDrawerComponent from "./reject-drawer-component";

function submitForm(container: HTMLElement) {
  const form = container.querySelector("form");
  if (!form) throw new Error("Expected component to render a form");
  fireEvent.submit(form);
}

beforeEach(() => {
  vi.clearAllMocks();
  formMocks.values = {};
});

afterEach(cleanup);

describe("activity form submission", () => {
  it("adds an activity to the selected karboom", () => {
    const date = dayjs("2026-01-02");
    formMocks.values = { date, description: "Oil change" };
    const onSuccess = vi.fn();
    const { container } = render(
      <ActivityFormComponent
        formState="ADD"
        onCancel={vi.fn()}
        onSuccess={onSuccess}
      />,
    );

    submitForm(container);

    expect(mutations.addActivity).toHaveBeenCalledWith(
      { date: "2026-01-02", description: "Oil change", karboomId: 12 },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
    mutations.addActivity.mock.calls[0][1].onSuccess();
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(formMocks.setValues).toHaveBeenCalled();
  });

  it("edits the selected activity and maps API field errors", () => {
    formMocks.values = { date: dayjs("2026-01-02"), description: "Service" };
    const { container } = render(
      <ActivityFormComponent
        formState="EDIT"
        activity={{ id: 61, date: "2026-01-01", description: "Old" }}
        onCancel={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);

    expect(mutations.editActivity).toHaveBeenCalledWith(
      expect.objectContaining({ activityId: 61, description: "Service" }),
      expect.any(Object),
    );
    mutations.editActivity.mock.calls[0][1].onError(
      new ApiError({
        status: 422,
        message: "Invalid",
        errors: { description: ["Description is invalid"] },
      }),
    );
    expect(formMocks.setError).toHaveBeenCalledWith("description", {
      message: "Description is invalid",
      type: "validate",
    });
  });
});

describe("driver form submission", () => {
  const driverValues = {
    phone: "09123456789",
    first_name: "Ali",
    last_name: "Ahmadi",
    started_at: dayjs("2026-01-02"),
    ended_at: dayjs("2026-02-03"),
    payment_type: "monthly",
    fixed_amount: "1,200",
    service_amount: "۳۰۰",
    percentage_amount: null,
    description: null,
  };

  it("converts driver amounts and dates before adding", () => {
    formMocks.values = driverValues;
    const { container } = render(
      <DriverFormComponent
        formState="ADD"
        onCancel={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);

    expect(mutations.addDriver).toHaveBeenCalledWith(
      {
        phone: "09123456789",
        first_name: "Ali",
        last_name: "Ahmadi",
        payment_type: "monthly",
        percentage_amount: null,
        description: null,
        fixed_amount: 1200,
        service_amount: 300,
        started_at: "2026-01-02",
        ended_at: "2026-02-03",
        karboom_id: 12,
      },
      expect.any(Object),
    );
  });

  it("uses the driver id and empty end date when editing", () => {
    formMocks.values = { ...driverValues, ended_at: null };
    const { container } = render(
      <DriverFormComponent
        formState="EDIT"
        driver={
          {
            id: 21,
            phone: "09123456789",
            first_name: "Ali",
            last_name: "Ahmadi",
            started_at: "2026-01-02",
            ended_at: null,
            payment_type: "monthly",
            fixed_amount: 1200,
            service_amount: 300,
            percentage_amount: null,
            description: null,
          } as never
        }
        onCancel={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);

    expect(mutations.editDriver).toHaveBeenCalledWith(
      expect.objectContaining({ driver_id: 21, ended_at: "" }),
      expect.any(Object),
    );
  });

  it("shows the first API validation message on its matching control", () => {
    formMocks.values = driverValues;
    const { container } = render(
      <DriverFormComponent
        formState="ADD"
        onCancel={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);
    mutations.addDriver.mock.calls[0][1].onError(
      new ApiError({
        status: 422,
        message: "Invalid input",
        errors: { fixed_amount: ["Fixed amount must be at least 1"] },
      }),
    );

    expect(formMocks.setError).toHaveBeenCalledWith("fixed_amount", {
      message: "Fixed amount must be at least 1",
      type: "validate",
    });
  });
});

describe("partner form submission", () => {
  const partnerValues = {
    phone: "09123456789",
    first_name: "Sara",
    last_name: "Ahmadi",
    share_capital: 2,
    share_decimal: 5,
    started_at: dayjs("2026-01-02"),
    ended_at: null,
    description: null,
  };

  it("combines share fields and formats dates when adding", () => {
    formMocks.values = partnerValues;
    const { container } = render(
      <PartnerFormComponent
        formState="ADD"
        onCancel={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);

    expect(mutations.addPartner).toHaveBeenCalledWith(
      {
        phone: "09123456789",
        first_name: "Sara",
        last_name: "Ahmadi",
        description: null,
        share: 2.5,
        started_at: "2026-01-02",
        ended_at: "",
        karboom_id: 12,
      },
      expect.any(Object),
    );
  });

  it("uses the partner id when editing", () => {
    formMocks.values = partnerValues;
    const { container } = render(
      <PartnerFormComponent
        formState="EDIT"
        partner={
          {
            id: 22,
            phone: "09123456789",
            first_name: "Sara",
            last_name: "Ahmadi",
            share: 2.5,
            started_at: "2026-01-02",
            ended_at: null,
            description: null,
          } as never
        }
        onCancel={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);

    expect(mutations.editPartner).toHaveBeenCalledWith(
      expect.objectContaining({ partner_id: 22, share: 2.5 }),
      expect.any(Object),
    );
  });
});

describe("karboom, insurance, and driver-adjustment submissions", () => {
  it("creates a karboom, selects the response, and resets after success", () => {
    formMocks.values = { name: "Fleet", description: "Main fleet" };
    const onSuccess = vi.fn();
    const { container } = render(
      <KarboomFormComponent onCancel={vi.fn()} onSuccess={onSuccess} />,
    );

    submitForm(container);

    expect(mutations.createKarboom).toHaveBeenCalledWith(
      formMocks.values,
      expect.any(Object),
    );
    const karboom = { id: 12, name: "Fleet" };
    mutations.createKarboom.mock.calls[0][1].onSuccess({ data: karboom });
    expect(storeMocks.setActiveKarboom).toHaveBeenCalledWith(karboom);
    expect(formMocks.setValues).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it.each(["karboomId", "karboom_id"] as const)(
    "formats insurance submission with %s",
    (karboomIdKey) => {
      formMocks.values = {
        insurance_company_id: 3,
        insurance_number: "INS-1",
        insurance_code: "CODE-1",
        started_at: dayjs("2026-01-02"),
        ended_at: dayjs("2027-01-02"),
        description: null,
      };
      const mutate = vi.fn();
      const onSuccess = vi.fn();
      const { container } = render(
        <InsuranceFormComponent
          isOpen
          onSuccess={onSuccess}
          karboomIdKey={karboomIdKey}
          mutation={{ mutate, isPending: false }}
        />,
      );

      submitForm(container);

      expect(mutate).toHaveBeenCalledWith(
        {
          insurance_company_id: 3,
          insurance_number: "INS-1",
          insurance_code: "CODE-1",
          description: null,
          [karboomIdKey]: 12,
          started_at: "2026-01-02",
          ended_at: "2027-01-02",
        },
        expect.any(Object),
      );
      mutate.mock.calls[0][1].onSuccess();
      expect(onSuccess).toHaveBeenCalledOnce();
      expect(formMocks.reset).toHaveBeenCalled();
    },
  );

  it("shows insurance API validation messages on matching controls", () => {
    formMocks.values = {
      insurance_company_id: 3,
      insurance_number: "INS-1",
      insurance_code: "CODE-1",
      started_at: dayjs("2026-01-02"),
      ended_at: dayjs("2027-01-02"),
      description: null,
    };
    const mutate = vi.fn();
    const { container } = render(
      <InsuranceFormComponent
        isOpen
        onSuccess={vi.fn()}
        karboomIdKey="karboom_id"
        mutation={{ mutate, isPending: false }}
      />,
    );

    submitForm(container);
    mutate.mock.calls[0][1].onError(
      new ApiError({
        status: 422,
        message: "Invalid input",
        errors: { insurance_number: ["Insurance number is invalid"] },
      }),
    );

    expect(formMocks.setError).toHaveBeenCalledWith("insurance_number", {
      message: "Insurance number is invalid",
      type: "validate",
    });
  });

  it("converts adjustment amounts and attaches month and driver ids", () => {
    formMocks.values = { amount: "۱,۵۰۰", description: "Great work" };
    const onSuccess = vi.fn();
    const { container } = render(
      <DriverTipFormComponent
        type="bonus"
        driverId={21}
        onSuccess={onSuccess}
      />,
    );

    submitForm(container);

    expect(mutations.addBonusPenalty).toHaveBeenCalledWith(
      {
        financialMonthId: 41,
        driverId: 21,
        type: "bonus",
        amount: 1500,
        description: "Great work",
      },
      expect.any(Object),
    );
    mutations.addBonusPenalty.mock.calls[0][1].onSuccess();
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(formMocks.setValues).toHaveBeenCalled();
  });
});

describe("rejection form submission", () => {
  it("forwards the validated rejection reason", () => {
    formMocks.values = { reject_reason: "Incorrect amount" };
    const onSubmit = vi.fn();
    const { container } = render(
      <RejectDrawerComponent
        isOpen
        isLoading={false}
        title="expense"
        onOpen={vi.fn()}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    submitForm(container);

    expect(onSubmit).toHaveBeenCalledWith({
      reject_reason: "Incorrect amount",
    });
  });
});
