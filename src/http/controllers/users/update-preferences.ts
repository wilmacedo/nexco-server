import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeUpdatePreferencesCase } from "@/use-cases/factories/user/make-update-preferences";
import { Request, Response } from "express";
import { z } from "zod";

export async function updatePreferences(request: Request, response: Response) {
  const bodySchema = z.object({
    userEmail: z.string().email(),
    preferences: z.object({
      communication: z.boolean(),
      social: z.boolean(),
    }),
  });

  const { userEmail, preferences } = bodySchema.parse(request.body);

  try {
    const updatePreferencesCase = makeUpdatePreferencesCase();

    await updatePreferencesCase.execute({ userEmail, preferences });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(204);
}
