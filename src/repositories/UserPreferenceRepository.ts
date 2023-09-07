import { UserPreference } from "@prisma/client";

export interface UserPreferenceRepository {
  findByEmail(email: string): Promise<UserPreference | null>;
}
