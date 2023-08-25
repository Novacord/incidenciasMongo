import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
import { crearToken } from "../config/JWT.js"
const trainer = db.getInstance().changeCollection('trainer').connect()

export default class Trainer {
    static async postTrainer(req, res) {
        const consulta = await trainer.findOne({ cedula: req.params.cedula, cedula: req.params.cedula })
        if (consulta) {
            res.status(400).json({ message: 'accedio' })
        } else {
            res.status(200).json({ message: 'no accedio' })
        }
    }
}