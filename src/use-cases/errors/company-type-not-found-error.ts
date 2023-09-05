export class CompanyTypeNotFoundError extends Error {
  constructor() {
    super("Company type not found");
  }
}
