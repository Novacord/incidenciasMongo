import { Router } from 'express';
import Trainer from '../services/trainer.js';
const router = Router();

router.post('/agregar',Trainer.postTrainer)

export { router };