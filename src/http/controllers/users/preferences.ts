import { AuthRequest } from "@/types/auth";
import { UserPreferenceNotFoundError } from "@/use-cases/errors/user-preference-not-found-error";
import { makePreferencesCase } from "@/use-cases/factories/user/make-preferences";
import { Response } from "express";
import { z } from "zod";

export async function preferences(request: AuthRequest, response: Response) {
  const authUserSchema = z.object({
    email: z.string().email(),
  });

  const { email } = authUserSchema.parse(request.user);

  try {
    const preferencesCase = makePreferencesCase();

    const {
      preferences: { communication, social },
    } = await preferencesCase.execute({ userEmail: email });

    return response
      .status(200)
      .json({ preferences: { communication, social } });
  } catch (error) {
    if (error instanceof UserPreferenceNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
