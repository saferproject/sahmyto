import { beforeEach, describe, expect, it, vi } from "vitest";

const useQueryMock = vi.hoisted(() => vi.fn((options) => options));
const useInfiniteQueryMock = vi.hoisted(() => vi.fn((options) => options));
const useMutationMock = vi.hoisted(() => vi.fn((options) => options));
const invalidateQueriesMock = vi.hoisted(() => vi.fn());
const useQueryClientMock = vi.hoisted(() =>
  vi.fn(() => ({ invalidateQueries: invalidateQueriesMock })),
);

vi.mock("@tanstack/react-query", () => ({
  useQuery: useQueryMock,
  useInfiniteQuery: useInfiniteQueryMock,
  useMutation: useMutationMock,
  useQueryClient: useQueryClientMock,
}));

import useInvalidatingMutation from "./use-invalidating-mutation";
import useListQuery from "./use-list-query";
import useInfiniteListQuery from "./use-infinite-list-query";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useListQuery", () => {
  it.each([
    [1, true, true],
    [1, false, false],
    [0, true, false],
    [-1, true, false],
    [1.5, true, false],
    [null, true, false],
    [undefined, true, false],
  ] as const)(
    "derives enabled=%s from id=%s and caller enabled=%s",
    (id, callerEnabled, expected) => {
      useListQuery(["items", id], vi.fn(), id, callerEnabled);

      expect(useQueryMock).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["items", id],
          enabled: expected,
        }),
      );
    },
  );

  it("passes the id from the query key and the abort signal to the service", async () => {
    const response = { data: ["one"], message: "ok" };
    const queryFn = vi.fn().mockResolvedValue(response);
    const signal = new AbortController().signal;
    useListQuery(["items", 17], queryFn, 17);
    const options = useQueryMock.mock.calls[0][0];

    await expect(
      options.queryFn({ queryKey: ["items", 17], signal }),
    ).resolves.toBe(response);
    expect(queryFn).toHaveBeenCalledWith(17, signal);
  });

  it("supports list services that do not require an id", async () => {
    const response = { data: ["one"], message: "ok" };
    const queryFn = vi.fn().mockResolvedValue(response);
    const signal = new AbortController().signal;
    useListQuery(["items"], queryFn);
    const options = useQueryMock.mock.calls[0][0];

    await expect(
      options.queryFn({ queryKey: ["items"], signal }),
    ).resolves.toBe(response);
    expect(queryFn).toHaveBeenCalledWith(signal);
    expect(options.enabled).toBe(true);
  });
});

describe("useInfiniteListQuery", () => {
  it("starts at page one and passes page, signal, and query key to the service", async () => {
    const response = { data: ["one"], message: "ok" };
    const queryFn = vi.fn().mockResolvedValue(response);
    const signal = new AbortController().signal;

    useInfiniteListQuery({ queryKey: ["items", 17], queryFn });
    const options = useInfiniteQueryMock.mock.calls[0][0];

    expect(options.initialPageParam).toBe(1);
    await expect(
      options.queryFn({
        pageParam: 3,
        queryKey: ["items", 17],
        signal,
      }),
    ).resolves.toBe(response);
    expect(queryFn).toHaveBeenCalledWith(3, signal, ["items", 17]);
  });

  it("stops after a short page and advances after a full page", () => {
    useInfiniteListQuery({ queryKey: ["items"], queryFn: vi.fn() });
    const options = useInfiniteQueryMock.mock.calls[0][0];

    expect(
      options.getNextPageParam(
        { data: Array.from({ length: 10 }), message: "ok" },
        [],
        4,
      ),
    ).toBe(5);
    expect(
      options.getNextPageParam(
        { data: Array.from({ length: 9 }), message: "ok" },
        [],
        4,
      ),
    ).toBeUndefined();
    expect(
      options.getNextPageParam({ data: [], message: "ok" }, [], 4),
    ).toBeUndefined();
  });

  it("flattens page data into the existing base response shape", () => {
    useInfiniteListQuery({ queryKey: ["items"], queryFn: vi.fn() });
    const options = useInfiniteQueryMock.mock.calls[0][0];

    expect(
      options.select({
        pages: [
          { data: ["one", "two"], message: "first" },
          { data: ["three"], message: "second" },
        ],
        pageParams: [1, 2],
      }),
    ).toEqual({ data: ["one", "two", "three"], message: "first" });
  });
});

describe("useInvalidatingMutation", () => {
  it("forwards mutation configuration and invalidates every related query", () => {
    const mutationFn = vi.fn();
    useInvalidatingMutation({
      mutationKey: ["create-item"],
      mutationFn,
      invalidateQueries: [["items"], ["summary", 17]],
    });
    const options = useMutationMock.mock.calls[0][0];

    expect(options).toEqual(
      expect.objectContaining({ mutationKey: ["create-item"], mutationFn }),
    );
    options.onSuccess();
    expect(invalidateQueriesMock).toHaveBeenNthCalledWith(1, {
      queryKey: ["items"],
    });
    expect(invalidateQueriesMock).toHaveBeenNthCalledWith(2, {
      queryKey: ["summary", 17],
    });
  });

  it("does not invalidate unrelated queries when no keys are configured", () => {
    useInvalidatingMutation({
      mutationKey: ["standalone"],
      mutationFn: vi.fn(),
    });

    useMutationMock.mock.calls[0][0].onSuccess();

    expect(invalidateQueriesMock).not.toHaveBeenCalled();
  });
});
