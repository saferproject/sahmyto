import { afterEach, describe, expect, it, vi } from "vitest";

import { clearAuthSession, markAuthSession } from "./auth-session";
import {
  clearPendingOtp,
  hasActivePendingOtp,
  readPendingOtp,
  savePendingOtp,
} from "@/app/login/verify/_utilities/pending-otp-storage";
import {
  OTP_RESEND_COOLDOWN_MS,
  PENDING_OTP_STORAGE_KEY,
} from "@/app/login/verify/_constants/pending-otp";
import convertDataURLtoFile from "@/app/dashboard/profile/profile-picture/_utilities/convert-dataURL-to-file";
import convertFileToDataURL from "@/app/dashboard/profile/profile-picture/_utilities/convert-file-to-dataURL";
import { cropImage } from "@/app/dashboard/profile/profile-picture/_utilities/crop-image";

function createStorage() {
  const values = new Map<string, string>();

  return {
    values,
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    removeItem: vi.fn((key: string) => values.delete(key)),
  };
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("authentication session cookie", () => {
  it("marks and clears the non-sensitive middleware session flag", () => {
    vi.stubGlobal("document", { cookie: "" });

    markAuthSession();
    expect(document.cookie).toContain("sahmyto_auth=1");
    expect(document.cookie).toContain("max-age=2592000");

    clearAuthSession();
    expect(document.cookie).toContain("sahmyto_auth=");
    expect(document.cookie).toContain("max-age=0");
  });
});

describe("pending OTP storage", () => {
  it("saves, reads, and checks a pending OTP during its cooldown", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const localStorage = createStorage();
    vi.stubGlobal("window", { localStorage });

    const pending = savePendingOtp("09123456789");

    expect(pending).toEqual({
      phone: "09123456789",
      expiresAt: Date.now() + OTP_RESEND_COOLDOWN_MS,
    });
    expect(readPendingOtp()).toEqual(pending);
    expect(hasActivePendingOtp("09123456789")).toBe(true);
    expect(hasActivePendingOtp("09999999999")).toBe(false);

    vi.advanceTimersByTime(OTP_RESEND_COOLDOWN_MS + 1);
    expect(hasActivePendingOtp("09123456789")).toBe(false);
  });

  it.each([
    "not-json",
    JSON.stringify({ phone: "", expiresAt: 10 }),
    JSON.stringify({ phone: "09123456789", expiresAt: -1 }),
    JSON.stringify({ phone: "09123456789", expiresAt: "later" }),
  ])("discards invalid stored state", (storedValue) => {
    const localStorage = createStorage();
    localStorage.values.set(PENDING_OTP_STORAGE_KEY, storedValue);
    vi.stubGlobal("window", { localStorage });

    expect(readPendingOtp()).toBeNull();
    if (storedValue !== "not-json") {
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        PENDING_OTP_STORAGE_KEY,
      );
    }
  });

  it("clears pending state and tolerates unavailable storage", () => {
    const localStorage = createStorage();
    vi.stubGlobal("window", { localStorage });

    clearPendingOtp();
    expect(localStorage.removeItem).toHaveBeenCalledWith(
      PENDING_OTP_STORAGE_KEY,
    );

    localStorage.getItem.mockImplementation(() => {
      throw new Error("storage blocked");
    });
    expect(readPendingOtp()).toBeNull();
  });
});

describe("profile image conversion", () => {
  it("converts a base64 data URL into a typed file", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    const file = convertDataURLtoFile(
      "data:text/plain;base64,SGVsbG8=",
      "hello.txt",
    );

    expect(file.name).toBe("hello.txt");
    expect(file.type).toBe("text/plain");
    expect(file.lastModified).toBe(Date.now());
    await expect(file.text()).resolves.toBe("Hello");
  });

  it("rejects malformed data URLs", () => {
    expect(() => convertDataURLtoFile("not-a-data-url", "file.txt")).toThrow(
      "Invalid data URL format",
    );
  });

  it("creates object URLs only for image files", () => {
    const createObjectURL = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:avatar");
    const image = new File(["image"], "avatar.png", { type: "image/png" });
    const text = new File(["text"], "notes.txt", { type: "text/plain" });

    expect(convertFileToDataURL(image)).toBe("blob:avatar");
    expect(convertFileToDataURL(text)).toBe("");
    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(createObjectURL).toHaveBeenCalledWith(image);
  });
});

describe("cropImage", () => {
  it("draws the selected area and exports it as JPEG", async () => {
    const drawImage = vi.fn();
    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => ({ drawImage })),
      toDataURL: vi.fn(() => "data:image/jpeg;base64,cropped"),
    };
    vi.stubGlobal("document", {
      createElement: vi.fn(() => canvas),
    });
    class MockImage {
      onload: (() => void) | null = null;
      onerror: ((error: unknown) => void) | null = null;
      crossOrigin = "";

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }
    }
    vi.stubGlobal("Image", MockImage);

    const result = await cropImage("blob:source", {
      x: 10,
      y: 20,
      width: 100,
      height: 80,
    });

    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(80);
    expect(drawImage).toHaveBeenCalledWith(
      expect.any(MockImage),
      10,
      20,
      100,
      80,
      0,
      0,
      100,
      80,
    );
    expect(canvas.toDataURL).toHaveBeenCalledWith("image/jpeg", 1);
    expect(result).toBe("data:image/jpeg;base64,cropped");
  });

  it("fails clearly when a canvas context is unavailable", async () => {
    vi.stubGlobal("document", {
      createElement: vi.fn(() => ({ getContext: () => null })),
    });
    class MockImage {
      onload: (() => void) | null = null;
      onerror: ((error: unknown) => void) | null = null;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }
    }
    vi.stubGlobal("Image", MockImage);

    await expect(
      cropImage("blob:source", { x: 0, y: 0, width: 1, height: 1 }),
    ).rejects.toThrow("Canvas context not found");
  });
});
