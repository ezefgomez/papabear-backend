import { Router } from "express";
import { getErrorController } from "../controller/error.js";

export const error = Router();

error.get("/", getErrorController);