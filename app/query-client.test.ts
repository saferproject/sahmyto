import { describe, expect, it } from "vitest";

import ApiError from "./_errors/api-error";
import { getErrorMessage, shouldRetryQuery } from "./query-client";

describe("React Query error policy", () => {
  it("prefers a general API field error over the response message", () => {
    const error = new ApiError({
      status: 422,
      message: "Validation failed",
      errors: { error: ["Specific failure"] },
    });

    expect(getErrorMessage(error)).toBe("Specific failure");
  });

  it("uses API messages and a stable fallback for unknown errors", () => {
    expect(
      getErrorMessage(new ApiError({ status: 400, message: "Bad request" })),
    ).toBe("Bad request");
    expect(getErrorMessage(new Error("internal detail"))).not.toBe(
      "internal detail",
    );
    expect(getErrorMessage(new Error("internal detail"))).toBeTruthy();
  });

  it.each([0, 408, 429, 500, 503])(
    "retries transient status %s up to two attempts",
    (status) => {
      const error = new ApiError({ status, message: "temporary" });

      expect(shouldRetryQuery(0, error)).toBe(true);
      expect(shouldRetryQuery(1, error)).toBe(true);
      expect(shouldRetryQuery(2, error)).toBe(false);
    },
  );

  it.each([400, 401, 403, 404, 422])(
    "does not retry permanent status %s",
    (status) => {
      expect(
        shouldRetryQuery(
          0,
          new ApiError({ status, message: "permanent failure" }),
        ),
      ).toBe(false);
    },
  );

  it("does not retry non-API errors", () => {
    expect(shouldRetryQuery(0, new Error("unknown"))).toBe(false);
  });
});
