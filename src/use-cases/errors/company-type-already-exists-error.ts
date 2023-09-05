export class CompanyTypeAlreadyExistsError extends Error {
  constructor() {
    super("Company type already exists");
  }
}
