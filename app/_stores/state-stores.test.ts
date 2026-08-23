import { afterEach, describe, expect, it, vi } from "vitest";

import { createUserInfoStore } from "./user-info-store";
import { USER_INFO_STORE_DEFAULTS } from "../_constants/user-info-store-defaults";
import { createActionDialogStore } from "@/app/dashboard/_stores/action-dialog-store";
import ACTION_DIALOG_PROPS_DEFAULTS from "@/app/dashboard/_constants/action-dialog-props-defaults";
import { createConfirmationDialogStore } from "@/app/dashboard/_stores/confirmation-dialog-store";
import { CONFIRMATION_DIALOG_PROPS_DEFAULTS } from "@/app/dashboard/_constants/confirmation-dialog-props-defaults";
import { createKarboomsStore } from "@/app/dashboard/karbooms/_stores/karbooms-store";
import { KARBOOMS_STORE_DEFAULTS } from "@/app/dashboard/karbooms/_constants/karbooms-store-defaults";
import { createExpenseListStore } from "@/app/dashboard/karbooms/expenses-list/_stores/expense-list-store";
import { EXPENSE_LIST_STORE_DEFAULTS } from "@/app/dashboard/karbooms/expenses-list/_constants/expense-list-store-defaults";
import { createIncomeListStore } from "@/app/dashboard/karbooms/incomes-list/_stores/income-list-store";
import { INCOME_LIST_STORE_DEFAULTS } from "@/app/dashboard/karbooms/incomes-list/_constants/income-list-store-defaults";
import { createPaymentListStore } from "@/app/dashboard/karbooms/payments-list/_stores/payment-list-store";
import { PAYMENT_LIST_STORE_DEFAULTS } from "@/app/dashboard/karbooms/payments-list/_constants/payment-list-store-defaults";
import { createFinancialMonthStore } from "@/app/dashboard/karbooms/financial-management/_stores/financial-management-store";
import { FINANCIAL_MONTH_STORE_DEFAULTS } from "@/app/dashboard/karbooms/financial-management/_constants/financial-month-store-defaults";
import { createSettlementStore } from "@/app/dashboard/karbooms/financial-management/_stores/settlement-store";
import { SETTLEMENT_STORE_DEFAULTS } from "@/app/dashboard/karbooms/financial-management/_constants/settlement-store-defaults";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("user information store", () => {
  it("updates individual fields without losing the rest of the user", () => {
    const store = createUserInfoStore();

    store.getState().setPhone("09123456789");

    expect(store.getState()).toEqual(
      expect.objectContaining({
        ...USER_INFO_STORE_DEFAULTS,
        phone: "09123456789",
      }),
    );
  });

  it("updates and persists a complete user", () => {
    const setItem = vi.fn();
    vi.stubGlobal("window", { localStorage: { setItem } });
    const store = createUserInfoStore();
    const user = {
      ...USER_INFO_STORE_DEFAULTS,
      id: 7,
      phone: "09123456789",
      full_name: "Ali Ahmadi",
    };

    store.getState().setUser(user);

    expect(store.getState()).toEqual(expect.objectContaining(user));
    expect(setItem).toHaveBeenCalledWith("user", JSON.stringify(user));
  });
});

describe("dialog stores", () => {
  it("opens, closes, replaces, and resets the action dialog", () => {
    const store = createActionDialogStore();

    store.getState().openDialog();
    expect(store.getState().isOpen).toBe(true);
    store.getState().closeDialog();
    expect(store.getState().isOpen).toBe(false);

    store.getState().setDialog({
      ...ACTION_DIALOG_PROPS_DEFAULTS,
      isOpen: true,
      title: "Delete item",
    });
    expect(store.getState().title).toBe("Delete item");

    store.getState().resetDialog();
    expect(store.getState()).toEqual(
      expect.objectContaining(ACTION_DIALOG_PROPS_DEFAULTS),
    );
  });

  it("controls confirmation visibility and pending state", () => {
    const store = createConfirmationDialogStore();

    store.getState().openDialog();
    store.getState().startPending();
    expect(store.getState()).toEqual(
      expect.objectContaining({ isOpen: true, isPending: true }),
    );

    store.getState().stopPending();
    store.getState().closeDialog();
    expect(store.getState()).toEqual(
      expect.objectContaining({ isOpen: false, isPending: false }),
    );

    store.getState().setDialog({
      ...CONFIRMATION_DIALOG_PROPS_DEFAULTS,
      isOpen: true,
      title: "Confirm",
    });
    expect(store.getState().title).toBe("Confirm");
  });
});

