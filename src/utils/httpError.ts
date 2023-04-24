import ApiError from './ApiError';

type HttpError = {
  notFound: (message: string) => ApiError;
  badRequest: (message: string) => ApiError;
  unprocessableEntity: (message: string) => ApiError;
  unauthorized: (message: string) => ApiError;
  forbidden: (message: string) => ApiError;
};

const httpError: HttpError = {
  notFound: (message) => new ApiError(404, message),
  badRequest: (message) => new ApiError(400, message),
  unprocessableEntity: (message) => new ApiError(422, message),
  unauthorized: (message) => new ApiError(401, message),
  forbidden: (message) => new ApiError(403, message),
};

export = httpError;