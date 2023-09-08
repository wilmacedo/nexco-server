import { prisma } from "@/lib/prisma";
import { UserPreference } from "@prisma/client";
import {
  PreferencesParams,
  UserPreferenceRepository,
} from "../UserPreferenceRepository";

export class PrismaUserPreferenceRepository
  implements UserPreferenceRepository
{
  async findByEmail(email: string): Promise<UserPreference | null> {
    const preferences = await prisma.userPreference.findUnique({
      where: {
        userId: email,
      },
    });

    return preferences;
  }

  async updateByEmail(email: string, params: PreferencesParams): Promise<void> {
    await prisma.userPreference.update({
      where: {
        userId: email,
      },
      data: params,
    });
  }
}
