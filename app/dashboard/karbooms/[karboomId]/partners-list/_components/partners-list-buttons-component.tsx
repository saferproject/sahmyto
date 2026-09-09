"use client";

import { useRouter } from "next/navigation";

import { Button, Fab } from "@mui/material";
import { PartnersListButtonsProps } from "../_types/partners-list-buttons-props";
import { Add } from "iconsax-reactjs";

export default function PartnersListButtonsComponent({
  onAddPartner,
}: PartnersListButtonsProps) {
  const router = useRouter();

  const handleReturn = () => {
    router.push("/dashboard/karbooms");
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 bg-white">
      <Button variant="outlined" onClick={handleReturn} fullWidth>
        بازگشت
      </Button>
      <Fab
        sx={{
          position: "fixed",
          bottom: "calc(160px + env(safe-area-inset-bottom))",
          left: "32px",
          zIndex: 10,
        }}
        color="primary"
        onClick={onAddPartner}
      >
        <Add size={32} className="text-white" />
      </Fab>
    </div>
  );
}
