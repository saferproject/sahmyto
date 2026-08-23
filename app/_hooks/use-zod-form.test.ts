import { beforeEach, describe, expect, it, vi } from "vitest";

const useFormMock = vi.hoisted(() => vi.fn(() => ({ form: true })));
const resolver = vi.hoisted(() => Symbol("resolver"));
const zodResolverMock = vi.hoisted(() => vi.fn(() => resolver));

vi.mock("react-hook-form", () => ({ useForm: useFormMock }));
vi.mock("@hookform/resolvers/zod", () => ({ zodResolver: zodResolverMock }));

import { z } from "@/app/_schemas/zod-mini";
import useZodForm from "./use-zod-form";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useZodForm", () => {
  it("adapts a Zod schema and forwards all form options", () => {
    const schema = z.object({ name: z.string() });
    const defaultValues = { name: "Fleet" };

    const result = useZodForm({
      schema,
      defaultValues,
      mode: "onBlur",
      reValidateMode: "onSubmit",
    });

    expect(zodResolverMock).toHaveBeenCalledWith(schema);
    expect(useFormMock).toHaveBeenCalledWith({
      resolver,
      defaultValues,
      mode: "onBlur",
      reValidateMode: "onSubmit",
    });
    expect(result).toEqual({ form: true });
  });
});
