// @vitest-environment jsdom

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { http } from "@/app/_services/http";
import ActiveKarboomBoundary from "./active-karboom-boundary";
import {
  KarboomsStoreProvider,
  useKarboomsStore,
} from "../_providers/karbooms-store-provider";
import { KARBOOMS_STORE_DEFAULTS } from "../_constants/karbooms-store-defaults";
import type { KarboomDetails } from "../_types/karboom-details";
import type BaseResponse from "@/app/_interfaces/base-response";

vi.mock("@/app/_services/http", () => ({ http: { get: vi.fn() } }));

const getMock = vi.mocked(http.get);
const renderedIds: number[] = [];

function details(id: number): BaseResponse<KarboomDetails> {
  return {
    message: "ok",
    data: {
      id,
      name: `Karboom ${id}`,
      owner: KARBOOMS_STORE_DEFAULTS.owner,
      roles: ["driver"],
      plate: {
        first_number: 12,
        second_character: "ع",
        third_number: 345,
        fourth_number: 13,
      },
      smart_number: null,
      description: "test",
      image: null,
      status: "active",
    },
  };
}

function StoreReader() {
  const state = useKarboomsStore((state) => state);
  renderedIds.push(state.id);
  return (
    <p data-testid="active-karboom">
      {JSON.stringify({
        id: state.id,
        name: state.name,
        roles: state.roles,
        smart_number: state.smart_number,
        income: state.income,
      })}
    </p>
  );
}

function setup(id = 1) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: Infinity },
    },
  });
  function tree(karboomId: number) {
    return (
      <QueryClientProvider client={client}>
        <KarboomsStoreProvider>
          <ActiveKarboomBoundary key={karboomId} karboomId={karboomId}>
            <StoreReader />
          </ActiveKarboomBoundary>
        </KarboomsStoreProvider>
      </QueryClientProvider>
    );
  }
  const view = render(tree(id));
  return { ...view, navigate: (nextId: number) => view.rerender(tree(nextId)) };
}

beforeEach(() => {
  vi.clearAllMocks();
  renderedIds.length = 0;
});
afterEach(cleanup);

describe("active karboom restoration", () => {
  it("waits for the URL karboom to reach Zustand before mounting consumers on refresh", async () => {
    let resolve!: (response: BaseResponse<KarboomDetails>) => void;
    getMock.mockReturnValue(
      new Promise((done) => {
        resolve = done;
      }),
    );
    setup(12);

    expect(screen.queryByTestId("active-karboom")).toBeNull();
    expect(screen.getByRole("status")).toBeTruthy();
    expect(getMock).toHaveBeenCalledWith("karboom/show/12", {
      signal: expect.any(AbortSignal),
    });

    await act(async () => resolve(details(12)));
    await waitFor(() =>
      expect(screen.getByTestId("active-karboom").textContent).toContain(
        '"id":12',
      ),
    );
    expect(
      JSON.parse(screen.getByTestId("active-karboom").textContent!),
    ).toEqual({
      id: 12,
      name: "Karboom 12",
      roles: ["driver"],
      smart_number: null,
      income: 0,
    });
    expect(renderedIds.every((id) => id === 12)).toBe(true);
  });

  it("replaces another selection and does not render its data under a new URL", async () => {
    getMock.mockResolvedValueOnce(details(1));
    const view = setup();
    await screen.findByTestId("active-karboom");
    renderedIds.length = 0;
    let resolve!: (response: BaseResponse<KarboomDetails>) => void;
    getMock.mockReturnValueOnce(
      new Promise((done) => {
        resolve = done;
      }),
    );
    view.navigate(2);
    expect(screen.queryByTestId("active-karboom")).toBeNull();
    await act(async () => resolve(details(2)));
    await waitFor(() =>
      expect(screen.getByTestId("active-karboom").textContent).toContain(
        '"id":2',
      ),
    );
    expect(renderedIds.every((id) => id === 2)).toBe(true);
  });

  it("ignores a late response for a karboom the user has left", async () => {
    let resolve!: (response: BaseResponse<KarboomDetails>) => void;
    getMock.mockReturnValueOnce(
      new Promise((done) => {
        resolve = done;
      }),
    );
    const view = setup();
    getMock.mockResolvedValueOnce(details(2));
    view.navigate(2);
    await screen.findByTestId("active-karboom");
    await act(async () => resolve(details(1)));
    expect(screen.getByTestId("active-karboom").textContent).toContain(
      '"id":2',
    );
    expect(renderedIds.every((id) => id === 2)).toBe(true);
  });

  it("offers a retry after a failed request and keeps consumers unmounted", async () => {
    getMock.mockRejectedValueOnce(new Error("offline"));
    setup();
    await screen.findByRole("alert");
    expect(screen.queryByTestId("active-karboom")).toBeNull();
    getMock.mockResolvedValueOnce(details(1));
    fireEvent.click(screen.getByRole("button", { name: "تلاش دوباره" }));
    await screen.findByTestId("active-karboom");
    expect(getMock).toHaveBeenCalledTimes(2);
  });

  it("rejects a response for a different karboom", async () => {
    getMock.mockResolvedValueOnce(details(2));
    setup(1);
    await screen.findByRole("alert");
    expect(screen.queryByTestId("active-karboom")).toBeNull();
    expect(renderedIds).toEqual([]);
  });
});
