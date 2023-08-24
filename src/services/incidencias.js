import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const incidencia = db.getInstance().changeCollection('incidencia').connect()

export default class Incidencias {
    static async postIncidencia(req, res) {
        // Convierte el string del _id del área en un ObjectId
        const areaId = new ObjectId(req.body.area);

        // Crea un nuevo objeto de incidencia con el ObjectId del área
        const incidenciaData = {
            descripcion: req.body.descripcion,
            fecha: new Date(req.body.fecha),
            categoria: req.body.categoria,
            tipo: req.body.tipo,
            area: areaId,
            dispositivo: {
                id: req.body.dispositivo.id,
                marca: req.body.dispositivo.marca,
                modelo: req.body.dispositivo.modelo,
                tipo: req.body.dispositivo.tipo,
                idArea: req.body.dispositivo.idArea
            }
        };

        try {
            const consulta = await incidencia.insertOne(incidenciaData);
            res.status(200).json({ data: consulta, msg: "Consulta exitosa" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}