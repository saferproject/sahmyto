// @vitest-environment jsdom

import type { PropsWithChildren } from "react";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { createStore } from "zustand/vanilla";

import { createStoreContext } from "./create-store-context";

interface CounterStore {
  count: number;
  increment: () => void;
}

afterEach(cleanup);

describe("createStoreContext", () => {
  it("creates an isolated provider and selector hook", () => {
    const createCounterStore = () =>
      createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }));
    const [CounterProvider, useCounterStore] = createStoreContext(
      createCounterStore,
      "useCounterStore",
    );
    const wrapper = ({ children }: PropsWithChildren) => (
      <CounterProvider>{children}</CounterProvider>
    );
    const { result } = renderHook(
      () => ({
        count: useCounterStore((state) => state.count),
        increment: useCounterStore((state) => state.increment),
      }),
      { wrapper },
    );

    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it("throws a useful error outside its provider", () => {
    const [, useMissingStore] = createStoreContext(
      () => createStore<{ value: number }>()(() => ({ value: 1 })),
      "useMissingStore",
    );

    expect(() =>
      renderHook(() => useMissingStore((state) => state.value)),
    ).toThrow("useMissingStore must be used within its store provider");
  });
});
