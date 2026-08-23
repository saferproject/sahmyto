import { Children } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const routerPushMock = vi.hoisted(() => vi.fn());
const fetchQueryMock = vi.hoisted(() => vi.fn());
const enqueueSnackbarMock = vi.hoisted(() => vi.fn());
const setDialogMock = vi.hoisted(() => vi.fn());
const resetDialogMock = vi.hoisted(() => vi.fn());
const userState = vi.hoisted(() => ({ id: 7 }));
const karboomState = vi.hoisted(() => ({ roles: [] as string[] }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerPushMock }),
}));
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ fetchQuery: fetchQueryMock }),
}));
vi.mock("notistack", () => ({
  useSnackbar: () => ({ enqueueSnackbar: enqueueSnackbarMock }),
}));
vi.mock("@/app/dashboard/_providers/action-dialog-provider", () => ({
  useActionDialogStore: (selector: (state: unknown) => unknown) =>
    selector({ setDialog: setDialogMock, resetDialog: resetDialogMock }),
}));
vi.mock("@/app/_providers/user-info-provider", () => ({
  useUserInfoStore: (selector: (state: unknown) => unknown) =>
    selector(userState),
}));
vi.mock("../_providers/karbooms-store-provider", () => ({
  useKarboomsStore: (selector: (state: unknown) => unknown) =>
    selector(karboomState),
}));
vi.mock("@/app/_services/http", () => ({
  http: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));
vi.mock("@mui/material", () => ({ Button: "button" }));
vi.mock("iconsax-reactjs", () => ({ Profile2User: "span" }));

import { karboomService } from "../_services/karboom-service";
import useCanApprove from "./use-can-approve";
import useRequireKarboomMembers from "./use-require-karboom-members";

beforeEach(() => {
  vi.clearAllMocks();
  userState.id = 7;
  karboomState.roles = [];
});

describe("useCanApprove", () => {
  it("allows a partner to approve a pending item once", () => {
    karboomState.roles = ["partner"];

    expect(useCanApprove([], "pending")).toBe(true);
    expect(
      useCanApprove(
        [
          {
            user: { id: 7 },
            status: "approved",
          } as never,
        ],
        "pending",
      ),
    ).toBe(false);
  });

  it.each([
    [[], "approved"],
    [["driver"], "pending"],
    [[], "rejected"],
  ] as const)("rejects roles=%s status=%s", (roles, status) => {
    karboomState.roles = [...roles];

    expect(useCanApprove([], status)).toBe(false);
  });

  it("ignores the current user's still-pending approval record", () => {
    karboomState.roles = ["partner"];

    expect(
      useCanApprove(
        [{ user: { id: 7 }, status: "pending" } as never],
        "pending",
      ),
    ).toBe(true);
  });
});

describe("useRequireKarboomMembers", () => {
  it.each([null, undefined, 0, -1, 1.5])(
    "ignores invalid karboom id %s",
    async (id) => {
      await useRequireKarboomMembers()(id, vi.fn());

      expect(fetchQueryMock).not.toHaveBeenCalled();
    },
  );

  it("runs the guarded action when members exist", async () => {
    const response = { data: [{ member: { id: 1 } }], message: "ok" };
    fetchQueryMock.mockImplementation(async (options) => {
      const signal = new AbortController().signal;
      vi.spyOn(karboomService, "getMembers").mockResolvedValue(
        response as never,
      );
      await options.queryFn({ signal });
      return response;
    });
    const onHasMembers = vi.fn();

    await useRequireKarboomMembers()(12, onHasMembers);

    expect(fetchQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ["members", 12], staleTime: 0 }),
    );
    expect(karboomService.getMembers).toHaveBeenCalledWith(
      12,
      expect.any(AbortSignal),
    );
    expect(onHasMembers).toHaveBeenCalledOnce();
    expect(setDialogMock).not.toHaveBeenCalled();
  });

  it("offers partner and driver routes when no members exist", async () => {
    fetchQueryMock.mockResolvedValue({ data: [], message: "ok" });

    await useRequireKarboomMembers()(12, vi.fn());

    expect(setDialogMock).toHaveBeenCalledOnce();
    const dialog = setDialogMock.mock.calls[0][0];
    expect(dialog).toEqual(
      expect.objectContaining({ isOpen: true, persistant: false }),
    );

    const buttons = Children.toArray(dialog.actionButtons.props.children) as {
      props: { onClick: () => void };
    }[];
    buttons[0].props.onClick();
    expect(resetDialogMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith(
      "/dashboard/karbooms/partners-list",
    );

    buttons[1].props.onClick();
    expect(routerPushMock).toHaveBeenCalledWith(
      "/dashboard/karbooms/drivers-list",
    );

    dialog.onClose();
    expect(resetDialogMock).toHaveBeenCalledTimes(3);
  });

  it("reports member lookup failures", async () => {
    fetchQueryMock.mockRejectedValue(new Error("offline"));
    const onHasMembers = vi.fn();

    await useRequireKarboomMembers()(12, onHasMembers);

    expect(onHasMembers).not.toHaveBeenCalled();
    expect(enqueueSnackbarMock).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "error" }),
    );
  });
});
