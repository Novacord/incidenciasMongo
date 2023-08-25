import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const incidencia = db.getInstance().changeCollection('incidencia').connect()

export default class Incidencias {
    static async postIncidencia(req, res) {
        const incidencia = db.getInstance().changeCollection('incidencia').connect();
        try {
            const consulta = await incidencia.insertOne(req.body);
            res.status(200).json({ data: consulta, msg: "Consulta exitosa" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}