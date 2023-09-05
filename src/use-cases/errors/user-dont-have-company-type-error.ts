export class UserDontHaveCompanyTypeError extends Error {
  constructor() {
    super("User dont have specified company types");
  }
}
