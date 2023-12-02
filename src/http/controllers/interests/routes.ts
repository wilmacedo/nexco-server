import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { Router } from "express";
import { list } from "./list";
import { register } from "./register";

export const interestsRouter = Router();

interestsRouter.post("/interests", verifyJwt, register);
interestsRouter.get("/interests", verifyJwt, list);
