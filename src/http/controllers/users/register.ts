import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterCase } from "@/use-cases/factories/user/make-register-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().optional(),
    image: z.string().optional(),
  });

  const { name, email, password, image } = registerBodySchema.parse(
    request.body
  );

  try {
    const registerUseCase = makeRegisterCase();

    await registerUseCase.execute({ name, email, password, image });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
