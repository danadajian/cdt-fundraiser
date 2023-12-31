import { TRPCError } from "@trpc/server";
import { type } from "arktype";

import { db } from "./db";
import { squaresTable } from "./schema";
import { countRaffleTickets } from "./utils";

export function getSquares() {
  return db.query.squaresTable.findMany();
}

export const purchaseSquaresInput = type({
  name: "string>0",
  selectedSquares: "number[]>0",
});

export async function purchaseSquares({
  name,
  selectedSquares,
}: typeof purchaseSquaresInput.infer) {
  const squares = await getSquares();
  const squaresAlreadyTaken = squares
    .filter(({ amount }) => selectedSquares.includes(amount))
    .map(({ amount }) => amount);
  if (squaresAlreadyTaken.length) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `The following squares have already been taken: ${squaresAlreadyTaken.join()}\nPlease refresh the page and try again!`,
    });
  }
  return db.insert(squaresTable).values(
    selectedSquares.map((amount) => ({
      name,
      amount,
      raffleTicketsEarned: countRaffleTickets(amount),
    })),
  );
}
