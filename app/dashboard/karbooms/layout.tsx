import KarboomsLayoutProps from "./_interfaces/karbooms-layout-props";

import { KarboomsStoreProvider } from "./_providers/karbooms-store-provider";

export default function KarboomsLayout({ children }: KarboomsLayoutProps) {
  return <KarboomsStoreProvider>{children}</KarboomsStoreProvider>;
}