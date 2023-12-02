import { InvalidProviderError } from "@/use-cases/errors/invalid-provider-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { WrongPasswordError } from "@/use-cases/errors/wrong-password-error";
import { makeAuthenticateCase } from "@/use-cases/factories/user/make-authenticate";
import { Request, Response } from "express";
import { z } from "zod";

export async function authenticate(request: Request, response: Response) {
  const bodySchema = z.object({
    provider: z.enum(["google", "credentials"]),
    email: z.string().email(),
    password: z.string().min(3).optional(),
  });

  const { provider, email, password } = bodySchema.parse(request.body);

  try {
    const authenticateCase = makeAuthenticateCase();

    const { user } = await authenticateCase.execute({
      provider,
      email,
      password,
    });

    return response.status(200).json({ user });
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof WrongPasswordError
    ) {
      return response
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    if (error instanceof InvalidProviderError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }
}
