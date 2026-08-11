import FormDrawerComponent from "@/app/_components/form-drawer-component";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";
import formatNumber from "@/app/_utilities/format-numbers";
import { useSettlementStore } from "../_providers/settlement-store-provider";
import { SettlementDetailsDrawerProps } from "../_types/settlement-details-drawer-props";

export default function SettlementDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
}: SettlementDetailsDrawerProps) {
  const clearSettlement = useSettlementStore((state) => state.clearSettlement);

  const handleClose = () => {
    clearSettlement();
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
      <h4 className="text-body mt-4 font-semibold">ریز حساب</h4>
      <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
        <DetailItemComponent
          label="سهم از سود یا زیان"
          value={formatNumber(14_500_000)}
        />
        <DetailItemComponent
          label="هزینه های انجام شده"
          value={formatNumber(56_000_000)}
        />
        <DetailItemComponent
          label="درآمد های دریافت شده"
          value={formatNumber(140_000_000)}
        />
        <DetailItemComponent
          label="دریافتی ها از دیگران"
          value={formatNumber(0)}
        />
        <DetailItemComponent
          label="پرداختی به دیگران"
          value={formatNumber(45_000_000)}
        />
        <DetailItemComponent label="حقوق و حق سرویس" value={formatNumber(0)} />
        <DetailItemComponent label="جمع کل" value={formatNumber(94_000_000)} />
      </ul>
    </FormDrawerComponent>
  );
}
