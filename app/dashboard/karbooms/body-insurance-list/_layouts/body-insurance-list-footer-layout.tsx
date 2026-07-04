import { Button, Fab } from "@mui/material";
import { Add } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { BodyInsuranceListFooterProps } from "../_types/body-insurance-list-footer-props";

export default function BodyInsuranceListFooterLayout({
  onAddBodyInsurance,
}: BodyInsuranceListFooterProps) {
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
        onClick={onAddBodyInsurance}
      >
        <Add size={32} className="text-white" />
      </Fab>
    </div>
  );
}