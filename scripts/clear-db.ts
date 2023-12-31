import { db } from "../src/db";
import { squaresTable } from "../src/schema";

await db.delete(squaresTable);
process.exit(0);
