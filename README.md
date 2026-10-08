## Administrador de servicios
Este proyecto está hecho con Node.js y express para gestionar los servicios y reservas de un sistema de turnos.
La API permite consultar, agregar, modificar y eliminar servicios, además de crear reservas y añadir servicios a las mismas.
Los datos se almacenan mediante FileSystem en archivos JSON, por lo que los cambios persisten aunque el servidor se reinicie.

## Instalación
Para instalar las dependencias, ejecuta:

```bash
npm install
```

## Cómo ejecutar el proyecto

Primero, crea un archivo `.env` en la carpeta principal con estas variables:

```env
PORT=8080
NODE_ENV=development
```

Hay incluido un archivo `.env.example` como referencia.
Después, ejecuta:

```bash
npm start
```

El servidor se ejecuta en:
`http://localhost:8080`

## Arquitectura del proyecto

La aplicación está organizada en tres capas principales:

- **Routes (`src/routes/`):** definen los endpoints de la API y conectan cada petición con su controller correspondiente.
- **Controllers (`src/controllers/`):** reciben las peticiones HTTP, obtienen los parámetros y datos necesarios, llaman a los managers y devuelven las respuestas con sus códigos de estado.
- **Managers (`src/managers/`):** contienen la lógica de gestión de servicios y reservas, incluyendo la lectura y escritura de los archivos JSON.

Esta separación permite mantener el código organizado y facilita su mantenimiento.

## Estructura principal

```text
src/
├── config/
│   └── env.config.js
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
├── data/
│   ├── services.json
│   └── bookings.json
├── managers/
│   ├── ServiceManager.js
│   └── BookingManager.js
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
├── app.js
└── server.js
```

Los managers utilizan `import.meta.url` para localizar los archivos JSON mediante rutas relativas a sus propios módulos, evitando depender del directorio desde el que se ejecuta el servidor.

## Servicios
Los servicios se almacenan en src/data/services.json.
Cada servicio tiene estos datos:

* id: identificador del servicio.
* name: nombre.
* description: descripción.
* duration: duración.
* price: precio.
* category: categoría.
* available: indica si está disponible.

## Endpoints

### GET /api/services
Devuelve todos los servicios.
También permite filtrar por categoría y disponibilidad:

```
GET /api/services?category=Manicura
GET /api/services?available=true
```

### GET /api/services/:sid
Devuelve un servicio por su ID.

### POST /api/services
Crea un nuevo servicio. El ID se genera automáticamente.
Ejemplo de body:

``` JSON
{
  "name": "Masaje relajante",
  "description": "Masaje corporal relajante",
  "duration": 60,
  "price": 45,
  "category": "Masajes",
  "available": true
}
```

### PUT /api/services/:sid
Actualiza un servicio existente. El ID no se puede modificar.
Ejemplo de body:

```JSON
{
  "price": 50,
  "available": false
}
```

### DELETE /api/services/:sid
Elimina un servicio por su ID.

## Reservas
Las reservas se almacenan en `src/data/bookings.json`.
Cada reserva contiene:

* id: identificador de la reserva.
* clientName: nombre del cliente.
* clientEmail: correo electrónico del cliente.
* date: fecha de la reserva.
* time: hora de la reserva.
* status: estado de la reserva.
* services: servicios asociados a la reserva.

## Endpoints de reservas

### POST /api/bookings
Crea una nueva reserva. El ID se genera automáticamente y la reserva comienza con el array `services` vacío.
Ejemplo de body:

```JSON
{
  "clientName": "Ana García",
  "clientEmail": "ana@email.com",
  "date": "2026-10-05",
  "time": "17:00",
  "status": "pending"
}
```

### GET /api/bookings/:bid
Devuelve una reserva por su ID.

### POST /api/bookings/:bid/services/:sid
Añade un servicio a una reserva existente.
Si el servicio todavía no está en la reserva, se añade con cantidad `1`.
Si el mismo servicio ya existe, se incrementa su cantidad.
Ejemplo:

POST /api/bookings/1/services/2


## Persistencia de datos
La aplicación utiliza FileSystem para leer y escribir los datos en:

```
src/data/services.json
src/data/bookings.json
```

Los cambios realizados en servicios y reservas se guardan en estos archivos, por lo que los datos persisten después de reiniciar el servidor.

## Tests
El proyecto incluye una suite sencilla de tests utilizando el módulo de testing nativo de Node.js.
Para ejecutar los tests:

```bash
npm test
```

Actualmente se comprueba:
- Que `getServices()` devuelve un array.
- Que `getServiceById()` devuelve correctamente un servicio existente.
- Que `getServiceById()` devuelve `null` cuando el servicio no existe.
- Que `getServices()` devuelve al menos un servicio.
