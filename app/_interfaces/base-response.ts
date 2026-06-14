// type SuccessResponse<DataType> = {
//   readonly success: true;
//   readonly message: string;
//   data: DataType;
// };

// type ErrorResponse<ErrorType> = {
//   success: false;
//   message: string;
//   error: ErrorType;
// };

// type BaseResponse<DataType = unknown, ErrorType = Record<string, string[]>> =
//   | SuccessResponse<DataType>
//   | Readonly<ErrorResponse<ErrorType>>;

interface BaseResponse<DataType = unknown> {
  readonly message: string;
  data: DataType;
  errors?: Record<string, Array<string>>;
}

export default BaseResponse;
