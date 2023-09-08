import { AuthRequest, userAuthSchema } from "@/types/auth";
import { InterestNotFoundError } from "@/use-cases/errors/interest-not-found-error";
import { UserDontHaveInterestsError } from "@/use-cases/errors/user-dont-have-interests-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeRemoveInterestsCase } from "@/use-cases/factories/user/make-remove-interests";
import { Response } from "express";
import { z } from "zod";

export async function removeInterests(
  request: AuthRequest,
  response: Response
) {
  const bodySchema = z.object({
    interestIds: z.array(z.string()),
  });

  const { interestIds } = bodySchema.parse(request.body);
  const { email: userEmail } = userAuthSchema.parse(request.user);

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
