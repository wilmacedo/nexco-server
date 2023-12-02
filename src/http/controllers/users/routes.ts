import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { Router } from "express";
import { addCompanyType } from "./add-company-type";
import { addInterests } from "./add-interests";
import { authenticate } from "./authenticate";
import { preferences } from "./preferences";
import { register } from "./register";
import { removeCompanyTypes } from "./remove-company-type";
import { removeInterests } from "./remove-interests";
import { updatePreferences } from "./update-preferences";

export const usersRouter = Router();

usersRouter.post("/users", register);
usersRouter.post("/users/authenticate", authenticate);

usersRouter.post("/users/interests", verifyJwt, addInterests);
usersRouter.delete("/users/interests", verifyJwt, removeInterests);

usersRouter.post("/users/company-types", verifyJwt, addCompanyType);
usersRouter.delete("/users/company-types", verifyJwt, removeCompanyTypes);

usersRouter.get("/users/preferences", verifyJwt, preferences);
usersRouter.put("/users/preferences", verifyJwt, updatePreferences);
