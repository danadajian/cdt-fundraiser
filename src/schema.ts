import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const boxes = pgTable("boxes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  updated: timestamp("updated").notNull().defaultNow(),
});
