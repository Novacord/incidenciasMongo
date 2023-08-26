import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const trainer = db.getInstance().changeCollection('trainer').connect()

export default class Login {
    static async postToken(req, res) {
        const consulta = await trainer.findOne({ nombre: req.body.nombre, cedula: req.body.cedula })
        if (consulta) {
            res.status(200).json(req.data)
        } else {
            res.status(400).json({ message: 'no accedio' })
        }
    }
}