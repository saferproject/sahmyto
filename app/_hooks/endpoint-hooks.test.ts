/* eslint-disable react-hooks/rules-of-hooks -- adapter hooks are invoked with their React dependencies mocked */
import { beforeEach, describe, expect, it, vi } from "vitest";

interface CapturedQueryOptions {
  queryKey?: readonly unknown[];
  enabled?: boolean;
  queryFn: (context: {
    queryKey?: readonly unknown[];
    signal: AbortSignal;
  }) => unknown;
}

interface CapturedMutationOptions {
  mutationKey?: unknown;
  mutationFn: (variables: unknown) => unknown;
  invalidateQueries?: unknown;
}

interface CapturedInfiniteOptions {
  queryKey: readonly unknown[];
  enabled?: boolean;
  queryFn: (
    page: number,
    signal: AbortSignal,
    queryKey: readonly unknown[],
  ) => unknown;
}

const useListQueryMock = vi.hoisted(() =>
  vi.fn((...args: unknown[]) => {
    void args;
    return { type: "list" };
  }),
);
const useInfiniteListQueryMock = vi.hoisted(() =>
  vi.fn((options: CapturedInfiniteOptions) => options),
);
const useInvalidatingMutationMock = vi.hoisted(() =>
  vi.fn((options: CapturedMutationOptions) => {
    void options;
    return { type: "mutation" };
  }),
);
const useQueryMock = vi.hoisted(() =>
  vi.fn((options: CapturedQueryOptions) => {
    void options;
    return { type: "query" };
  }),
);
const useMutationMock = vi.hoisted(() =>
  vi.fn((options: CapturedMutationOptions) => {
    void options;
    return { type: "direct-mutation" };
  }),
);

