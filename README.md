# Administrador de servicios
Este proyecto está hecho con Node.js y express para gestionar los servicios de un sistema de turnos y reservas.
La API permite consultar, agregar, modificar y eliminar servicios.

## Instalación
Para instalar las dependencias, ejecuta:
npm install

## Cómo ejecutar el proyecto
Primero, crea un archivo .env en la carpeta principal con estas variables:

PORT=8080
NODE_ENV=development

Hay incluido un archivo .env.example como referencia.
Después, ejecuta:

npm start
El servidor se ejecuta en:  http://localhost:8080

## Servicios
Los servicios están definidos inicialmente en src/data/services.json.
Cada servicio tiene estos datos:

* id: identificador del servicio.
* name: nombre.
* description: descripción.
* duration: duración.
* price: precio.
* category: categoría.
* available: indica si está disponible.

## Endpoints
GET /api/services
Devuelve todos los servicios.
También permite filtrar por categoría y disponibilidad:

GET /api/services?category=Manicura

GET /api/services?available=true

GET /api/services/:sid
Devuelve un servicio por su ID.

POST /api/services
Crea un nuevo servicio. El ID se genera automáticamente.

PUT /api/services/:sid
Actualiza un servicio existente. El ID no se puede modificar.

DELETE /api/services/:sid
Elimina un servicio por su ID.

Los cambios se realizan en memoria, por lo que al volver a ejecutar el proyecto se cargan de nuevo los servicios del archivo JSON.

