import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!, // O '!' diz ao TS que a URL existe
  },
  migrations: {
    seed: 'node --loader ts-node/esm ./prisma/seed.ts', // Comando atualizado para ESM
  },
});