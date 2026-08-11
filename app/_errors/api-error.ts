import type { ApiFieldErrors } from "../_interfaces/base-response";

type ApiErrorOptions = {
  status: number;
  message: string;
  errors?: ApiFieldErrors;
};

export default class ApiError extends Error {
  readonly status: number;
  readonly errors?: ApiFieldErrors;

  constructor({ status, message, errors }: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}
