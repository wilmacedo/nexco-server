import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { Router } from "express";
import { list } from "./list";
import { register } from "./register";

export const companyTypeRouter = Router();

companyTypeRouter.post("/company-types", verifyJwt, register);
companyTypeRouter.get("/company-types", verifyJwt, list);
