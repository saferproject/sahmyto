import { KarboomsLayoutProps } from "./_types/karbooms-layout-props";

export default function KarboomsLayout({ children }: KarboomsLayoutProps) {
  return (
    <div className="flex size-full min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto pt-26 pb-20">
      {children}
    </div>
  );
}
