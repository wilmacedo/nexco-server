import { Request } from "express";

export interface AuthPayload {
  name: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}
