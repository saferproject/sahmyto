import { beforeEach, describe, expect, it, vi } from "vitest";

const httpMocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));
const fetchWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@/app/_services/http", () => ({ http: httpMocks }));
vi.mock("@/app/proxy", () => ({ fetchWithAuth: fetchWithAuthMock }));

import { appService } from "@/app/_services/app-service";
import { loginService } from "@/app/login/_services/login-service";
import { verifyService } from "@/app/login/verify/_services/verify-service";
import { dashboardService } from "@/app/dashboard/_services/dashboard-service";
import { profileService } from "@/app/dashboard/profile/_services/profile-service";
import { profileImageService } from "@/app/dashboard/profile/profile-picture/_services/profile-image-service";
import { activityFormService } from "@/app/dashboard/karbooms/_services/activity-form-service";
import { driverFormService } from "@/app/dashboard/karbooms/_services/driver-form-service";
import { karboomService } from "@/app/dashboard/karbooms/_services/karboom-service";
import { partnerFormService } from "@/app/dashboard/karbooms/_services/partner-form-service";
import { activitiesListService } from "@/app/dashboard/karbooms/activities-list/_services/activities-list-service";
import { bodyInsuranceService } from "@/app/dashboard/karbooms/body-insurance-list/_services/body-insurance-service";
import { driversListService } from "@/app/dashboard/karbooms/drivers-list/_services/drivers-list-service";
import { expensesListService } from "@/app/dashboard/karbooms/expenses-list/_services/expenses-list-service";
import { financialManagementService } from "@/app/dashboard/karbooms/financial-management/_services/financial-management-service";
import { driversSalaryService } from "@/app/dashboard/karbooms/financial-management/drivers-salary/_services/drivers-salary-service";
import { incomeListService } from "@/app/dashboard/karbooms/incomes-list/_services/incomes-list-service";
import { partnersListService } from "@/app/dashboard/karbooms/partners-list/_services/partners-list-service";
import { paymentsListService } from "@/app/dashboard/karbooms/payments-list/_services/payments-list-service";
import { thirdPartyInsuranceService } from "@/app/dashboard/karbooms/third-party-insurance-list/_services/third-party-insurance-service";

type HttpMethod = keyof typeof httpMocks;

interface ContractCase {
  name: string;
  invoke: () => unknown;
  method: HttpMethod;
  args: unknown[];
}

const signal = new AbortController().signal;
const standardResponse = { data: undefined, message: "" };

beforeEach(() => {
  vi.clearAllMocks();
  Object.values(httpMocks).forEach((mock) =>
    mock.mockResolvedValue(standardResponse),
  );
  fetchWithAuthMock.mockResolvedValue(standardResponse);
});

describe("application and authentication service contracts", () => {
  const loginBody = { phone: "09123456789" };
  const verifyBody = { phone: "09123456789", code: "1234" };

  it.each<ContractCase>([
    {
      name: "loads insurance companies with cancellation support",
      invoke: () => appService.getInsuranceCompanies(signal),
      method: "get",
      args: ["insurance/companies?paginate=1&page=1", { signal }],
    },
    {
      name: "logs a user in",
      invoke: () => loginService.loginUser(loginBody),
      method: "post",
      args: ["user/login", { body: loginBody }],
    },
    {
      name: "verifies an OTP",
      invoke: () => verifyService.verify(verifyBody),
      method: "post",
      args: ["user/verify", { body: verifyBody }],
    },
    {
      name: "loads profile information with default authorization behavior",
      invoke: () => dashboardService.getProfileInfo(),
      method: "get",
      args: [
        "user/profile",
        { signal: undefined, redirectOnUnauthorized: true },
      ],
    },
    {
      name: "allows profile authorization redirects to be disabled",
      invoke: () =>
        dashboardService.getProfileInfo({
          signal,
          redirectOnUnauthorized: false,
        }),
      method: "get",
      args: ["user/profile", { signal, redirectOnUnauthorized: false }],
    },
    {
      name: "logs a user out",
      invoke: () => dashboardService.userLogout(),
      method: "post",
      args: ["user/logout"],
    },
    {
      name: "loads collaboration requests",
      invoke: () => dashboardService.getKarboomRequests(signal),
      method: "get",
      args: ["karboom/requests?paginate=1&page=1", { signal }],
    },
    {
      name: "accepts a collaboration request",
      invoke: () => dashboardService.acceptKarboomRequest(14),
      method: "post",
      args: ["karboom/requests/accept/14"],
    },
    {
      name: "rejects a collaboration request",
      invoke: () => dashboardService.rejectKarboomRequest(14),
      method: "post",
      args: ["karboom/requests/reject/14"],
    },
    {
      name: "updates profile data",
      invoke: () => profileService.completeProfile(loginBody as never),
      method: "put",
      args: ["user/updateProfile", { body: loginBody }],
    },
  ])("$name", async ({ invoke, method, args }) => {
    await invoke();

    expect(httpMocks[method]).toHaveBeenCalledOnce();
    expect(httpMocks[method]).toHaveBeenCalledWith(...args);
  });

  it("uploads profile images without JSON headers", async () => {
    const body = new FormData();
    body.append("avatar", new File(["avatar"], "avatar.png"));

    await profileImageService.uploadProfileImage(body);

    expect(fetchWithAuthMock).toHaveBeenCalledWith("user/updateAvatar", {
      body,
      method: "POST",
    });
  });
});

