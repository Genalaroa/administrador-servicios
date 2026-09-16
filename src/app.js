import { PORT, NODE_ENV } from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";

const manager = new ServiceManager();

console.log(`Administrador de servicios iniciado`);
console.log(`Puerto configurado: ${PORT}`);
console.log(`Entorno: ${NODE_ENV}`);
console.log(`Servicios cargados: ${manager.getServices().length}`);


