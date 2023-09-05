import { CompanyTypeAlreadyExistsError } from "@/use-cases/errors/company-type-already-exists-error";
import { makeRegisterCase } from "@/use-cases/factories/companyType/make-register-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    description: z.string(),
  });

  const { name, description } = registerBodySchema.parse(request.body);

  try {
    const registerCase = makeRegisterCase();

    await registerCase.execute({
      name,
      description,
    });
  } catch (error) {
    if (error instanceof CompanyTypeAlreadyExistsError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
