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
  setValue: vi.fn(),
  setValues: vi.fn(),
  formState: { errors: {} },
}));
const mutations = vi.hoisted(() => ({
  expense: vi.fn(),
  income: vi.fn(),
  payment: vi.fn(),
}));
const enqueueSnackbarMock = vi.hoisted(() => vi.fn());

vi.mock("@mui/material", () => ({
  Autocomplete: "div",
  Button: "button",
  FormControl: "div",
  InputLabel: "label",
  MenuItem: "option",
  Select: "select",
  TextField: "input",
}));
vi.mock("iconsax-reactjs", () => ({ InfoCircle: "span" }));
vi.mock("react-hook-form", () => ({
  Controller: ({ render }: { render: (props: unknown) => unknown }) =>
    render({ field: { value: "", onChange: vi.fn() } }),
  useWatch: vi.fn(() => ({})),
}));
vi.mock("notistack", () => ({
  useSnackbar: () => ({ enqueueSnackbar: enqueueSnackbarMock }),
}));
vi.mock("@/app/_components/date-picker-component", () => ({
  default: "input",
}));
vi.mock("@/app/_components/description-input", () => ({ default: "textarea" }));
vi.mock("@/app/_components/price-input-component", () => ({
  default: "input",
}));
vi.mock("../_hooks/use-expense-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-income-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-payment-form", () => ({ default: () => formMocks }));
vi.mock("../_hooks/use-create-expense-endpoint", () => ({
  default: () => ({ mutate: mutations.expense, isPending: false }),
}));
vi.mock("../_hooks/use-create-income-endpoint", () => ({
  default: () => ({ mutate: mutations.income, isPending: false }),
}));
vi.mock("../_hooks/use-add-payment-endpoint", () => ({
  default: () => ({ mutate: mutations.payment, isPending: false }),
}));
vi.mock("../_hooks/use-get-members-endpoint", () => ({
  default: () => ({
    data: {
      data: [
        {
          member: { id: 7 },
          user: { id: 70, full_name: "Ali Ahmadi" },
        },
      ],
    },
    isLoading: false,
    isSuccess: true,
  }),
}));
vi.mock("../_providers/karbooms-store-provider", () => ({
  useKarboomsStore: (selector: (state: unknown) => unknown) =>
    selector({ id: 12 }),
}));
vi.mock("@/app/_providers/user-info-provider", () => ({
  useUserInfoStore: (selector: (state: unknown) => unknown) =>
    selector({ id: 70 }),
}));

import ApiError from "@/app/_errors/api-error";
import ExpenseFormComponent from "./expense-form-component";
import IncomeFormComponent from "./income-form-component";
import PaymentFormComponent from "./payment-form-component";

const member = {
  member: { id: 7 },
  user: { id: 70, full_name: "Ali Ahmadi" },
};

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

describe("expense submission", () => {
  it("converts amounts and the local calendar date into the API payload", () => {
    formMocks.values = {
      payer: member,
      date: dayjs("2026-01-02"),
      image: new File(["ignored"], "proof.png"),
      unit_price: "۱,۲۰۰",
      wage_cost: "300",
      description: "Repair",
    };
    const onSuccess = vi.fn();
    const { container } = render(
      <ExpenseFormComponent
        isOpen
        karboomId={12}
        expenseFormRef={{ current: null }}
        categoryType="repair"
        selectedCategory={4}
        onSuccess={onSuccess}
      />,
    );

    submitForm(container);

    expect(mutations.expense).toHaveBeenCalledWith(
      {
        description: "Repair",
        unit_price: 1200,
        wage_cost: 300,
        payer_id: 7,
        category_id: 4,
        karboom_id: 12,
        type: "repair",
        date: "2026-01-02",
      },
      expect.any(Object),
    );
    mutations.expense.mock.calls[0][1].onSuccess();
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(formMocks.setValues).toHaveBeenCalled();
  });

  it("warns instead of mutating when no expense category is selected", () => {
    formMocks.values = {
      payer: member,
      date: dayjs("2026-01-02"),
      image: null,
      unit_price: "100",
      wage_cost: null,
      description: null,
    };
    const { container } = render(
      <ExpenseFormComponent
        isOpen
        karboomId={12}
        expenseFormRef={{ current: null }}
        categoryType="daily"
        selectedCategory={null}
        onSuccess={vi.fn()}
      />,
    );

    submitForm(container);

    expect(mutations.expense).not.toHaveBeenCalled();
    expect(enqueueSnackbarMock).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "warning" }),
    );
  });
});

describe("income submission", () => {
  it("converts prices, member id, type, and local dates", () => {
    formMocks.values = {
      reciever: member,
      started_at: dayjs("2026-01-02"),
      ended_at: dayjs("2026-01-03"),
      image: null,
      unit_price: "500",
      total_price: "1,000",
      quantity: 2,
      description: null,
    };
    const onSuccess = vi.fn();
    const { container } = render(
      <IncomeFormComponent
        isOpen
        karboomId={12}
        incomeType="daily"
        onSuccess={onSuccess}
      />,
    );

    submitForm(container);

    expect(mutations.income).toHaveBeenCalledWith(
      {
        quantity: 2,
        description: null,
        unit_price: 500,
        total_price: 1000,
        type: "daily",
        receiver_id: 7,
        karboom_id: 12,
        started_at: "2026-01-02",
        ended_at: "2026-01-03",
      },
      expect.any(Object),
    );
    mutations.income.mock.calls[0][1].onSuccess();
    expect(onSuccess).toHaveBeenCalledOnce();
  });
});

describe("payment submission", () => {
  it("converts amount, member ids, selected karboom, and local date", () => {
    formMocks.values = {
      payer: member,
      reciever: { ...member, member: { id: 8 } },
      date: dayjs("2026-01-02"),
      total_price: "۲,۵۰۰",
      type: "cash",
      description: "Settlement",
    };
    const onSuccess = vi.fn();
    const { container } = render(
      <PaymentFormComponent isOpen onSuccess={onSuccess} />,
    );

    submitForm(container);

    expect(mutations.payment).toHaveBeenCalledWith(
      {
        type: "cash",
        description: "Settlement",
        total_price: 2500,
        payer_id: 7,
        receiver_id: 8,
        karboomId: 12,
        date: "2026-01-02",
      },
      expect.any(Object),
    );
    mutations.payment.mock.calls[0][1].onSuccess();
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(formMocks.setValues).toHaveBeenCalled();
  });

  it("maps API field errors back to the payment form", () => {
    formMocks.values = {
      payer: member,
      reciever: member,
      date: dayjs("2026-01-02"),
      total_price: "100",
      type: "cash",
      description: null,
    };
    const { container } = render(
      <PaymentFormComponent isOpen onSuccess={vi.fn()} />,
    );
    submitForm(container);

    mutations.payment.mock.calls[0][1].onError(
      new ApiError({
        status: 422,
        message: "Invalid",
        errors: { total_price: ["Amount is invalid"] },
      }),
    );

    expect(formMocks.setError).toHaveBeenCalledWith("total_price", {
      message: "Amount is invalid",
      type: "validate",
    });
  });
});
