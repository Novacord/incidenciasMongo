use('db_incidencias');

db.createCollection("trainer", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["cedula", "nombre", "telefono", "emailCorp"],
            properties: {
                cedula: { bsonType: "string", description: "'cc_tra' solo puede contener números y es requerido", pattern: "^[0-9]+$" },
                nombre: { bsonType: "string", description: "'nombre_tra' debe ser un string y es requerido" },
                telefono: { bsonType: "string", description: "'telef_tra' solo puede contener numeros y es requerido", pattern: "^[0-9]+$" },
                emailPersonal: { bsonType: "string", description: "'email_personal' es requerido" },
                emailCorp: { bsonType: "string", description: "'email_corp' es requerido" },
                permisos: {
                    bsonType: 'object',
                    description: "Debe ingresar los permisos",
                    patternProperties: { "": { bsonType: "int" } }
                }
            }
        }
    }
});

use('db_incidencias');
db.createCollection("area", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "tipo", "dispositivos"],
            properties: {
                nombre: { enum: ['apolo', 'artemis', 'sputnik', 'skylab', 'corvus', 'endor'], description: "'nombre_area' no existe" },
                tipo: { enum: ['training', 'review1', 'review2'], description: "'tipo_area' no existe" },
                dispositivos: {
                    bsonType: "array",
                    required: ["id", "marca", "modelo", "tipo", "idArea"],
                    properties: {
                        id: { bsonType: "string", description: "'id_dis' debe ser un string y es requerido" },
                        marca: { bsonType: "string", description: "'marca_dis' debe ser un string" },
                        modelo: { bsonType: "string", description: "'modelo_dis' debe ser un string y es requerido" },
                        tipo: { enum: ['computador', 'teclado', 'mouse', 'diademas'], description: "'tipo_dis' no existe" },
                    }
                }
            }
        }
    }
});

use('db_incidencias');
db.createCollection("incidencia", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["descripcion", "fecha", "categoria", "tipo", "area"],
            properties: {
                descripcion: { bsonType: "string", description: "'descripcion' debe ser un string y es requerido" },
                fecha: { bsonType: "string", description: "'fecha' debe ser una fecha válida y es requerida" },
                categoria: { enum: ['hardware', 'software'], description: "'categoria' solo puede ser 'hardware' o 'software'" },
                tipo: { enum: ['leve', 'moderada', 'critica'], description: "'tipo' solo puede ser 'leve', 'moderada' o 'critica'" },
                area: { bsonType: "string", description: "Referencia al lugar por su _id" },
                dispositivo: {
                    bsonType: "object",
                    required: ["id", "marca", "modelo", "tipo"],
                    properties: {
                        id: { bsonType: "string", description: "'id' debe ser un string y es requerido" },
                        marca: { bsonType: "string", description: "'marca' debe ser un string" },
                        modelo: { bsonType: "string", description: "'modelo' debe ser un string y es requerido" },
                        tipo: { enum: ['computador', 'teclado', 'mouse', 'diademas'], description: "'tipo' no existe" }
                    }
                }
            }
        }
    }
});

db.createCollection("usuario", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["cedula", "nombre", "rol"],
            properties: {
                cedula: { bsonType: "string", description: "'cc_usu' solo puede contener números y es requerido", pattern: "^[0-9]+$" },
                nombre: { bsonType: "string", description: "'nombre_usu' debe ser un string y es requerido" },
                rol: { enum: ['admin', 'trainer', 'camper'], description: "'rol' debe ser 'admin', 'trainer' o 'camper' y es requerido" },
                permisos: {
                    bsonType: 'object',
                    description: "Debe ingresar los permisos",
                    patternProperties: { "^/.*": { bsonType: "array" } }
                }
            }
        }
    }
});

use('db_incidencias');
db.trainer.insertOne({
    "cedula": "1097094415",
    "nombre": "Jose Nova",
    "telefono": "123",
    "emailPersonal": "juan@example.com",
    "emailCorp": "juan.perez@empresa.com",
    "permisos": {
        "/api/trainer": 1,
        "/api/incidencias": 1,
        "/api/area": 1
    }
});

use('db_incidencias');
db.incidencia.insertOne({
    "descripcion": "Problema con el teclado",
    "fecha": "2023-08-24T10:30:00Z",
    "categoria": "hardware",
    "tipo": "moderada",
    "area": "64e7d3d1a19b434323807c88", 
    "dispositivo": {
        "id": "D123",
        "marca": "Logitech",
        "modelo": "K120",
        "tipo": "teclado"
    }
});

db.usuario.insertOne({
    "cedula": "987654321",
    "nombre": "María García",
    "rol": "admin",
    "permisos": {
        "/admin": ["read", "write"],
        "/usuarios": ["read", "write"]
    }
});

use('db_incidencias');
db.area.insertOne({
    "nombre": "apolo",
    "tipo": "training",
    "dispositivos": [
        {
            "id": "D002",
            "marca": "Logitech",
            "modelo": "K120",
            "tipo": "teclado",
            "idArea": "A001"
        }
    ]
});


