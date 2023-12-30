import { type } from "arktype";

export const envSchema = type({
  "ENVIRONMENT?": "'development' | 'production'",
  PORT: "string",
  POSTGRES_URL: "string",
});
const { data, problems } = envSchema(process.env);
if (problems) {
  throw new Error(`Environment schema invalid. ${problems.summary}`);
}
export const environmentVariables = data;
