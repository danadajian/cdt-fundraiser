import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { eq } from "drizzle-orm";

import { purchaseBoxes } from "./backend";
import { db } from "./db";
import { boxesTable } from "./schema";

async function clearAllTables() {
  await db.delete(boxesTable);
}

describe("backend tests", () => {
  beforeAll(async () => {
    Bun.spawnSync(["bun", "drizzle"]);
    await clearAllTables();
  });

  afterAll(async () => {
    await clearAllTables();
    process.exit(0);
  });

  it("prevents me from taking a box that has been taken during my session", async () => {
    await purchaseBoxes({
      name: "Name",
      selectedBoxes: [1, 2, 50],
      raffleTicketsEarned: 1,
    });
    expect(() =>
      purchaseBoxes({
        name: "Name",
        selectedBoxes: [50],
        raffleTicketsEarned: 1,
      }),
    ).toThrow(
      "The following squares have already been taken: 50\nPlease refresh the page and try again!",
    );
    const boxes = await db
      .select()
      .from(boxesTable)
      .where(eq(boxesTable.amount, 50));
    expect(boxes.length).toBe(1);
  });
});
