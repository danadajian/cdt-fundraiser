import { type } from "arktype";

const envSchema = type({
  "ENVIRONMENT?": "'development' | 'production'",
  PORT: "string",
  POSTGRES_URL: "string",
});

type EnvSchema = typeof envSchema.infer;
declare global {
  namespace NodeJS {
    // eslint-disable-next-line
    interface ProcessEnv extends EnvSchema {}
  }
}

export function validateEnvironmentVariables() {
  const { problems } = envSchema(process.env);
  if (problems) {
    throw new Error(`Environment schema invalid. ${problems.summary}`);
  }
}
