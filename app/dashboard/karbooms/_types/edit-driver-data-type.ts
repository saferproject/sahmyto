import AddDriverDataType from "./add-driver-data-type";

type EditDriverDataType = Omit<AddDriverDataType, "karboom_id"> & {
  driver_id: number;
};

export default EditDriverDataType;
