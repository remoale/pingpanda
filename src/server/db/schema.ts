import { pgTable, pgEnum, integer, serial, text, timestamp, index, varchar } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

export const planEnum = pgEnum("plan", ["FREE", "PRO"])

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    externalId: text("externalId").unique(),

    quotaLimit: integer("quotaLimit"),
    plan: planEnum().default("FREE"),

    email: text("email").unique(),
    apiKey: text("apiKey").unique().$defaultFn(() => createId()),
    discordId: text("discordId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),

    eventCategories: 
  }
)

export const eventCategory = pgTable(
  "eventCategory",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name"),
    color: integer("color"),
    emoji: text("emoji"),

    user: user,
    userId: text("userId"),

  }
)