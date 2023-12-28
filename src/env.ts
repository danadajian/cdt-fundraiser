import { type } from "arktype";

export const envSchema = type({
  "PORT?": "string",
  "ENVIRONMENT?": "'development' | 'production'",
  POSTGRES_URL: "string",
});
const { data, problems } = envSchema(process.env);
if (problems) {
  throw new Error(`Environment schema invalid. ${problems.summary}`);
}
export const environmentVariables = data;
