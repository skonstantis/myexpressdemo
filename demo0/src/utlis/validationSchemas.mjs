export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Username must be 5 - 32 characters",
    },
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isString: { errorMessage: "Username must be string" },
  },
  displayName: {
    notEmpty: {
        errorMessage: "Display name must not be empty",
      }
  }
};
