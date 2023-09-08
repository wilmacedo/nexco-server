import { AuthRequest, userAuthSchema } from "@/types/auth";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeUpdatePreferencesCase } from "@/use-cases/factories/user/make-update-preferences";
import { Response } from "express";
import { z } from "zod";

export async function updatePreferences(
  request: AuthRequest,
  response: Response
) {
  const bodySchema = z.object({
    communication: z.boolean(),
    social: z.boolean(),
  });

  const { communication, social } = bodySchema.parse(request.body);
  const { email: userEmail } = userAuthSchema.parse(request.user);

  try {
    const updatePreferencesCase = makeUpdatePreferencesCase();

    await updatePreferencesCase.execute({
      userEmail,
      preferences: { communication, social },
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(204);
}
