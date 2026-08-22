import SearchInputComponent from "../../_components/search-input-component";

export default function ThirdPartyInsuranceListHeaderLayout() {
  return (
    <div className="mt-2 flex w-full flex-col gap-4">
      <h3 className="text-body w-full text-center text-lg font-bold">
        بیمه شخص ثالث
      </h3>
      <SearchInputComponent />
    </div>
  );
}
