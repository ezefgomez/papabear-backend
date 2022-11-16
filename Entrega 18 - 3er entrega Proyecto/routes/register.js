import { Router } from "express";
import {
    getRegisterController,
    postRegisterController,
} from "../controller/register.js";
import { upload } from "../middleware/multer.js";

export const register = Router();

register.get("/", getRegisterController);

register.post("/", upload.single("photo"), postRegisterController);