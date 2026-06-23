import { useRouter } from "next/navigation";

import { Button, Fab } from "@mui/material";
import { Add } from "iconsax-reactjs";

import { IncomeListFooterProps } from "../_types/income-list-footer-props";

export default function IncomesListFooterLayout({ onAddIncome }: IncomeListFooterProps) {
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
        onClick={onAddIncome}
      >
        <Add size={32} className="text-white" />
      </Fab>
    </div>
  );
}