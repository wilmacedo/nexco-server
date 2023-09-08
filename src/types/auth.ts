import { Request } from "express";
import { z } from "zod";

export interface AuthPayload {
  name: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const userAuthSchema = z.object({
  email: z.string().email(),
});
