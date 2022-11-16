import { Router } from "express";
import { getHomeController } from "../controller/home.js";

export const home = Router();
home.get("/", getHomeController);