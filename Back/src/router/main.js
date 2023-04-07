import express from "express";
import { register } from "../auth/register.js";

const router = express.Router()

router.post("/register", register)


export default router