import {
  OTP_RESEND_COOLDOWN_MS,
  PENDING_OTP_STORAGE_KEY,
} from "../_constants/pending-otp";
import PendingOtp from "../_interfaces/pending-otp";

const isPendingOtp = (value: unknown): value is PendingOtp => {
  if (!value || typeof value !== "object") return false;

  const pendingOtp = value as Partial<PendingOtp>;

  return (
    typeof pendingOtp.phone === "string" &&
    pendingOtp.phone.trim().length > 0 &&
    typeof pendingOtp.expiresAt === "number" &&
    Number.isFinite(pendingOtp.expiresAt) &&
    pendingOtp.expiresAt >= 0
  );
};

const removePendingOtp = () => {
  try {
    window.localStorage.removeItem(PENDING_OTP_STORAGE_KEY);
  } catch {}
};

export const readPendingOtp = (): PendingOtp | null => {
  try {
    const storedValue = window.localStorage.getItem(PENDING_OTP_STORAGE_KEY);

    if (!storedValue) return null;

    const pendingOtp: unknown = JSON.parse(storedValue);

    if (isPendingOtp(pendingOtp)) return pendingOtp;

    removePendingOtp();
  } catch {}

  return null;
};

export const savePendingOtp = (phone: string): PendingOtp => {
  const pendingOtp: PendingOtp = {
    phone,
    expiresAt: Date.now() + OTP_RESEND_COOLDOWN_MS,
  };

  window.localStorage.setItem(
    PENDING_OTP_STORAGE_KEY,
    JSON.stringify(pendingOtp),
  );

  return pendingOtp;
};

export const hasActivePendingOtp = (phone: string) => {
  const pendingOtp = readPendingOtp();

  return pendingOtp?.phone === phone && pendingOtp.expiresAt > Date.now();
};

export const clearPendingOtp = () => {
  removePendingOtp();
};
