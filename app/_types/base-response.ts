export type ApiFieldErrors = Record<string, Array<string>>;

type BaseResponse<DataType = unknown> = {
  readonly message: string;
  data: DataType;
  errors?: ApiFieldErrors;
};

export default BaseResponse;
