import {
  PreferencesParams,
  UserPreferenceRepository,
} from "@/repositories/UserPreferenceRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface UpdatePreferencesRequest {
  userEmail: string;
  preferences: PreferencesParams;
}

export class UpdatePreferences {
  constructor(
    private userRepository: UserRepository,
    private userPreferencesRepository: UserPreferenceRepository
  ) {}

  async execute({
    userEmail,
    preferences,
  }: UpdatePreferencesRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new UserNotFoundError();
    }

    await this.userPreferencesRepository.updateByEmail(userEmail, preferences);
  }
}
