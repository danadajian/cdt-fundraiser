import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const squaresTable = pgTable("squares", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  raffleTicketsEarned: integer("raffleTicketsEarned").notNull(),
  purchaseDate: timestamp("purchaseDate").notNull().defaultNow(),
});
