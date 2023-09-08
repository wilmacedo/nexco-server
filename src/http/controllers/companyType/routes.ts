import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { Router } from "express";
import { list } from "./list";
import { register } from "./register";

export const companyTypeRouter = Router();

companyTypeRouter.post("/company-types", verifyJwt, register);
companyTypeRouter.get("/company-types", verifyJwt, list);
