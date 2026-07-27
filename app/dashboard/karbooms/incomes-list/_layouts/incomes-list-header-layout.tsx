import { WalletAdd1 } from "iconsax-reactjs";
import SearchInputComponent from "../../_components/search-input-component";

export default function IncomesListHeaderLayout() {
  return (
    <>
      <h2 className="text-body text-center text-lg font-semibold">
        لیست درآمد ها
      </h2>
      <div className="w-full">
        <SearchInputComponent />
      </div>
    </>
  );
}
