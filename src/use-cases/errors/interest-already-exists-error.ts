export class InterestAlreadyExistsError extends Error {
  constructor() {
    super("Interest already exists");
  }
}
