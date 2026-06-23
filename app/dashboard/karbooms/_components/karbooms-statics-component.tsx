import StaticComponent from "./static-component";

export default function KarboomsStatics() {
  return (
    <div className="flex w-full items-center p-4">
      <p className="text-heading flex w-1/3 items-center justify-center text-2xl font-bold">
        <span className="text-sm">%</span>
        {"83"}
      </p>
      <div className="flex w-2/3 flex-col justify-between gap-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xs">رشد درآمد امروز</h2>
          <p
            dir="ltr"
            className="text-heading font-bold"
          >
            {"14"}%
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <StaticComponent title="امروز" value={100_026_970} />
          <StaticComponent title="دیروز" value={89_026_970} />
        </div>
      </div>
    </div>
  );
}
