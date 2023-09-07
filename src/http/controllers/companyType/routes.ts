import { Router } from "express";
import { list } from "./list";
import { register } from "./register";

export const companyTypeRouter = Router();

companyTypeRouter.post("/company-types", register);
companyTypeRouter.get("/company-types", list);
