import { DeviceType } from "./device-types";
import { PlatformTypes } from "./platform-types";

export type Session = {
  id: number;
  is_current: boolean;
  is_active: boolean;
  can_terminate: boolean;
  ip_address: string;
  device: {
    name: string;
    type: DeviceType;
    platform: PlatformTypes;
    client_type: string;
    brand: string;
    model: string;
  };
  operating_system: {
    name: string;
    version: string;
  };
  browser: {
    name: string;
    version: string;
  };
  user_agent: string;
  logged_in_at: string;
  last_used_at: string;
  revoked_at: string | null;
  revocation_reason: string | null;
};
