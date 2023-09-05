export class UserAlreadyRegisteredInterestError extends Error {
  constructor() {
    super("User already registered interest");
  }
}
