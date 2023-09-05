import { Router } from "express";
import { list } from "./list";
import { register } from "./register";

export const companyTypeRouter = Router();

companyTypeRouter.post("/company-type", register);
companyTypeRouter.get("/company-type", list);
