import path from "path";
import { config as dotenvConfig } from "dotenv";
import { z } from "zod";
import { type EnvConfig, envSchema } from "./env.schema";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenvConfig({ path: path.resolve(process.cwd(), envFile) });

function validateEnv(): EnvConfig {
  try {
    const rawConfig = {
      server: {
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT,
        host: process.env.HOST,
      },
      database: {
        user: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        uri: process.env.MONGO_URI,
      },
    };

    const parsed = envSchema.parse(rawConfig);

    console.log(
      `✅ Configuration loaded for environment: ${parsed.server.nodeEnv}`
    );

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(error.errors, null, 2)
      );
      process.exit(1);
    }
    throw error;
  }
}

export const config = validateEnv();

export function getConfig<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
  return config[key];
}

export const isDevelopment = () => config.server.nodeEnv === "development";
export const isProduction = () => config.server.nodeEnv === "production";
export const isTest = () => config.server.nodeEnv === "test";
