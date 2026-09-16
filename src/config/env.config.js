import "dotenv/config";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

if (!PORT || !NODE_ENV) {
  throw new Error("Faltan variables de entorno obligatorias");
}

export { PORT, NODE_ENV };