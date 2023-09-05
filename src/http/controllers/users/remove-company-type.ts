import { CompanyTypeNotFoundError } from "@/use-cases/errors/company-type-not-found-error";
import { UserDontHaveCompanyTypeError } from "@/use-cases/errors/user-dont-have-company-type-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { makeRemoveCompanyTypeCase } from "@/use-cases/factories/user/make-remove-company-type";
import { Request, Response } from "express";
import { z } from "zod";

export async function removeCompanyTypes(request: Request, response: Response) {
  const bodySchema = z.object({
    userEmail: z.string().email(),
    typeIds: z.array(z.string()),
  });

  const { userEmail, typeIds } = bodySchema.parse(request.body);

  try {
    const removeCompanyTypesCase = makeRemoveCompanyTypeCase();

    await removeCompanyTypesCase.execute({
      userEmail,
      typeIds,
    });
  } catch (error) {
    if (
      error instanceof CompanyTypeNotFoundError ||
      error instanceof UserNotFoundError
    ) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof UserDontHaveCompanyTypeError) {
      return response.status(409).json({ message: error.message });
    }

    throw error;
  }

  return response.sendStatus(200);
}
