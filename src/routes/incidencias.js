import { Router } from "express";
import Incidencias from "../services/incidencias.js"
const router = Router()

router.post('/agregar', Incidencias.postIncidencia)

export { router };