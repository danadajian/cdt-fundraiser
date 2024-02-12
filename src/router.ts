import { initTRPC } from "@trpc/server";

import {
  getSquares,
  notifyStakeholders,
  purchaseSquares,
  purchaseSquaresInput,
} from "./backend";

const t = initTRPC.create();

export const appRouter = t.router({
  getSquares: t.procedure.query(getSquares),
  purchaseSquares: t.procedure
    .input(purchaseSquaresInput.assert)
    .mutation(async ({ input }) => {
      await purchaseSquares(input);
      if (process.env.ENVIRONMENT === "production") {
        try {
          await notifyStakeholders(input);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }),
});

export type AppRouter = typeof appRouter;
