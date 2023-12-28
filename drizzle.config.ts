import { defineConfig } from "drizzle-kit";

import { environmentVariables } from "./src/env";

export default defineConfig({
  schema: "./src/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: environmentVariables.POSTGRES_URL,
  },
});
