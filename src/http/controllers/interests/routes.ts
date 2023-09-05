import { Router } from "express";
import { list } from "./list";
import { register } from "./register";

export const interestsRouter = Router();

interestsRouter.post("/interests", register);
interestsRouter.get("/interests", list);
