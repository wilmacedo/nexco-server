import { AuthRequest, userAuthSchema } from "@/types/auth";
import { UserPreferenceNotFoundError } from "@/use-cases/errors/user-preference-not-found-error";
import { makePreferencesCase } from "@/use-cases/factories/user/make-preferences";
import { Response } from "express";

export async function preferences(request: AuthRequest, response: Response) {
  const { email: userEmail } = userAuthSchema.parse(request.user);

  try {
    const preferencesCase = makePreferencesCase();

    const { preferences } = await preferencesCase.execute({ userEmail });

    return response.status(200).json({ preferences });
  } catch (error) {
    if (error instanceof UserPreferenceNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
