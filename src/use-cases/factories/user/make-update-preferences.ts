import { PrismaUserPreferenceRepository } from "@/repositories/prisma/prisma-user-preference-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdatePreferences } from "@/use-cases/user/update-preferences";

export function makeUpdatePreferencesCase() {
  const userRepository = new PrismaUserRepository();
  const userPreferenceRepository = new PrismaUserPreferenceRepository();
  const updatePreferencesCase = new UpdatePreferences(
    userRepository,
    userPreferenceRepository
  );

  return updatePreferencesCase;
}
