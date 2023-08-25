import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const trainer = db.getInstance().changeCollection('trainer').connect()

export default class Trainer {
    static async postTrainer(req, res) {
        try {
            const consulta = await trainer.insertOne(req.body)
            res.status(201).json(consulta)
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}