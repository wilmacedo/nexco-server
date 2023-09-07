import { UserPreferenceRepository } from "@/repositories/UserPreferenceRepository";
import { UserPreference } from "@prisma/client";
import { UserPreferenceNotFoundError } from "../errors/user-preference-not-found-error";

interface PreferencesRequest {
  userEmail: string;
}

interface PreferencesResponse {
  preferences: UserPreference;
}

export class Preferences {
  constructor(private preferenceRepository: UserPreferenceRepository) {}

  async execute({
    userEmail,
  }: PreferencesRequest): Promise<PreferencesResponse> {
    const preferences = await this.preferenceRepository.findByEmail(userEmail);
    if (!preferences) {
      throw new UserPreferenceNotFoundError();
    }

    return { preferences };
  }
}
