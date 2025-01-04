import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const pools = pgTable("pools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  identifier: varchar("identifier", { length: 256 }).notNull(),
  lottery: varchar("lottery", { length: 256 }).notNull(),
  owner: varchar("owner", { length: 256 }).notNull(),
  drawDate: timestamp("draw_date", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .default(sql`(now())`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => sql`(now())`,
  ),
});

export const poolsRelations = relations(pools, ({ many }) => ({
  bets: many(bets),
}));

export const bets = pgTable(
  "bets",
  {
    id: serial("id").primaryKey(),
    poolId: integer("pool_id")
      .notNull()
      .references(() => pools.id, { onDelete: "cascade" }), // Relacionamento com pools
    name: varchar("name", { length: 256 }),
    numbers: integer("numbers").array().notNull(),
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

export const betsRelations = relations(bets, ({ one }) => ({
  author: one(pools, {
    fields: [bets.poolId],
    references: [pools.id],
  }),
}));
