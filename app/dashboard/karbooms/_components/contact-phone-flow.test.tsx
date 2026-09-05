// @vitest-environment jsdom

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

const mocks = vi.hoisted(() => ({
  addContact: vi.fn(),
  contacts: {
    isSuccess: true,
    data: {
      data: [] as {
        id: number;
        phone: string;
        first_name: string;
        last_name: string;
      }[],
    },
    hasNextPage: false,
    fetchNextPage: vi.fn(),
  },
  user: { phone: "09111111111", first_name: "Current", last_name: "User" },
}));

vi.mock("@/app/_providers/user-info-provider", () => ({
  useUserInfoStore: (selector: (state: typeof mocks.user) => unknown) =>
    selector(mocks.user),
}));
vi.mock("../_providers/karbooms-store-provider", () => ({
  useKarboomsStore: (selector: (state: { id: number }) => unknown) =>
    selector({ id: 12 }),
}));
vi.mock("../../contacts/_hooks/use-get-contacts", () => ({
  default: () => mocks.contacts,
}));
vi.mock("../../contacts/_hooks/use-add-contact", () => ({
  default: () => ({ mutate: mocks.addContact, isPending: false }),
}));
vi.mock("../../contacts/_hooks/use-edit-contact", () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));
vi.mock("../_hooks/use-add-driver-endpoint", () => ({
  default: () => ({ mutate: vi.fn() }),
}));
vi.mock("../_hooks/use-edit-driver-endpoint", () => ({
  default: () => ({ mutate: vi.fn() }),
}));
vi.mock("../_hooks/use-add-partner-endpoint", () => ({
  default: () => ({ mutate: vi.fn() }),
}));
vi.mock("../_hooks/use-edit-partner-endpoint", () => ({
  default: () => ({ mutate: vi.fn() }),
}));
vi.mock("./contact-list-drawer-component", () => ({ default: () => null }));
vi.mock("@/app/_components/form-drawer-with-title-component", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div role="dialog">{children}</div>
  ),
}));
vi.mock("@/app/_components/date-picker-component", () => ({
  default: () => null,
}));

import DriverFormComponent from "./driver-form-component";
import PartnerFormComponent from "./partner-form-component";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.contacts.isSuccess = true;
  mocks.contacts.hasNextPage = false;
  mocks.contacts.data = { data: [] };
});
afterEach(cleanup);

describe.each([
  ["driver", DriverFormComponent],
  ["partner", PartnerFormComponent],
] as const)("%s phone lookup", (_name, Component) => {
  function setup() {
    const { container } = render(
      <Component formState="ADD" onCancel={vi.fn()} onSuccess={vi.fn()} />,
    );
    const form = container.querySelector("form")!;
    const phone = form.querySelector<HTMLInputElement>('[name="phone"]')!;
    const firstName = form.querySelector<HTMLInputElement>(
      '[name="first_name"]',
    )!;
    const lastName =
      form.querySelector<HTMLInputElement>('[name="last_name"]')!;
    return { form, phone, firstName, lastName };
  }

  it("uses the current user's identity even while contacts are loading", async () => {
    mocks.contacts.isSuccess = false;
    const { phone, firstName, lastName } = setup();
    for (let length = 1; length <= mocks.user.phone.length; length++) {
      fireEvent.change(phone, {
        target: { value: mocks.user.phone.slice(0, length) },
      });
    }
    await waitFor(() => expect(firstName.value).toBe("Current"));
    expect(lastName.value).toBe("User");
    expect(mocks.contacts.fetchNextPage).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.change(phone, { target: { value: "091" } });
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
  });

  it("finds an existing contact on a later page", async () => {
    mocks.contacts.hasNextPage = true;
    mocks.contacts.fetchNextPage.mockResolvedValue({
      isSuccess: true,
      hasNextPage: false,
      data: {
        data: [
          {
            id: 2,
            phone: "09222222222",
            first_name: "Existing",
            last_name: "Contact",
          },
        ],
      },
    });
    const { phone, firstName, lastName } = setup();
    fireEvent.change(phone, { target: { value: "09222222222" } });
    await waitFor(() => expect(firstName.value).toBe("Existing"));
    expect(lastName.value).toBe("Contact");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("prefills registration and copies identity only after a successful save", async () => {
    const { form, phone, firstName, lastName } = setup();
    const description = form.querySelector<HTMLTextAreaElement>(
      '[name="description"]',
    )!;
    fireEvent.change(description, {
      target: { value: "Keep this description" },
    });
    fireEvent.change(phone, { target: { value: "09333333333" } });
    const dialog = await screen.findByRole("dialog");
    expect(
      dialog.querySelector<HTMLInputElement>('[name="phone"]')!.value,
    ).toBe("09333333333");
    fireEvent.change(dialog.querySelector('[name="first_name"]')!, {
      target: { value: "New" },
    });
    fireEvent.change(dialog.querySelector('[name="last_name"]')!, {
      target: { value: "Contact" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "ثبت" }));
    await waitFor(() => expect(mocks.addContact).toHaveBeenCalledOnce());
    expect(firstName.value).toBe("");
    expect(screen.queryByRole("dialog")).not.toBeNull();
    await act(async () => mocks.addContact.mock.calls[0][1].onSuccess());
    expect(firstName.value).toBe("New");
    expect(lastName.value).toBe("Contact");
    expect(phone.value).toBe("09333333333");
    expect(description.value).toBe("Keep this description");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not register a contact when lookup fails", async () => {
    mocks.contacts.isSuccess = false;
    mocks.contacts.fetchNextPage.mockResolvedValue({ isSuccess: false });
    const { phone } = setup();
    await act(async () =>
      fireEvent.change(phone, { target: { value: "09444444444" } }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("ignores a missing-contact result after the phone changes", async () => {
    mocks.contacts.isSuccess = false;
    let resolveLookup!: (value: unknown) => void;
    mocks.contacts.fetchNextPage.mockReturnValue(
      new Promise((resolve) => {
        resolveLookup = resolve;
      }),
    );
    const { phone } = setup();
    fireEvent.change(phone, { target: { value: "09444444444" } });
    fireEvent.change(phone, { target: { value: "094" } });
    await act(async () =>
      resolveLookup({
        isSuccess: true,
        hasNextPage: false,
        data: { data: [] },
      }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(phone.value).toBe("094");
  });
});