vi.mock("@/app/_hooks/use-list-query", () => ({
  default: useListQueryMock,
}));
vi.mock("@/app/_hooks/use-infinite-list-query", () => ({
  default: useInfiniteListQueryMock,
}));
vi.mock("@/app/_hooks/use-invalidating-mutation", () => ({
  default: useInvalidatingMutationMock,
}));
vi.mock("@tanstack/react-query", () => ({
  useQuery: useQueryMock,
  useMutation: useMutationMock,
}));
vi.mock("@/app/_services/http", () => ({
  http: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));
vi.mock("@/app/proxy", () => ({ fetchWithAuth: vi.fn() }));

import useGetInsuranceCompaniesEndpoint from "@/app/_hooks/use-get-insurance-companies-endpoint";
import { appService } from "@/app/_services/app-service";
import useLoginUserEndpoint from "@/app/login/_hooks/use-login-user-endpoint";
import { loginService } from "@/app/login/_services/login-service";
import useVerify from "@/app/login/verify/_hooks/use-verify-endpoint";
import { verifyService } from "@/app/login/verify/_services/verify-service";
import useAcceptKarboomRequest from "@/app/dashboard/_hooks/use-accept-karboom-request-endpoint";
import useGetKarboomRequests from "@/app/dashboard/_hooks/use-get-karboom-requests-endpoint";
import useGetProfileInfo from "@/app/dashboard/_hooks/use-get-profile-info-endpoint";
import useRejectKarboomRequest from "@/app/dashboard/_hooks/use-reject-karboom-request-endpoint";
import useUserLogout from "@/app/dashboard/_hooks/use-user-logout-endpoint";
import { dashboardService } from "@/app/dashboard/_services/dashboard-service";
import useCompleteProfileEndpoint from "@/app/dashboard/profile/_hooks/use-complete-profile-endpoint";
import { profileService } from "@/app/dashboard/profile/_services/profile-service";
import useUploadProfileImageEndpoint from "@/app/dashboard/profile/profile-picture/_hooks/use-upload-profile-image-endpoint";
import { profileImageService } from "@/app/dashboard/profile/profile-picture/_services/profile-image-service";
import useAddDriver from "@/app/dashboard/karbooms/_hooks/use-add-driver-endpoint";
import useAddPartner from "@/app/dashboard/karbooms/_hooks/use-add-partner-endpoint";
import useAddPayment from "@/app/dashboard/karbooms/_hooks/use-add-payment-endpoint";
import useCreateExpenseEndpoint from "@/app/dashboard/karbooms/_hooks/use-create-expense-endpoint";
import useCreateIncomeEndpoint from "@/app/dashboard/karbooms/_hooks/use-create-income-endpoint";
import useCreateKarboomEndpoint from "@/app/dashboard/karbooms/_hooks/use-create-karboom-endpoint";
import useEditDriver from "@/app/dashboard/karbooms/_hooks/use-edit-driver-endpoint";
import useEditPartner from "@/app/dashboard/karbooms/_hooks/use-edit-partner-endpoint";
import useGetExpensesCategoriesEndpoint from "@/app/dashboard/karbooms/_hooks/use-get-expenses-categories-endpoint";
import useGetKarboomsEndpoint from "@/app/dashboard/karbooms/_hooks/use-get-karbooms-endpoint";
import useGetMembersEndpoint from "@/app/dashboard/karbooms/_hooks/use-get-members-endpoint";
import { driverFormService } from "@/app/dashboard/karbooms/_services/driver-form-service";
import { karboomService } from "@/app/dashboard/karbooms/_services/karboom-service";
import { partnerFormService } from "@/app/dashboard/karbooms/_services/partner-form-service";
import useAddActivityEndpoint from "@/app/dashboard/karbooms/activities-list/_hooks/use-add-activity-endpoint";
import useDeleteActivityEndpoint from "@/app/dashboard/karbooms/activities-list/_hooks/use-delete-activity-endpoint";
import useEditActivityEndpoint from "@/app/dashboard/karbooms/activities-list/_hooks/use-edit-activity-endpoint";
import useGetActivitiesEndpoint from "@/app/dashboard/karbooms/activities-list/_hooks/use-get-activities-endpoint";
import { activitiesListService } from "@/app/dashboard/karbooms/activities-list/_services/activities-list-service";
import { activityFormService } from "@/app/dashboard/karbooms/_services/activity-form-service";
import useAddBodyInsuranceEndpoint from "@/app/dashboard/karbooms/body-insurance-list/_hooks/use-add-body-insurance-endpoint";
import useGetBodyInsurancesEndpoint from "@/app/dashboard/karbooms/body-insurance-list/_hooks/use-get-body-insurances-endpoint";
import { bodyInsuranceService } from "@/app/dashboard/karbooms/body-insurance-list/_services/body-insurance-service";
import useDeleteDriverEndpoint from "@/app/dashboard/karbooms/drivers-list/_hooks/use-delete-driver-endpoint";
import useGetDriversEndpoint from "@/app/dashboard/karbooms/drivers-list/_hooks/use-get-karboom-drivers-endpoint";
import { driversListService } from "@/app/dashboard/karbooms/drivers-list/_services/drivers-list-service";
import useApproveExpense from "@/app/dashboard/karbooms/expenses-list/_hooks/use-approve-expense";
import useGetExpenses from "@/app/dashboard/karbooms/expenses-list/_hooks/use-get-expenses";
import useRejectExpense from "@/app/dashboard/karbooms/expenses-list/_hooks/use-reject-expense";
import { expensesListService } from "@/app/dashboard/karbooms/expenses-list/_services/expenses-list-service";
import useCloseFinancialMonth from "@/app/dashboard/karbooms/financial-management/_hooks/use-close-financial-month-endpoint";
import useGetFinancialMonthsEndpoint from "@/app/dashboard/karbooms/financial-management/_hooks/use-get-financial-management-months-endpoint";
import useGetFinancialMonthDataEndpoint from "@/app/dashboard/karbooms/financial-management/_hooks/use-get-financial-month-data-endpoint";
import useGetSettlementData from "@/app/dashboard/karbooms/financial-management/_hooks/use-get-settlement-data-endpoint";
import useStartProcessingFinancialMonthEndpoint from "@/app/dashboard/karbooms/financial-management/_hooks/use-start-processing-financial-month-endpoint";
import useValidateClosingFinancialMonthEndpoint from "@/app/dashboard/karbooms/financial-management/_hooks/use-validate-closing-financial-month-endpoint";
import { financialManagementService } from "@/app/dashboard/karbooms/financial-management/_services/financial-management-service";
import useAddBonusPenaltyDriverEndpoint from "@/app/dashboard/karbooms/financial-management/drivers-salary/_hooks/use-add-bonus-penalty-driver-endpoint";
import useGetDriversSalaryEndpoint from "@/app/dashboard/karbooms/financial-management/drivers-salary/_hooks/use-get-drivers-salaries-endpoint";
import { driversSalaryService } from "@/app/dashboard/karbooms/financial-management/drivers-salary/_services/drivers-salary-service";
import useApproveIncome from "@/app/dashboard/karbooms/incomes-list/_hooks/use-approve-income";
import useGetIncomes from "@/app/dashboard/karbooms/incomes-list/_hooks/use-get-incomes";
import useRejectIncome from "@/app/dashboard/karbooms/incomes-list/_hooks/use-reject-income";
import { incomeListService } from "@/app/dashboard/karbooms/incomes-list/_services/incomes-list-service";
import useDeletePartnerEndpoint from "@/app/dashboard/karbooms/partners-list/_hooks/use-delete-partner-endpoint";
import useGetPartnersEndpoint from "@/app/dashboard/karbooms/partners-list/_hooks/use-get-partners-endpoint";
import { partnersListService } from "@/app/dashboard/karbooms/partners-list/_services/partners-list-service";
import useApprovePaymentEndpoint from "@/app/dashboard/karbooms/payments-list/_hooks/use-approve-payment-endpoint";
import useGetPaymentsEndpoint from "@/app/dashboard/karbooms/payments-list/_hooks/use-get-payments-endpoint";
import useRejectPaymentEndpoint from "@/app/dashboard/karbooms/payments-list/_hooks/use-reject-payment-endpoint";
import { paymentsListService } from "@/app/dashboard/karbooms/payments-list/_services/payments-list-service";
import useAddThirdPartyInsurance from "@/app/dashboard/karbooms/third-party-insurance-list/_hooks/use-add-third-party-insurance-endpoint";
import useGetThirdPartyInsurancesEndpoint from "@/app/dashboard/karbooms/third-party-insurance-list/_hooks/use-get-third-party-insurances-endpoint";
import { thirdPartyInsuranceService } from "@/app/dashboard/karbooms/third-party-insurance-list/_services/third-party-insurance-service";

interface AdapterCase {
  name: string;
  invoke: () => unknown;
  args: unknown[];
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("list endpoint hook adapters", () => {
  it.each<AdapterCase>([
    {
      name: "activities",
      invoke: () => useGetActivitiesEndpoint(12),
      args: [["activities", 12], activitiesListService.getActivities, 12],
    },
    {
      name: "financial month data with caller enablement",
      invoke: () => useGetFinancialMonthDataEndpoint(41, false),
      args: [
        ["financial-month-data", 41],
        financialManagementService.getFinancialMonthData,
        41,
        false,
      ],
    },
  ])("configures $name", ({ invoke, args }) => {
    invoke();

    expect(useListQueryMock).toHaveBeenCalledWith(...args);
  });

  it.each([
    [
      "body insurance",
      () => useGetBodyInsurancesEndpoint(12),
      ["body-insurances", 12],
      true,
    ],
    ["drivers", () => useGetDriversEndpoint(12, false), ["drivers", 12], false],
    ["expenses", () => useGetExpenses(12), ["expenses", 12], true],
    [
      "financial months",
      () => useGetFinancialMonthsEndpoint(12),
      ["financial-months", 12],
      true,
    ],
    [
      "driver salaries",
      () => useGetDriversSalaryEndpoint(41),
      ["drivers-salary", 41],
      true,
    ],
    ["incomes", () => useGetIncomes(12), ["incomes", 12], true],
    ["payments", () => useGetPaymentsEndpoint(12), ["payments", 12], true],
    [
      "third-party insurance",
      () => useGetThirdPartyInsurancesEndpoint(12),
      ["third-party-insurances", 12],
      true,
    ],
  ] as const)(
    "configures infinite %s queries",
    (_name, invoke, queryKey, enabled) => {
      invoke();

      expect(useInfiniteListQueryMock).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey, enabled }),
      );
    },
  );

  it("normalizes settlement data before returning it", async () => {
    const response = { data: { members: [] }, message: "ok" };
    vi.spyOn(financialManagementService, "getSettlementData").mockResolvedValue(
      response as never,
    );
    useGetSettlementData(41, true);
    const [queryKey, queryFn, id, enabled] = useListQueryMock.mock.calls[0] as [
      unknown,
      (id: number, signal: AbortSignal) => Promise<unknown>,
      unknown,
      unknown,
    ];
    const signal = new AbortController().signal;

    expect(queryKey).toEqual(["settlement-data", 41]);
    expect(id).toBe(41);
    expect(enabled).toBe(true);
    await expect(queryFn(41, signal)).resolves.toEqual(response);
    expect(financialManagementService.getSettlementData).toHaveBeenCalledWith(
      41,
      signal,
    );
  });
});

