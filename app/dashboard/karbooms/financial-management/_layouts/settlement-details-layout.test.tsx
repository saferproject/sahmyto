// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import SettlementDetailsDrawerLayout from "./settlement-details-layout";

const { clearSettlement, settlementStore } = vi.hoisted(() => ({
  clearSettlement: vi.fn(),
  settlementStore: {
    clearSettlement: vi.fn(),
    name: "Ali",
    income_held: 0,
    expense_credit: 0,
    payments_in: 0,
    payments_out: 0,
    share: 0,
    salary: 0,
    service_fee: 0,
    total: 0,
    status: "settled" as const,
    breakdown: {
      incomes_received: { items: [], total: 0 },
      expenses_paid: { items: [], total: 0 },
      payments_received: { items: [], total: 0 },
      payments_made: { items: [], total: 0 },
      salary: { items: [], total: 0 },
    },
  },
}));

settlementStore.clearSettlement = clearSettlement;

vi.mock("../_providers/settlement-store-provider", () => ({
  useSettlementStore: (selector: (state: typeof settlementStore) => unknown) =>
    selector(settlementStore),
}));

vi.mock("@/app/_components/form-drawer-component", () => ({
  default: ({
    children,
    onClose,
  }: {
    children: ReactNode;
    onClose: () => void;
  }) => (
    <div>
      <button type="button" onClick={onClose}>
        close drawer
      </button>
      {children}
    </div>
  ),
}));

function getDisclosure(id: string) {
  const disclosure = document.getElementById(id);

  if (!disclosure) throw new Error(`Missing disclosure: ${id}`);

  return disclosure;
}

describe("SettlementDetailsDrawerLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("toggles child groups independently", () => {
    render(
      <SettlementDetailsDrawerLayout
        isOpen
        onOpen={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    const incomeButton = screen.getByRole("button", { name: /کل درآمد/ });
    const expenseButton = screen.getByRole("button", { name: /کل هزینه/ });
    const incomeDisclosure = getDisclosure("settlement-incomes");

    expect(incomeButton.getAttribute("aria-expanded")).toBe("false");
    expect(expenseButton.getAttribute("aria-expanded")).toBe("false");
    expect(incomeDisclosure.getAttribute("aria-hidden")).toBe("true");
    expect(incomeDisclosure.className).toContain(
      "transition-[grid-template-rows,opacity]",
    );
    expect(incomeDisclosure.classList.contains("grid-rows-[0fr]")).toBe(true);

    fireEvent.click(incomeButton);

    expect(incomeButton.getAttribute("aria-expanded")).toBe("true");
    expect(expenseButton.getAttribute("aria-expanded")).toBe("false");
    expect(incomeDisclosure.getAttribute("aria-hidden")).toBe("false");
    expect(incomeDisclosure.classList.contains("grid-rows-[1fr]")).toBe(true);

    fireEvent.click(incomeButton);

    expect(incomeButton.getAttribute("aria-expanded")).toBe("false");
    expect(incomeDisclosure.getAttribute("aria-hidden")).toBe("true");
  });

  it("keeps profit or loss and total as static rows", () => {
    render(
      <SettlementDetailsDrawerLayout
        isOpen
        onOpen={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /سهم از سود\/زیان/ }),
    ).toBeNull();
    expect(screen.queryByRole("button", { name: /مجموع/ })).toBeNull();
  });

  it("collapses groups and clears settlement data when closing", () => {
    const onClose = vi.fn();

    render(
      <SettlementDetailsDrawerLayout
        isOpen
        onOpen={vi.fn()}
        onClose={onClose}
      />,
    );

    const salaryButton = screen.getByRole("button", { name: /کل حقوق/ });
    const salaryDisclosure = getDisclosure("settlement-salaries");

    fireEvent.click(salaryButton);
    expect(salaryButton.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "close drawer" }));

    expect(salaryButton.getAttribute("aria-expanded")).toBe("false");
    expect(salaryDisclosure.getAttribute("aria-hidden")).toBe("true");
    expect(clearSettlement).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