describe("karboom write service contracts", () => {
  const addDriver = {
    karboom_id: 12,
    phone: "09123456789",
    first_name: "Ali",
  };
  const editDriver = { driver_id: 21, first_name: "Reza" };
  const addPartner = { karboom_id: 12, first_name: "Sara" };
  const editPartner = { partner_id: 22, first_name: "Mina" };
  const createExpense = {
    karboom_id: 12,
    category_id: 4,
    unit_price: 1000,
  };
  const createIncome = {
    karboom_id: 12,
    quantity: 2,
    unit_price: 500,
  };

  it.each<ContractCase>([
    {
      name: "creates a karboom",
      invoke: () => karboomService.createKarboom({ name: "Fleet" }),
      method: "post",
      args: ["karboom/store", { body: { name: "Fleet" } }],
    },
    {
      name: "creates an expense without leaking its path id into the body",
      invoke: () => karboomService.createExpense(createExpense as never),
      method: "post",
      args: [
        "karboom/expense/store/12",
        { body: { category_id: 4, unit_price: 1000 } },
      ],
    },
    {
      name: "creates an income without leaking its path id into the body",
      invoke: () => karboomService.createIncome(createIncome as never),
      method: "post",
      args: [
        "karboom/income/store/12",
        { body: { quantity: 2, unit_price: 500 } },
      ],
    },
    {
      name: "adds a driver",
      invoke: () => driverFormService.addDriver(addDriver as never),
      method: "post",
      args: [
        "karboom/drivers/store/12",
        {
          body: {
            phone: "09123456789",
            first_name: "Ali",
          },
        },
      ],
    },
    {
      name: "edits a driver",
      invoke: () => driverFormService.editDriver(editDriver as never),
      method: "put",
      args: ["karboom/drivers/edit/21", { body: { first_name: "Reza" } }],
    },
    {
      name: "adds a partner",
      invoke: () => partnerFormService.addPartner(addPartner as never),
      method: "post",
      args: ["karboom/partners/store/12", { body: { first_name: "Sara" } }],
    },
    {
      name: "edits a partner",
      invoke: () => partnerFormService.editPartner(editPartner as never),
      method: "put",
      args: ["karboom/partners/edit/22", { body: { first_name: "Mina" } }],
    },
  ])("$name", async ({ invoke, method, args }) => {
    await invoke();

    expect(httpMocks[method]).toHaveBeenCalledWith(...args);
  });
});

