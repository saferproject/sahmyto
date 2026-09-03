// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import KarboomsPageContent from "./karbooms-page-content";

const karboomsStore = {
  isActionsDrawerOpen: false,
  openKarboomActionDrawer: vi.fn(),
  closeKarboomActionDrawer: vi.fn(),
};

vi.mock("../_providers/karbooms-store-provider", () => ({
  useKarboomsStore: (selector: (state: typeof karboomsStore) => unknown) =>
    selector(karboomsStore),
}));

vi.mock("./karbooms-component", () => ({
  default: ({ onAddKarboom }: { onAddKarboom: () => void }) => (
    <button type="button" onClick={onAddKarboom}>
      add-karboom
    </button>
  ),
}));

vi.mock("./karboom-form-drawer-component", () => ({
  default: ({
    isOpen,
    onSuccess,
  }: {
    isOpen: boolean;
    onSuccess: () => void;
  }) => (
    <div data-testid="karboom-drawer" data-open={isOpen}>
      <button type="button" onClick={onSuccess}>
        create-karboom
      </button>
    </div>
  ),
}));

vi.mock("./partner-list-drawer-component", () => ({
  default: ({ isOpen, onSkip }: { isOpen: boolean; onSkip: () => void }) => (
    <div data-testid="partner-list-drawer" data-open={isOpen}>
      <button type="button" onClick={onSkip}>
        skip-partners
      </button>
    </div>
  ),
}));

vi.mock("./driver-list-drawer-component", () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div data-testid="driver-list-drawer" data-open={isOpen}>
      <button type="button" onClick={onClose}>
        finish-drivers
      </button>
    </div>
  ),
}));

describe("KarboomsPageContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("follows the header creation flow from karboom to partner and driver lists", async () => {
    render(<KarboomsPageContent />);

    fireEvent.click(screen.getByRole("button", { name: "add-karboom" }));

    const karboomDrawer = await screen.findByTestId("karboom-drawer");
    expect(karboomDrawer.dataset.open).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "create-karboom" }));

    const partnerListDrawer = await screen.findByTestId("partner-list-drawer");
    await waitFor(() => {
      expect(karboomDrawer.dataset.open).toBe("false");
      expect(partnerListDrawer.dataset.open).toBe("true");
    });

    fireEvent.click(screen.getByRole("button", { name: "skip-partners" }));

    const driverListDrawer = await screen.findByTestId("driver-list-drawer");
    await waitFor(() => {
      expect(partnerListDrawer.dataset.open).toBe("false");
      expect(driverListDrawer.dataset.open).toBe("true");
    });

    fireEvent.click(screen.getByRole("button", { name: "finish-drivers" }));

    await waitFor(() => {
      expect(driverListDrawer.dataset.open).toBe("false");
    });
  });
});
