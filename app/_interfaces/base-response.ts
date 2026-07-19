interface BaseResponse<DataType = unknown> {
  readonly message: string;
  data: DataType;
  errors?: Record<string, Array<string>>;
}

export default BaseResponse;