describe("karboom read and lookup service contracts", () => {
  it.each<ContractCase>([
    {
      name: "loads karbooms",
      invoke: () => karboomService.getKarbooms(signal),
      method: "get",
      args: ["karboom?paginate=1&page=1", { signal }],
    },
    {
      name: "loads expense categories by type",
      invoke: () => karboomService.getExpensesCategories("repair", signal),
      method: "get",
      args: [
        "karboom/expense/categories?type=repair&paginate=1&page=1",
        { signal },
      ],
    },
    {
      name: "loads members",
      invoke: () => karboomService.getMembers(12, signal),
      method: "get",
      args: ["karboom/members/12", { signal }],
    },
    {
      name: "loads drivers",
      invoke: () => driversListService.getDrivers(12, signal),
      method: "get",
      args: ["karboom/drivers/12?paginate=1&page=1", { signal }],
    },
    {
      name: "deletes a driver",
      invoke: () => driversListService.deleteDriver(21),
      method: "delete",
      args: ["karboom/drivers/delete/21"],
    },
    {
      name: "loads filtered partners with encoded query parameters",
      invoke: () =>
        partnersListService.getPartners(
          { karboom_id: 12, name: "Ali Reza" } as never,
          signal,
        ),
      method: "get",
      args: [
        "karboom/partners/12?name=Ali%20Reza&paginate=1&page=1",
        { signal },
      ],
    },
    {
      name: "deletes a partner",
      invoke: () => partnersListService.deletePartner(22),
      method: "delete",
      args: ["karboom/partners/delete/22"],
    },
  ])("$name", async ({ invoke, method, args }) => {
    await invoke();

    expect(httpMocks[method]).toHaveBeenCalledWith(...args);
  });
});

describe("income, expense, and payment service contracts", () => {
  const rejection = { reject_reason: "Incorrect amount" };

  it.each<ContractCase>([
    {
      name: "loads incomes",
      invoke: () => incomeListService.getIncomes(12, signal),
      method: "get",
      args: ["karboom/income/karboom/12?paginate=1&page=1", { signal }],
    },
    {
      name: "approves an income",
      invoke: () => incomeListService.approveIncome(31),
      method: "post",
      args: ["karboom/income/accept/31"],
    },
    {
      name: "rejects an income with a reason",
      invoke: () => incomeListService.rejectIncome(31, rejection),
      method: "post",
      args: ["karboom/income/reject/31", { body: rejection }],
    },
    {
      name: "loads expenses",
      invoke: () => expensesListService.getExpenses(12, signal),
      method: "get",
      args: ["karboom/expense/karboom/12?paginate=1&page=1", { signal }],
    },
    {
      name: "approves an expense",
      invoke: () => expensesListService.approveExpense(32),
      method: "post",
      args: ["karboom/expense/accept/32"],
    },
    {
      name: "rejects an expense with a reason",
      invoke: () => expensesListService.rejectExpense(32, rejection),
      method: "post",
      args: ["karboom/expense/reject/32", { body: rejection }],
    },
    {
      name: "adds a payment without leaking its path id into the body",
      invoke: () =>
        paymentsListService.addPayment({
          karboomId: 12,
          total_price: 3000,
          type: "cash",
        } as never),
      method: "post",
      args: [
        "karboom/payment/store/12",
        { body: { total_price: 3000, type: "cash" } },
      ],
    },
    {
      name: "approves a payment",
      invoke: () => paymentsListService.approvePayment(33),
      method: "post",
      args: ["karboom/payment/accept/33"],
    },
    {
      name: "rejects a payment without leaking its path id into the body",
      invoke: () =>
        paymentsListService.rejectPayment({ paymentId: 33, ...rejection }),
      method: "post",
      args: ["karboom/payment/reject/33", { body: rejection }],
    },
  ])("$name", async ({ invoke, method, args }) => {
    await invoke();

    expect(httpMocks[method]).toHaveBeenCalledWith(...args);
  });

  it("normalizes missing payment approvals from the API", async () => {
    httpMocks.get.mockResolvedValue({
      data: [
        { id: 1, approvals: null },
        { id: 2, approvals: [{ id: 7 }] },
      ],
      message: "ok",
    });

    const response = await paymentsListService.getPayments(12, signal);

    expect(httpMocks.get).toHaveBeenCalledWith(
      "karboom/payment/12?paginate=1&page=1",
      { signal },
    );
    expect(response).toEqual({
      data: [
        { id: 1, approvals: [] },
        { id: 2, approvals: [{ id: 7 }] },
      ],
      message: "ok",
    });
  });
});

