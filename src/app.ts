import cors from "cors";
import express, { Response } from "express";
import "express-async-errors";
import { usersRouter } from "./http/controllers/users/routes";
import { errorHandling } from "./utils/error";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ limit: "5mb" }));

app.use("/", usersRouter);

app.use("/health", (_, response: Response) => {
  return response.status(200).json({ status: "ok" });
});

app.use(errorHandling);
