import { UserPreferenceNotFoundError } from "@/use-cases/errors/user-preference-not-found-error";
import { makePreferencesCase } from "@/use-cases/factories/user/make-preferences";
import { Request, Response } from "express";
import { z } from "zod";

export async function preferences(request: Request, response: Response) {
  const bodySchema = z.object({
    userEmail: z.string().email(),
  });

  const { userEmail } = bodySchema.parse(request.body);

  try {
    const preferencesCase = makePreferencesCase();

    const {
      preferences: { communication, social },
    } = await preferencesCase.execute({ userEmail });

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
