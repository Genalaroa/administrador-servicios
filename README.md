# Administrador de servicios

Este proyecto está hecho con Node.js. He creado una clase llamada ServiceManager para gestionar los servicios de un sistema de turnos y reservas.

Permite consultar, agregar, modificar y eliminar servicios.

## Instalación

Para instalar las dependencias, ejecuta:

npm install

## Cómo ejecutar el proyecto

Primero, crea un archivo .env en la carpeta principal con estas variables:

PORT=8080
NODE_ENV=development

Después, ejecuta:

node src/app.js

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

## Métodos de ServiceManager

- Consultar todos los servicios:

manager.getServices();

- Buscar un servicio por su ID:

manager.getServiceById(1);

- Agregar un servicio:el ID se genera automáticamente.

manager.addService({
  name: "Masaje facial",
  description: "Masaje relajante del rostro",
  duration: 30,
  price: 30,
  category: "Facial",
  available: true
});

- Modificar un servicio:

manager.updateService(1, { price: 22 });

- Eliminar un servicio:

manager.deleteService(1);

Los cambios se realizan en memoria, por lo que al volver a ejecutar el proyecto se cargan de nuevo los servicios del archivo JSON.

