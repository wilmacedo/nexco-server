import { AuthRequest, userAuthSchema } from "@/types/auth";
import { InterestNotFoundError } from "@/use-cases/errors/interest-not-found-error";
import { UserAlreadyRegisteredInterestError } from "@/use-cases/errors/user-already-registered-interest-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeAddInterestsCase } from "@/use-cases/factories/user/make-add-interests";
import { Response } from "express";
import { z } from "zod";

export async function addInterests(request: AuthRequest, response: Response) {
  const bodySchema = z.object({
    interestIds: z.array(z.string()),
  });

  const { interestIds } = bodySchema.parse(request.body);
  const { email: userEmail } = userAuthSchema.parse(request.user);

  try {
    const addInterestsCase = makeAddInterestsCase();

    await addInterestsCase.execute({
      interestIds,
      userEmail,
    });
  } catch (error) {
    if (
      error instanceof InterestNotFoundError ||
      error instanceof UserNotFoundError
    ) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof UserAlreadyRegisteredInterestError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
