import { Router } from "express";
import { addInterests } from "./add-interests";
import { register } from "./register";

export const usersRouter = Router();

usersRouter.post("/users", register);
usersRouter.post("/users/interests", addInterests);
