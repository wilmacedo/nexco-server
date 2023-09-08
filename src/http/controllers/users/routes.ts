import { verifyJwt } from "@/http/middlewares/verifyJwt";
import { Router } from "express";
import { addCompanyType } from "./add-company-type";
import { addInterests } from "./add-interests";
import { preferences } from "./preferences";
import { register } from "./register";
import { removeCompanyTypes } from "./remove-company-type";
import { removeInterests } from "./remove-interests";
import { updatePreferences } from "./update-preferences";

export const usersRouter = Router();

usersRouter.post("/users", register);

usersRouter.post("/users/interests", addInterests);
usersRouter.delete("/users/interests", removeInterests);

usersRouter.post("/users/company-types", addCompanyType);
usersRouter.delete("/users/company-types", removeCompanyTypes);

usersRouter.get("/users/preferences", verifyJwt, preferences);
usersRouter.put("/users/preferences", updatePreferences);
