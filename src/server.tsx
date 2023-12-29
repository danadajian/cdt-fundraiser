import { staticPlugin } from "@elysiajs/static";
import Elysia from "elysia";
import { HotModuleReload, hotModuleReload } from "elysia-hot-module-reload";
import React from "react";
import { renderToReadableStream } from "react-dom/server";

import { App } from "./app";
import { environmentVariables } from "./env";
import { appRouter } from "./router";
import { trpcRouter } from "./trpc";

await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
  minify: true,
});

const isDev = environmentVariables.ENVIRONMENT === "development";

const app = new Elysia()
  .get("/health", () => "all good")
  .get("*", async () => {
    const stream = await renderToReadableStream(
      <>
        <App />
        {isDev && (
          <>
            <script src="https://cdn.tailwindcss.com" />
            <HotModuleReload />
          </>
        )}
      </>,
      {
        bootstrapScripts: ["/public/client.js"],
      },
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .use(trpcRouter(appRouter))
  .use(staticPlugin())
  .listen(environmentVariables.PORT ?? 8080);

if (isDev) {
  app.use(hotModuleReload());
}

// eslint-disable-next-line no-console
console.info(
  `App is running at http://${app.server?.hostname}:${app.server?.port}`,
);
