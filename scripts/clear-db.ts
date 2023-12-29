import { db } from "../src/db";
import { boxesTable } from "../src/schema";

await db.delete(boxesTable);
process.exit(0);
