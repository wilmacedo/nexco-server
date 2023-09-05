export class UserAlreadyRegisteredCompanyTypeError extends Error {
  constructor() {
    super("User already registered company type");
  }
}
