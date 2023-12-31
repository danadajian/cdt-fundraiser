import { afterAll, afterEach, beforeAll, describe, expect, it } from "bun:test";
import { eq } from "drizzle-orm";

import { purchaseSquares } from "./backend";
import { db } from "./db";
import { squaresTable } from "./schema";

async function clearAllTables() {
  await db.delete(squaresTable);
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

  it("tracks rafffle tickets for each square purchased", async () => {
    await purchaseSquares({
      name: "Name",
      selectedSquares: [1, 52, 115],
    });
    const squares = await db.query.squaresTable.findMany();
    expect(squares.length).toBe(3);
    expect(squares[0]?.raffleTicketsEarned).toBe(0);
    expect(squares[1]?.raffleTicketsEarned).toBe(1);
    expect(squares[2]?.raffleTicketsEarned).toBe(2);
  });

  it("prevents me from taking a square that has been taken during my session", async () => {
    await purchaseSquares({
      name: "Name",
      selectedSquares: [1, 2, 50],
    });
    expect(() =>
      purchaseSquares({
        name: "Name",
        selectedSquares: [50],
      }),
    ).toThrow(
      "The following squares have already been taken: 50\nPlease refresh the page and try again!",
    );
    const squares = await db
      .select()
      .from(squaresTable)
      .where(eq(squaresTable.amount, 50));
    expect(squares.length).toBe(1);
  });
});
