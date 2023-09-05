import { makeListCase } from "@/use-cases/factories/companyType/make-list-case";
import { Request, Response } from "express";

export async function list(_: Request, response: Response) {
  const listCase = makeListCase();

  const { companyTypes } = await listCase.execute();
  const typesView = companyTypes.map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));

  return response.status(200).json({ companyTypes: typesView });
}
