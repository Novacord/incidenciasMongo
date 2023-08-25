import db from '../config/mongodb.js';
import { SignJWT, jwtVerify } from "jose"
import { ObjectId } from "mongodb";
import { config } from "dotenv";
config();

const trainer = db.getInstance().changeCollection('trainer').connect()

export const crearToken = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) return res.status(400).send({ message: "Datos no enviados" });
    const result = await trainer.findOne(req.body);
    if (!result) return res.status(401).send({ message: "trainer no encontrado" });
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    req.data = { status: 200, message: jwtConstructor };
    next();
}

export const validarToken = async (req, token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        let result = await trainer("trainer").findOne(
            {
                _id: new ObjectId(jwtData.payload.id),
                [`permisos.${req.baseUrl}`]: 1
            }
        );
        if (!result) return;
        let { _id, permisos, ...usuario } = result;
        return usuario;
    } catch (error) {
        console.log(error);
    }
}