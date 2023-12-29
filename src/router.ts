import { initTRPC } from "@trpc/server";

import { getBoxes, purchaseBoxes, purchaseBoxesInput } from "./backend";

const t = initTRPC.create();

export const appRouter = t.router({
  getBoxes: t.procedure.query(getBoxes),
  purchaseBoxes: t.procedure
    .input(purchaseBoxesInput.assert)
    .mutation(({ input }) => purchaseBoxes(input)),
});

export type AppRouter = typeof appRouter;
