export class UserDontHaveInterestsError extends Error {
  constructor() {
    super("User dont have specified interests");
  }
}
