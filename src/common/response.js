import msg from "./errorMessage.js";

const serverError = (res, error, message = "Something went wrong!") => {
  // Define the status code to send in the response.
  let statusCode = msg.INTERNAL_SERVER_ERROR_CODE;

  const result = {
    success: false,
    message: error.message,
    data: null,
  };

  if (error) {
    // custom message required then change default message to new custom message
    if (error.message) {
      // if only corresponding message exist with that key
      if (msg[error.message]) {
        result.message = msg[error.message];
      }
    }
    // changing to custom status code if required
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
  } else {
    result.error = null;
  }

  // append middleware result that user is belongs to that project or not.
  return res.status(statusCode).json(result);
};

const ok = (res, data, message = msg.SUCCESS) => {
  const statusCode = msg.OK_CODE;

  const result = {
    success: true,
    error: null,
    message,
  };

  if (data) {
    result.data = data;
  } else {
    result.data = null;
  }

  return res.status(statusCode).json(result);
};

export default { serverError, ok };
