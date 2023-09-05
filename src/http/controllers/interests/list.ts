import { makeListCase } from "@/use-cases/factories/interest/make-list-case";
import { Request, Response } from "express";

export async function list(_: Request, response: Response) {
  const listCase = makeListCase();

  const { interests } = await listCase.execute();
  const interestsView = interests.map(({ id, name }) => ({ id, name }));

  return response.status(200).json({ interests: interestsView });
}
