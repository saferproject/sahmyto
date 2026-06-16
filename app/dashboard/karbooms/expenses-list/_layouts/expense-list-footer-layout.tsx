import { useRouter } from "next/navigation";

import { Button, Fab } from "@mui/material";

import { ExpensesListFooterProps } from "../_types/expense-list-footer-props";
import { Add } from "iconsax-reactjs";

export default function ExpensesListFooterLayout({ onAddExpense }: ExpensesListFooterProps) {
  const router = useRouter();

  const handleReturn = () => {
    router.push("/dashboard/karbooms");
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 bg-white absolute bottom-0">
      <Button variant="outlined" onClick={handleReturn} fullWidth>
        بازگشت
      </Button>
      <Fab
        sx={{
          position: "fixed",
          bottom: "160px",
          left: "32px",
          zIndex: 10,
        }}
        color="primary"
        onClick={onAddExpense}
      >
        <Add size={32} className="text-white" />
      </Fab>
    </div>
  );
}