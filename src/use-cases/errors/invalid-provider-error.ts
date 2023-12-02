export class InvalidProviderError extends Error {
  constructor() {
    super("Invalid provider provided");
  }
}
