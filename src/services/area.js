import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const area = db.getInstance().changeCollection('area').connect()

export default class Area {
    static async postDispositivosArea(req, res) {
        const consulta = await area.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { dispositivos: req.body } })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }
}