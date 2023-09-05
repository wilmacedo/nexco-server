import { CompanyTypeNotFoundError } from "@/use-cases/errors/company-type-not-found-error";
import { UserAlreadyRegisteredCompanyTypeError } from "@/use-cases/errors/user-already-registered-company-type-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeAddCompanyTypeCase } from "@/use-cases/factories/user/make-add-company-type";
import { Request, Response } from "express";
import { z } from "zod";

export async function addCompanyType(request: Request, response: Response) {
  const bodySchema = z.object({
    userEmail: z.string().email(),
    typeIds: z.array(z.string()),
  });

  const { userEmail, typeIds } = bodySchema.parse(request.body);

  try {
    const addCompanyTypeCase = makeAddCompanyTypeCase();

    await addCompanyTypeCase.execute({
      userEmail,
      typeIds,
    });
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof CompanyTypeNotFoundError
    ) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof UserAlreadyRegisteredCompanyTypeError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(201);
}
