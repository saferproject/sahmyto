import { WalletAdd1 } from "iconsax-reactjs";
import SearchInputComponent from "../../_components/search-input-component";

export default function IncomesListHeaderLayout() {
  return (
    <>
      <div className="flex items-center gap-2">
        <WalletAdd1 size={32} className="text-primary" />
        <h2 className="text-body w-full text-right text-xl font-semibold">
          لیست درآمد ها
        </h2>
      </div>
      <div className="mt-2 w-full">
        <SearchInputComponent />
      </div>
    </>
  );
}
