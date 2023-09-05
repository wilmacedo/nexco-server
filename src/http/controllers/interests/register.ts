import { InterestAlreadyExistsError } from "@/use-cases/errors/interest-already-exists-error";
import { makeRegisterCase } from "@/use-cases/factories/interest/make-register-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
  });

  const { name } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterCase();

    await registerUseCase.execute({ name });
  } catch (error) {
    if (error instanceof InterestAlreadyExistsError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
