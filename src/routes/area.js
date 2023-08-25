import { Router } from "express";
import Area from "../services/area.js"
const router = Router()

router.post('/agregar/dispositivo/:id', Area.postDispositivosArea)

export { router };