import { UserPreference } from "@prisma/client";

export interface PreferencesParams {
  communication: boolean;
  social: boolean;
}

export interface UserPreferenceRepository {
  findByEmail(email: string): Promise<UserPreference | null>;
  updateByEmail(email: string, params: PreferencesParams): Promise<void>;
}
