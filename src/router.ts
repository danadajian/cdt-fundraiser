import { initTRPC } from "@trpc/server";

import { getBoxes } from "./boxes";

const t = initTRPC.create();

export const appRouter = t.router({
  getBoxes: t.procedure.query(getBoxes),
});

export type AppRouter = typeof appRouter;
