import { Router } from "express";
import Login from "../services/login.js"
import { crearToken } from "../config/JWT.js"
const router = Router()

router.get('/token',crearToken,Login.postToken)

export { router };