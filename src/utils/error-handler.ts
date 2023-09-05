import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: Error,
  _: Request,
  response: Response,
  __: NextFunction
) {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Add some external analytics tool
  }

  return response.status(500).send({ message: "Internal server error" });
}
