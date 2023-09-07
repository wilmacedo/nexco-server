import { PrismaUserPreferenceRepository } from "@/repositories/prisma/prisma-user-preference-repository";
import { Preferences } from "@/use-cases/user/preferences";

export function makePreferencesCase() {
  const userPreferenceRepository = new PrismaUserPreferenceRepository();
  const preferencesCase = new Preferences(userPreferenceRepository);

  return preferencesCase;
}
