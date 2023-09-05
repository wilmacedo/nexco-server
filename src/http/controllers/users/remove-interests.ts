import { InterestNotFoundError } from "@/use-cases/errors/interest-not-found-error";
import { UserDontHaveInterestsError } from "@/use-cases/errors/user-dont-have-interests-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeRemoveInterestsCase } from "@/use-cases/factories/user/make-remove-interests";
import { Request, Response } from "express";
import { z } from "zod";

export async function removeInterests(request: Request, response: Response) {
  const bodySchema = z.object({
    userEmail: z.string().email(),
    interestIds: z.array(z.string()),
  });

  const { userEmail, interestIds } = bodySchema.parse(request.body);

  try {
    const removeInterestsCase = makeRemoveInterestsCase();

    await removeInterestsCase.execute({
      userEmail,
      interestIds,
    });
  } catch (error) {
    if (
      error instanceof InterestNotFoundError ||
      error instanceof UserNotFoundError
    ) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof UserDontHaveInterestsError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(200);
}