describe("invalidating mutation endpoint hook adapters", () => {
  it.each<AdapterCase>([
    {
      name: "accept karboom request",
      invoke: useAcceptKarboomRequest,
      args: [
        {
          mutationKey: ["accept-request"],
          mutationFn: dashboardService.acceptKarboomRequest,
          invalidateQueries: [["requests"], ["karbooms"]],
        },
      ],
    },
    {
      name: "reject karboom request",
      invoke: useRejectKarboomRequest,
      args: [
        {
          mutationKey: ["requests"],
          mutationFn: dashboardService.rejectKarboomRequest,
          invalidateQueries: [["requests"], ["karbooms"]],
        },
      ],
    },
    {
      name: "upload profile image",
      invoke: useUploadProfileImageEndpoint,
      args: [
        {
          mutationKey: ["upload-profile-image"],
          mutationFn: profileImageService.uploadProfileImage,
          invalidateQueries: [["profile"]],
        },
      ],
    },
    {
      name: "add driver",
      invoke: useAddDriver,
      args: [
        {
          mutationKey: ["add-driver"],
          mutationFn: driverFormService.addDriver,
          invalidateQueries: [["drivers"], ["members"]],
        },
      ],
    },
    {
      name: "edit driver",
      invoke: useEditDriver,
      args: [
        {
          mutationKey: ["edit-driver"],
          mutationFn: driverFormService.editDriver,
          invalidateQueries: [["drivers"], ["members"]],
        },
      ],
    },
    {
      name: "add partner",
      invoke: useAddPartner,
      args: [
        {
          mutationKey: ["add-partner"],
          mutationFn: partnerFormService.addPartner,
          invalidateQueries: [["partners"]],
        },
      ],
    },
    {
      name: "edit partner",
      invoke: useEditPartner,
      args: [
        {
          mutationKey: ["edit-partner"],
          mutationFn: partnerFormService.editPartner,
          invalidateQueries: [["partners"]],
        },
      ],
    },
    {
      name: "add payment",
      invoke: useAddPayment,
      args: [
        {
          mutationKey: ["add-payment"],
          mutationFn: paymentsListService.addPayment,
          invalidateQueries: [["payments"]],
        },
      ],
    },
    {
      name: "create expense",
      invoke: useCreateExpenseEndpoint,
      args: [
        {
          mutationKey: ["create-expense"],
          mutationFn: karboomService.createExpense,
          invalidateQueries: [["expenses"], ["financial-month-data"]],
        },
      ],
    },
    {
      name: "create income",
      invoke: useCreateIncomeEndpoint,
      args: [
        {
          mutationKey: ["create-income"],
          mutationFn: karboomService.createIncome,
          invalidateQueries: [["incomes"], ["financial-month-data"]],
        },
      ],
    },
    {
      name: "add activity",
      invoke: useAddActivityEndpoint,
      args: [
        {
          mutationKey: ["add-activity"],
          mutationFn: activityFormService.addActivity,
          invalidateQueries: [["activities"]],
        },
      ],
    },
    {
      name: "edit activity",
      invoke: useEditActivityEndpoint,
      args: [
        {
          mutationKey: ["edit-activity"],
          mutationFn: activityFormService.editActivity,
          invalidateQueries: [["activities"]],
        },
      ],
    },
    {
      name: "delete activity",
      invoke: useDeleteActivityEndpoint,
      args: [
        {
          mutationKey: ["delete-activity"],
          mutationFn: activitiesListService.deleteActivity,
          invalidateQueries: [["activities"]],
        },
      ],
    },
    {
      name: "add body insurance",
      invoke: useAddBodyInsuranceEndpoint,
      args: [
        {
          mutationKey: ["add-body-insurance"],
          mutationFn: bodyInsuranceService.addBodyInsurance,
          invalidateQueries: [["body-insurances"]],
        },
      ],
    },
    {
      name: "delete driver",
      invoke: useDeleteDriverEndpoint,
      args: [
        {
          mutationKey: ["delete-driver"],
          mutationFn: driversListService.deleteDriver,
          invalidateQueries: [["drivers"]],
        },
      ],
    },
    {
      name: "close financial month",
      invoke: useCloseFinancialMonth,
      args: [
        {
          mutationKey: ["close-financial-month"],
          mutationFn: financialManagementService.closeFinancialMonth,
          invalidateQueries: [["financial-month-data"], ["financial-months"]],
        },
      ],
    },
    {
      name: "start financial-month processing",
      invoke: useStartProcessingFinancialMonthEndpoint,
      args: [
        {
          mutationKey: ["start-processing-financial-month"],
          mutationFn: financialManagementService.startProcessingFinancialMonth,
          invalidateQueries: [["financial-months"]],
        },
      ],
    },
    {
      name: "add driver adjustment",
      invoke: useAddBonusPenaltyDriverEndpoint,
      args: [
        {
          mutationKey: ["add-bonus-penalty-driver"],
          mutationFn: driversSalaryService.addBonusOrPenaltyForDriver,
          invalidateQueries: [["drivers-salary"]],
        },
      ],
    },
    {
      name: "approve payment",
      invoke: useApprovePaymentEndpoint,
      args: [
        {
          mutationKey: ["approve-payment"],
          mutationFn: paymentsListService.approvePayment,
          invalidateQueries: [["payments"]],
        },
      ],
    },
    {
      name: "reject payment",
      invoke: useRejectPaymentEndpoint,
      args: [
        {
          mutationKey: ["reject-payment"],
          mutationFn: paymentsListService.rejectPayment,
          invalidateQueries: [["payments"]],
        },
      ],
    },
    {
      name: "delete partner",
      invoke: useDeletePartnerEndpoint,
      args: [
        {
          mutationKey: ["delete-partner"],
          mutationFn: partnersListService.deletePartner,
          invalidateQueries: [["partners"]],
        },
      ],
    },
    {
      name: "add third-party insurance",
      invoke: useAddThirdPartyInsurance,
      args: [
        {
          mutationKey: ["third-party-insurances"],
          mutationFn: thirdPartyInsuranceService.addThirdPartyInsurance,
          invalidateQueries: [["third-party-insurances"]],
        },
      ],
    },
  ])("configures $name", ({ invoke, args }) => {
    invoke();

    expect(useInvalidatingMutationMock).toHaveBeenCalledWith(...args);
  });

  it("creates a karboom through the service", async () => {
    vi.spyOn(karboomService, "createKarboom").mockResolvedValue({} as never);
    useCreateKarboomEndpoint();
    const options = useInvalidatingMutationMock.mock.calls[0][0];
    const body = { name: "Fleet" };

    await options.mutationFn(body);

    expect(options.mutationKey).toEqual(["create-karboom"]);
    expect(options.invalidateQueries).toEqual([["karbooms"]]);
    expect(karboomService.createKarboom).toHaveBeenCalledWith(body);
  });

  it("adapts income rejection bodies", async () => {
    vi.spyOn(incomeListService, "rejectIncome").mockResolvedValue({} as never);
    useRejectIncome();
    const options = useInvalidatingMutationMock.mock.calls[0][0];

    await options.mutationFn({ incomeId: 31, reject_reason: "Incorrect" });

    expect(options.mutationKey).toEqual(["reject-income"]);
    expect(options.invalidateQueries).toEqual([["incomes"]]);
    expect(incomeListService.rejectIncome).toHaveBeenCalledWith(31, {
      reject_reason: "Incorrect",
    });
  });

  it("adapts expense rejection bodies", async () => {
    vi.spyOn(expensesListService, "rejectExpense").mockResolvedValue(
      {} as never,
    );
    useRejectExpense();
    const options = useInvalidatingMutationMock.mock.calls[0][0];

    await options.mutationFn({ expenseId: 32, reject_reason: "Incorrect" });

    expect(options.mutationKey).toEqual(["reject-expense"]);
    expect(options.invalidateQueries).toEqual([["expenses"]]);
    expect(expensesListService.rejectExpense).toHaveBeenCalledWith(32, {
      reject_reason: "Incorrect",
    });
  });

  it("adapts approve-income ids", async () => {
    const serviceMock = vi
      .spyOn(incomeListService, "approveIncome")
      .mockResolvedValue({} as never);
    useApproveIncome();
    const options = useInvalidatingMutationMock.mock.calls[0][0];

    await options.mutationFn(31);

    expect(serviceMock).toHaveBeenCalledWith(31);
  });

  it("adapts approve-expense ids", async () => {
    const serviceMock = vi
      .spyOn(expensesListService, "approveExpense")
      .mockResolvedValue({} as never);
    useApproveExpense();
    const options = useInvalidatingMutationMock.mock.calls[0][0];

    await options.mutationFn(32);

    expect(serviceMock).toHaveBeenCalledWith(32);
  });
});

