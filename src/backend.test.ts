import { afterAll, afterEach, beforeAll, describe, expect, it } from "bun:test";
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

  afterEach(async () => {
    await clearAllTables();
  });

  afterAll(() => {
    process.exit(0);
  });

  it("tracks rafffle tickets for each box purchased", async () => {
    await purchaseBoxes({
      name: "Name",
      selectedBoxes: [1, 52, 115],
    });
    const boxes = await db.query.boxesTable.findMany();
    expect(boxes.length).toBe(3);
    expect(boxes[0]?.raffleTicketsEarned).toBe(0);
    expect(boxes[1]?.raffleTicketsEarned).toBe(1);
    expect(boxes[2]?.raffleTicketsEarned).toBe(2);
  });

  it("prevents me from taking a box that has been taken during my session", async () => {
    await purchaseBoxes({
      name: "Name",
      selectedBoxes: [1, 2, 50],
    });
    expect(() =>
      purchaseBoxes({
        name: "Name",
        selectedBoxes: [50],
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
