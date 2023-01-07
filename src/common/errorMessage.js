const message = {
  OK_CODE: 200,
  NOT_FOUND_CODE: 404,
  BAD_REQUEST_CODE: 400,
  INTERNAL_SERVER_ERROR_CODE: 500,
  UNAUTHORIZED_CODE: 401,
  NOT_FOUND: "Not Found",
  SUCCESS: "Success",
  EMAIL_ALREADY_EXIST: "Email id already exists",
  ADMIN_NOT_FOUND: "Admin Email Not Found",
  INCORRECT_PASSWORD: "Password is Incorrect",
  UNAUTHORIZED: "Unauthorized",
  PERSON_ALREADY_EXIST: "Person With Same Army No Already Exist",
  ONLY_ONE_ADDRESS: "Person Can Have Only One Address",
  ARMY_NO_NOT_FOUND: "Army No Does Not Exist",
  armyNoNotFound: (id) => `${id} Army No Does Not Exist`,
};
export default message;
