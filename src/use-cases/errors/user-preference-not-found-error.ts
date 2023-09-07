export class UserPreferenceNotFoundError extends Error {
  constructor() {
    super("User preference not found");
  }
}
