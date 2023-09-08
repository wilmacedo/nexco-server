import { env } from "@/env";
import { AuthPayload, AuthRequest } from "@/types/auth";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

export async function verifyJwt(
  request: AuthRequest,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decodedPayload = verify(token, env.JWT_SECRET) as AuthPayload;
    if (
      typeof decodedPayload.email !== "string" ||
      decodedPayload.email.length === 0
    ) {
      return response.status(401).json({ message: "Invalid token" });
    }

    request.user = decodedPayload;

    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
