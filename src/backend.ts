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

export function purchaseBoxes({
  name,
  selectedBoxes,
  raffleTicketsEarned,
}: typeof purchaseBoxesInput.infer) {
  return db.insert(boxesTable).values(
    selectedBoxes.map((amount) => ({
      name,
      amount,
      raffleTicketsEarned,
    })),
  );
}
