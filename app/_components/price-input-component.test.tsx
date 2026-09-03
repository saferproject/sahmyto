// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({ default: "img" }));
vi.mock("@mui/material", () => ({
  TextField: ({ helperText }: { helperText: React.ReactNode }) => (
    <div>{helperText}</div>
  ),
}));

import PriceInputComponent from "./price-input-component";

const register = {
  name: "fixed_amount",
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn(),
};

afterEach(cleanup);

describe("PriceInputComponent", () => {
  it("shows an API error when the value is empty", () => {
    render(
      <PriceInputComponent
        register={register}
        value=""
        label="Fixed amount"
        error
        helperText="Fixed amount must be at least 1"
      />,
    );

    expect(screen.getByText("Fixed amount must be at least 1")).toBeTruthy();
  });

  it("shows an API error when the value is zero", () => {
    render(
      <PriceInputComponent
        register={register}
        value="0"
        label="Fixed amount"
        error
        helperText="Fixed amount must be at least 1"
      />,
    );

    expect(screen.getByText("Fixed amount must be at least 1")).toBeTruthy();
  });
});
