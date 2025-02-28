import { z } from 'zod';
import * as dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Define el esquema para las variables de entorno
const envSchema = z.object({
  APP_TITLE: z.string(),
  SERVER_URL: z.string(),
});

// Validar las variables de entorno
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('Error en las variables de entorno:', result.error.format());
  process.exit(1);
}

// Exportar las variables de entorno validadas
const ENV = result.data;

export default ENV;