describe("direct React Query endpoint hooks", () => {
  it.each([
    [useLoginUserEndpoint, undefined, loginService.loginUser],
    [useUserLogout, ["profile"], dashboardService.userLogout],
    [useVerify, ["USER_INFO"], verifyService.verify],
    [useCompleteProfileEndpoint, undefined, profileService.completeProfile],
    [
      useValidateClosingFinancialMonthEndpoint,
      ["validate-closing-financial-month"],
      financialManagementService.validateClosingFinancialMonth,
    ],
  ] as const)(
    "configures direct mutation %s",
    (useHook, mutationKey, mutationFn) => {
      useHook();

      expect(useMutationMock).toHaveBeenCalledWith({
        ...(mutationKey ? { mutationKey } : {}),
        mutationFn,
      });
    },
  );

  it("loads insurance companies with caller enablement and abort support", async () => {
    const serviceMock = vi
      .spyOn(appService, "getInsuranceCompanies")
      .mockResolvedValue({} as never);
    useGetInsuranceCompaniesEndpoint(false);
    const options = useInfiniteListQueryMock.mock.calls[0][0];
    const signal = new AbortController().signal;

    expect(options.queryKey).toEqual(["insurance-companies"]);
    expect(options.enabled).toBe(false);
    await options.queryFn(2, signal, options.queryKey);
    expect(serviceMock).toHaveBeenCalledWith(signal, 2);
  });

  it("loads profile data with default and explicit options", async () => {
    const serviceMock = vi
      .spyOn(dashboardService, "getProfileInfo")
      .mockResolvedValue({} as never);
    useGetProfileInfo();
    let options = useQueryMock.mock.calls[0][0];
    const signal = new AbortController().signal;

    expect(options.queryKey).toEqual(["profile"]);
    expect(options.enabled).toBe(true);
    await options.queryFn({ signal });
    expect(serviceMock).toHaveBeenLastCalledWith({
      signal,
      redirectOnUnauthorized: true,
    });

    useGetProfileInfo({ enabled: false, redirectOnUnauthorized: false });
    options = useQueryMock.mock.calls[1][0];
    expect(options.enabled).toBe(false);
    await options.queryFn({ signal });
    expect(serviceMock).toHaveBeenLastCalledWith({
      signal,
      redirectOnUnauthorized: false,
    });
  });

  it.each([
    [
      "karboom requests",
      useGetKarboomRequests,
      ["requests"],
      dashboardService,
      "getKarboomRequests",
    ],
    [
      "karbooms",
      useGetKarboomsEndpoint,
      ["karbooms"],
      karboomService,
      "getKarbooms",
    ],
  ] as const)(
    "loads %s with abort support",
    async (_name, useHook, queryKey, service, method) => {
      const serviceMock =
        method === "getKarboomRequests"
          ? vi
              .spyOn(dashboardService, "getKarboomRequests")
              .mockResolvedValue({} as never)
          : vi
              .spyOn(karboomService, "getKarbooms")
              .mockResolvedValue({} as never);
      useHook();
      const options = useInfiniteListQueryMock.mock.calls[0][0];
      const signal = new AbortController().signal;

      expect(options.queryKey).toEqual(queryKey);
      await options.queryFn(2, signal, options.queryKey);
      expect(serviceMock).toHaveBeenCalledWith(signal, 2);
    },
  );

  it("loads expense categories from the query key", async () => {
    const serviceMock = vi
      .spyOn(karboomService, "getExpensesCategories")
      .mockResolvedValue({} as never);
    useGetExpensesCategoriesEndpoint("repair");
    const options = useInfiniteListQueryMock.mock.calls[0][0];
    const signal = new AbortController().signal;

    expect(options.queryKey).toEqual(["expenses-categories", "repair"]);
    await options.queryFn(2, signal, options.queryKey);
    expect(serviceMock).toHaveBeenCalledWith("repair", signal, 2);
  });

  it.each([
    [12, true, true],
    [0, true, false],
    [12, false, false],
  ] as const)(
    "guards members query id=%s enabled=%s",
    async (karboomId, enabled, expectedEnabled) => {
      const serviceMock = vi
        .spyOn(karboomService, "getMembers")
        .mockResolvedValue({} as never);
      useGetMembersEndpoint(karboomId, enabled);
      const options = useInfiniteListQueryMock.mock.calls[0][0];
      const signal = new AbortController().signal;

      expect(options.queryKey).toEqual(["members", karboomId]);
      expect(options.enabled).toBe(expectedEnabled);
      await options.queryFn(2, signal, options.queryKey);
      expect(serviceMock).toHaveBeenCalledWith(karboomId, signal, 2);
      vi.clearAllMocks();
    },
  );

  it.each([
    [12, true, true],
    [0, true, false],
    [12, false, false],
  ] as const)(
    "guards partners query id=%s enabled=%s",
    async (karboomId, enabled, expectedEnabled) => {
      const serviceMock = vi
        .spyOn(partnersListService, "getPartners")
        .mockResolvedValue({} as never);
      const queryParams = { karboom_id: karboomId };
      useGetPartnersEndpoint(queryParams, enabled);
      const options = useInfiniteListQueryMock.mock.calls[0][0];
      const signal = new AbortController().signal;

      expect(options.queryKey).toEqual(["partners", queryParams]);
      expect(options.enabled).toBe(expectedEnabled);
      await options.queryFn(2, signal, options.queryKey);
      expect(serviceMock).toHaveBeenCalledWith(queryParams, signal, 2);
      vi.clearAllMocks();
    },
  );
});
