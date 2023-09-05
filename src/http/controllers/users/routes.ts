import { Router } from "express";
import { addInterests } from "./add-interests";
import { register } from "./register";
import { removeInterests } from "./remove-interests";

export const usersRouter = Router();

usersRouter.post("/users", register);
usersRouter.post("/users/interests", addInterests);
usersRouter.delete("/users/interests", removeInterests);