describe("selected-entity stores", () => {
  it("selects, clears, and toggles the active karboom drawer", () => {
    const store = createKarboomsStore();
    const karboom = { ...KARBOOMS_STORE_DEFAULTS, id: 12, name: "Fleet" };

    store.getState().setActiveKarboom(karboom);
    expect(store.getState()).toEqual(expect.objectContaining(karboom));

    store.getState().openKarboomActionDrawer();
    expect(store.getState().isActionsDrawerOpen).toBe(true);
    store.getState().closeKarboomActionDrawer();
    expect(store.getState().isActionsDrawerOpen).toBe(false);

    store.getState().clearActiveKarboom();
    expect(store.getState()).toEqual(
      expect.objectContaining(KARBOOMS_STORE_DEFAULTS),
    );
  });

  it.each([
    [
      "expense",
      () => createExpenseListStore(),
      "setActiveExpense",
      "clearActiveExpense",
      { ...EXPENSE_LIST_STORE_DEFAULTS, id: 31, category: "fuel" },
      EXPENSE_LIST_STORE_DEFAULTS,
    ],
    [
      "income",
      () => createIncomeListStore(),
      "setActiveIncome",
      "clearActiveIncome",
      { ...INCOME_LIST_STORE_DEFAULTS, id: 32, unit_price: 1000 },
      INCOME_LIST_STORE_DEFAULTS,
    ],
    [
      "payment",
      () => createPaymentListStore(),
      "setActivePayment",
      "clearActivePayment",
      { ...PAYMENT_LIST_STORE_DEFAULTS, id: 33, total_price: 2000 },
      PAYMENT_LIST_STORE_DEFAULTS,
    ],
  ] as const)(
    "selects and clears the active %s",
    (_name, createStore, setter, clearer, selected, defaults) => {
      const store = createStore();
      const actions = store.getState() as unknown as Record<
        string,
        (value?: unknown) => void
      >;

      actions[setter](selected);
      expect(store.getState()).toEqual(expect.objectContaining(selected));
      actions[clearer]();
      expect(store.getState()).toEqual(expect.objectContaining(defaults));
    },
  );

  it("selects and clears a financial month using financial-month defaults", () => {
    const store = createFinancialMonthStore();
    const month = {
      ...FINANCIAL_MONTH_STORE_DEFAULTS,
      id: 41,
      karboom_id: 12,
      status: "processing" as const,
    };

    store.getState().setFinancialMonth(month);
    expect(store.getState()).toEqual(expect.objectContaining(month));

    store.getState().clearFinancialMonth();
    expect(store.getState()).toEqual(
      expect.objectContaining(FINANCIAL_MONTH_STORE_DEFAULTS),
    );
    expect(store.getState()).not.toHaveProperty("isActionsDrawerOpen");
  });

  it("selects and clears settlement details", () => {
    const store = createSettlementStore();
    const settlement = {
      ...SETTLEMENT_STORE_DEFAULTS,
      id: 71,
      name: "Ali Ahmadi",
      balance: 500,
    };

    store.getState().setSettlement(settlement);
    expect(store.getState()).toEqual(expect.objectContaining(settlement));

    store.getState().clearSettlement();
    expect(store.getState()).toEqual(
      expect.objectContaining(SETTLEMENT_STORE_DEFAULTS),
    );
  });
});
