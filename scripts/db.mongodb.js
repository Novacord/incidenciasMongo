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
                emailCorp: { bsonType: "string", description: "'email_corp' es requerido" }
            }
        }
    }
});

db.createCollection("incidencia", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "descripcion", "fecha", "categoria", "tipo"],
            properties: {
                id: { bsonType: "int", description: "'id_inc' debe ser un entero y es requerido" },
                descripcion: { bsonType: "string", description: "'descrip_inc' debe ser un string y es requerido" },
                fecha: { bsonType: "date", description: "'fecha_reporte' debe ser una fecha valida y es requerida" },
                categoria: { enum: ['hardware', 'software'], description: "'categoria_inc' solo puede ser 'hardware' o 'software'" },
                tipo: { enum: ['leve', 'moderada', 'critica'], description: "'tipo_inc' solo puede ser 'leve', 'moderada' o 'critica'" },
                lugar: {
                    bsonType: "object",
                    required: ["nombre", "tipo"],
                    properties: {
                        nombre: { enum: ['apolo', 'artemis', 'sputnik', 'skylab', 'corvus', 'endor'], description: "'nombre_area' no existe" },
                        tipo: { enum: ['training', 'review1', 'review2'], description: "'tipo_area' no existe" }
                    }
                },
                dispositivo: {
                    bsonType: "object",
                    required: ["id", "marca", "modelo", "tipo", "idArea"],
                    properties: {
                        id: { bsonType: "string", description: "'id_dis' debe ser un string y es requerido" },
                        marca: { bsonType: "string", description: "'marca_dis' debe ser un string" },
                        modelo: { bsonType: "string", description: "'modelo_dis' debe ser un string y es requerido" },
                        tipo: { enum: ['computador', 'teclado', 'mouse', 'diademas'], description: "'tipo_dis' no existe" },
                        idArea: { bsonType: "string", description: "'id_area' debe ser un string y es requerido" }
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
    "cedula": "123456789",
    "nombre": "Juan Pérez",
    "telefono": "987654321",
    "emailPersonal": "juan@example.com",
    "emailCorp": "juan.perez@empresa.com"
});

db.incidencia.insertOne({
    "id": 1,
    "descripcion": "Problema con la conexión a internet",
    "fecha": ISODate("2023-08-24T10:30:00Z"),
    "categoria": "software",
    "tipo": "moderada",
    "lugar": {
        "nombre": "apolo",
        "tipo": "training"
    },
    "dispositivo": {
        "id": "D123",
        "marca": "HP",
        "modelo": "Pavilion",
        "tipo": "computador",
        "idArea": "A001"
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

