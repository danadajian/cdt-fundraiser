import { initTRPC } from "@trpc/server";

import { getSquares, purchaseSquares, purchaseSquaresInput } from "./backend";

const t = initTRPC.create();

export const appRouter = t.router({
  getSquares: t.procedure.query(getSquares),
  purchaseSquares: t.procedure
    .input(purchaseSquaresInput.assert)
    .mutation(({ input }) => purchaseSquares(input)),
});

export type AppRouter = typeof appRouter;
