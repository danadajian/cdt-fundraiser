import { createTRPCReact } from "@trpc/react-query";
import type { AnyRouter, inferRouterOutputs } from "@trpc/server";
import { type Router } from "@trpc/server";
import {
  type FetchHandlerRequestOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { type AnyRouterDef } from "@trpc/server/dist/core/router";
import { type Elysia } from "elysia";

import { type AppRouter } from "./router";

export const trpc = createTRPCReact<AppRouter>();

export type RouterOutput = inferRouterOutputs<AppRouter>;

type TRPCOptions = {
  endpoint?: string;
} & Omit<FetchHandlerRequestOptions<AnyRouter>, "req" | "router" | "endpoint">;

export const trpcRouter =
  (
    router: Router<AnyRouterDef>,
    { endpoint = "/trpc", ...options }: TRPCOptions = { endpoint: "/trpc" },
  ) =>
  (app: Elysia) => {
    return app
      .onParse(({ request: { url } }) => {
        if (getPath(url).startsWith(endpoint)) return true;
      })
      .get(`${endpoint}/*`, async ({ request }) => {
        return fetchRequestHandler({
          ...options,
          req: request,
          router,
          endpoint,
        });
      })
      .post(`${endpoint}/*`, async ({ request }) => {
        return fetchRequestHandler({
          ...options,
          req: request,
          router,
          endpoint,
        });
      });
  };

const getPath = (url: string) => {
  const start = url.indexOf("/", 9);
  const end = url.indexOf("?", start);

  if (end === -1) return url.slice(start);

  return url.slice(start, end);
};
