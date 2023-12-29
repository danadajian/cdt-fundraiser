import { TRPCError } from "@trpc/server";
import { type } from "arktype";

import { db } from "./db";
import { boxesTable } from "./schema";

export function getBoxes() {
  return db.query.boxesTable.findMany();
}

export const purchaseBoxesInput = type({
  name: "string>0",
  selectedBoxes: "number[]>0",
  raffleTicketsEarned: "number",
});

export async function purchaseBoxes({
  name,
  selectedBoxes,
  raffleTicketsEarned,
}: typeof purchaseBoxesInput.infer) {
  const boxes = await getBoxes();
  const boxesAlreadyTaken = boxes
    .filter(({ amount }) => selectedBoxes.includes(amount))
    .map(({ amount }) => amount);
  if (boxesAlreadyTaken.length) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `The following squares have already been taken: ${boxesAlreadyTaken.join()}\nPlease refresh the page and try again!`,
    });
  }
  return db.insert(boxesTable).values(
    selectedBoxes.map((amount) => ({
      name,
      amount,
      raffleTicketsEarned,
    })),
  );
}
