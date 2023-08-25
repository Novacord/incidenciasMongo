import { Router } from "express";
import Area from "../services/area.js"
import passportHelper from '../config/passportConfig.js';
const router = Router()

router.use(passportHelper.initialize());

const bearerAuth = passportHelper.authenticate('bearer', { session: false })

router.post('/agregar/dispositivo/:id',bearerAuth, Area.postDispositivosArea)

export { router };