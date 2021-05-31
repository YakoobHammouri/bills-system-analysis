// this messagees using as reaponse of fetch , xhr  request
module.exports = {
  successMessage: (Result, message) => ({
    status: 200,
    message,
    Result,
  }),
  faildLoginMessage: (Result, message) => ({
    status: 403,
    message,
    Result,
  }),
  failedMessage: (Result, message) => ({
    status: 400,
    message,
    Result,
  }),

  unauthorizedMessage: (Result, message) => ({
    status: 403,
    message,
    Result,
  }),
  notFoundMessage: (Result, message) => ({
    status: 404,
    message,
    Result,
  }),

  internalErrorMessage: (Result, message) => ({
    status: 501,
    message,
    Result,
  }),
};
