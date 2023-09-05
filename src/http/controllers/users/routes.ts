import { Router } from "express";
import { addCompanyType } from "./add-company-type";
import { addInterests } from "./add-interests";
import { register } from "./register";
import { removeInterests } from "./remove-interests";

export const usersRouter = Router();

usersRouter.post("/users", register);
usersRouter.post("/users/interests", addInterests);
usersRouter.delete("/users/interests", removeInterests);
usersRouter.post("/users/company-types", addCompanyType);
