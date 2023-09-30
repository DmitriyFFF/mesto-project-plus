import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  REQUEST_CONFLICT,
  UNAUTHORIZED,
} from './constants';

export default class ErrorApi extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequestError(message: string) {
    return new ErrorApi(BAD_REQUEST, message);
  }

  static unauthorizedError(message: string) {
    return new ErrorApi(UNAUTHORIZED, message);
  }

  static notFoundError(message: string) {
    return new ErrorApi(NOT_FOUND, message);
  }

  static reqConflictError(message: string) {
    return new ErrorApi(REQUEST_CONFLICT, message);
  }

  static serverError(message: string) {
    return new ErrorApi(INTERNAL_SERVER_ERROR, message);
  }
}
