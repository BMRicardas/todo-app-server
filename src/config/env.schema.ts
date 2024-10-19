import { z } from "zod";

const portNumber = z.coerce.number().int().min(1).max(65535).default(8000);

const buildMongoUri = (config: {
  user: string;
  password: string;
  uri: string;
}): string => {
  const baseUri = config.uri.replace("mongodb://", "");
  return `mongodb+srv://${config.user}:${config.password}@${baseUri}`;
};

export const envSchema = z
  .object({
    server: z.object({
      nodeEnv: z
        .enum(["development", "test", "production"])
        .default("development"),
      port: portNumber,
      host: z.string().min(1).default("localhost"),
    }),

    database: z
      .object({
        user: z.string().min(1).describe("MongoDB username"),
        password: z.string().min(1).describe("MongoDB password"),
        uri: z
          .string()
          .url()
          .describe("MongoDB connection URI")
          .transform((uri) => uri.trim()),
      })
      // This transformer creates the full connection string
      .transform((dbConfig) => ({
        ...dbConfig,
        connectionString: buildMongoUri(dbConfig),
      })),
  })
  .strict();

export type EnvConfig = z.infer<typeof envSchema>;
