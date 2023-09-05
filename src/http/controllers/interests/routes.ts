import { Router } from "express";
import { register } from "./register";

export const interestsRouter = Router();

interestsRouter.post("/interests", register);
