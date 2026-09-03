import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { useEffect, useState } from "react";
import useGetDriversEndpoint from "../drivers-list/_hooks/use-get-karboom-drivers-endpoint";
import { FormStates } from "../../_types/form-states";
import { Driver } from "../drivers-list/_types/driver";
import { DriverListDrawerProps } from "../_types/driver-list-drawer-props";
import QueryState from "@/app/_components/query-state";
import DriversListComponent from "../drivers-list/_components/drivers-list-component";
import DriverFormDrawerComponent from "./driver-form-drawer-component";
import ListFooterLayout from "../_layouts/list-footer-layout";
import { Button } from "@mui/material";
import FormDrawerComponent from "@/app/_components/form-drawer-component";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function DriverListDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: DriverListDrawerProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const karboomId = useKarboomsStore((state) => state.id);

  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);
  const [driverFormState, setDriverFormState] = useState<FormStates>("ADD");
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetDriversEndpoint(karboomId);

  const handleOpenDriverForm = () => {
    setDriverFormState("ADD");
    setSelectedDriver(undefined);
    setDriverFormDrawerOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setDriverFormState("EDIT");
    setSelectedDriver(driver);
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverForm = () => {
    setDriverFormDrawerOpen(false);
    setDriverFormState("ADD");
    setSelectedDriver(undefined);
  };

  useEffect(() => {
    if (!karboomId) {
      enqueueSnackbar({
        variant: "warning",
        message: "کاربومی انتخاب نشده است",
      });
      router.replace("/dashboard/karbooms");
    }
  }, [karboomId, enqueueSnackbar, router]);

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body text-lg font-bold">لیست رانندگان</h4>
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!data?.data.length}
      >
        <DriversListComponent
          drivers={data?.data ?? []}
          onEdit={handleEditDriver}
        />
        <InfiniteScrollTrigger
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </QueryState>
      <DriverFormDrawerComponent
        formState={driverFormState}
        driver={selectedDriver}
        isOpen={isDriverFormDrawerOpen}
        onOpen={handleOpenDriverForm}
        onClose={handleCloseDriverForm}
        onSuccess={handleCloseDriverForm}
      />
      <ListFooterLayout onAdd={handleOpenDriverForm} />
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{
          marginTop: "8px",
        }}
        fullWidth
      >
        پایان
      </Button>
    </FormDrawerComponent>
  );
}
