# Incidencias Mongo

Este es un proyecto de API construido con Node.js y Express para manejar diversas funcionalidades. El proyecto incluye una estructura modular para gestionar diferentes rutas y servicios. administra las incidencias de campus en sus areas especificas 

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando el siguiente comando en la terminal:

```bash
npm install
```

1. Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias. Puedes basarte en el archivo `.env.example` proporcionado.

## Uso

Para ejecutar la aplicación, utiliza el siguiente comando:

```bash
npm run dev
```

La aplicación se ejecutará en `http://127.0.0.1:{PUERTO}`. Si no especificas un puerto en el archivo `.env`, se utilizará el puerto 3000 de forma predeterminada.

# Endpionts

1. **POST /api/agregar/dispositivo/:id**

   - Método: POST
   - Ruta: `/api/area/agregar/dispositivo/:id`
   - Autenticación requerida: Sí (usando autenticación tipo "bearer" con token JWT)
   - Descripción: Este endpoint permite agregar un dispositivo a un área específica.
   - Parámetros de URL:
     - `:id`: El ID de la área a la que se agregará el dispositivo.
   - Cuerpo de la solicitud: Datos del dispositivo que se va a agregar.
   - Función asociada: `Area.postDispositivosArea` del servicio de Áreas.

2. **POST /api/incidencias/agregar**

   - Método: POST
   - Ruta: `/api/incidencias/agregar`
   - Autenticación requerida: No
   - Descripción: Este endpoint permite agregar una nueva incidencia.
   - Cuerpo de la solicitud: Datos de la incidencia que se va a agregar.
   - Función asociada: `Incidencias.postIncidencia` del servicio de Incidencias.

3. **GET /api/login/token**

   - Método: GET
   - Ruta: `/api/login/token`
   - Autenticación requerida: No
   - Descripción: Este endpoint permite obtener un token JWT al autenticarse como entrenador.
   - Función asociada: `Login.postToken` del servicio de Login.
   - debes mandar un body con la cedula y el nombre para generar el token si no existe entonces no lo genera, ejemplo:

   ```json
   {
     "nombre": "Juan Pérez",
     "cedula": "123456789"
   }
   ```

   

4. **POST /api/trainer/agregar**

   - Método: POST
   - Ruta: `/api/trainer/agregar`
   - Autenticación requerida: No
   - Descripción: Este endpoint permite agregar información de un nuevo trainer.
   - Cuerpo de la solicitud: Datos del entrenador que se va a agregar.
   - Función asociada: `Trainer.postTrainer` del servicio de Entrenadores.

5. **Carga de Módulos Dinámica**

   - Método: Carga dinámica de módulos
   - Ruta: Rutas dinámicas cargadas desde módulos externos
   - Autenticación requerida: Dependiente del módulo
   - Descripción: Este proyecto utiliza una carga de módulos dinámica para cargar rutas desde diferentes archivos en el directorio `routes/`. Cada módulo puede tener sus propias rutas y lógica.
   - Función asociada: Carga de módulos dinámica desde `routes/index.js`.