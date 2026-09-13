import { Suspense } from "react";
import KarboomsPageContent from "./_components/karbooms-page-content";
import KarboomListSkeleton from "./_components/karboom-list-skeleton";
import ListHeaderLayout from "./_layouts/list-header-layout";
import { KARBOOM_FILTERS } from "./_constants/karboom-filters";

export default function KarboomsPage() {
  return (
    <>
      <ListHeaderLayout
        title="لیست کاربوم ها"
        filters={KARBOOM_FILTERS}
        hideBackButton
      />
      <Suspense fallback={<KarboomListSkeleton />}>
        <KarboomsPageContent />
      </Suspense>
    </>
  );
}