describe("insurance service contracts", () => {
  it.each<ContractCase>([
    {
      name: "loads body-insurance policies",
      invoke: () => bodyInsuranceService.getBodyInsurances(12, signal),
      method: "get",
      args: ["insurance/body/12?paginate=1&page=1", { signal }],
    },
    {
      name: "adds body insurance without leaking its path id into the body",
      invoke: () =>
        bodyInsuranceService.addBodyInsurance({
          karboomId: 12,
          insurance_code: "BODY-1",
        } as never),
      method: "post",
      args: ["insurance/body-add/12", { body: { insurance_code: "BODY-1" } }],
    },
    {
      name: "loads third-party policies",
      invoke: () =>
        thirdPartyInsuranceService.getThirdPartyInsurances(12, signal),
      method: "get",
      args: ["insurance/third-party/12?paginate=1&page=1", { signal }],
    },
    {
      name: "adds third-party insurance without leaking its path id",
      invoke: () =>
        thirdPartyInsuranceService.addThirdPartyInsurance({
          karboom_id: 12,
          insurance_code: "THIRD-1",
        } as never),
      method: "post",
      args: [
        "insurance/third-party-add/12",
        { body: { insurance_code: "THIRD-1" } },
      ],
    },
  ])("$name", async ({ invoke, method, args }) => {
    await invoke();

    expect(httpMocks[method]).toHaveBeenCalledWith(...args);
  });
});

describe("financial-management service contracts", () => {
  it.each<ContractCase>([
    {
      name: "loads financial months",
      invoke: () =>
        financialManagementService.getFinancialManagmentMonths(12, signal),
      method: "get",
      args: ["karboom/financials/months/12?paginate=1&page=1", { signal }],
    },
    {
      name: "validates month closing",
      invoke: () =>
        financialManagementService.validateClosingFinancialMonth(41),
      method: "get",
      args: ["karboom/financials/validate/41"],
    },
    {
      name: "starts month processing",
      invoke: () =>
        financialManagementService.startProcessingFinancialMonth(41),
      method: "put",
      args: ["karboom/financials/processing/41"],
    },
    {
      name: "closes a financial month",
      invoke: () => financialManagementService.closeFinancialMonth(41),
      method: "put",
      args: ["karboom/financials/closed/41"],
    },
    {
      name: "loads financial-month details",
      invoke: () =>
        financialManagementService.getFinancialMonthData(41, signal),
      method: "get",
      args: ["karboom/financials/show/41", { signal }],
    },
    {
      name: "loads settlement details",
      invoke: () => financialManagementService.getSettlementData(41, signal),
      method: "get",
      args: ["karboom/financials/settlement/41", { signal }],
    },
    {
      name: "loads driver salaries",
      invoke: () => driversSalaryService.getDriversSalary(41, signal),
      method: "get",
      args: ["karboom/adjustments/41?paginate=1&page=1", { signal }],
    },
    {
      name: "adds a driver adjustment with ids in the path only",
      invoke: () =>
        driversSalaryService.addBonusOrPenaltyForDriver({
          financialMonthId: 41,
          driverId: 21,
          type: "bonus",
          amount: 1000,
        } as never),
      method: "post",
      args: [
        "karboom/adjustments/month/41/driver/21",
        { body: { type: "bonus", amount: 1000 } },
      ],
    },
    {
      name: "deletes a driver adjustment",
      invoke: () => driversSalaryService.deleteBonusOrPenaltyForDriver(51),
      method: "delete",
      args: ["karboom/adjustments/adjustments/51"],
    },
  ])("$name", async ({ invoke, method, args }) => {
    await invoke();

    expect(httpMocks[method]).toHaveBeenCalledWith(...args);
  });
});

describe("activity service wiring", () => {
  it("forwards activity list ids, mutation ids, payloads, and abort signals", async () => {
    await activitiesListService.getActivities(12, signal);
    expect(httpMocks.get).toHaveBeenCalledWith(expect.any(String), { signal });

    await activitiesListService.deleteActivity(61);
    expect(httpMocks.delete).toHaveBeenCalledWith(expect.any(String));

    await activityFormService.addActivity({
      karboomId: 12,
      description: "Oil change",
    } as never);
    expect(httpMocks.post).toHaveBeenCalledWith(expect.any(String), {
      body: { description: "Oil change" },
    });

    await activityFormService.editActivity({
      activityId: 61,
      description: "Filter change",
    } as never);
    expect(httpMocks.put).toHaveBeenCalledWith(expect.any(String), {
      body: { description: "Filter change" },
    });
  });
});
