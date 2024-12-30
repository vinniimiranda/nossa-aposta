import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export const bets = pgTable(
  "bets",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    numbers: varchar("numbers", { length: 256 }).notNull(),
    identifier: varchar("identifier", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" })
      .default(sql`(now())`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => sql`(now())`,
    ),
  },
  (config) => ({
    identifier: index("name_idx").on(config.identifier),
  }),
);
