import { pgTable, pgEnum, integer, text, timestamp, uniqueIndex, json, index } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from 'drizzle-orm'

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

  }
)

export const userRelations = relations(user, ({ many }) => ({
  eventCategory: many(eventCategory),
  event: many(event),
  quota: many(quota)
}))

export const eventCategory = pgTable(
  "eventCategory",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name"),
    color: integer("color"),
    emoji: text("emoji"),

    userId: text("userId").references(() => user.id).notNull(),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("name_user_id_unique_idx").on(table.name, table.userId),
  ]
)

export const eventCategoryRelations = relations(eventCategory, ({ one, many }) => ({
  userId: one(user, {
    fields: [eventCategory.userId],
    references: [user.id],
  }),
  events: many(event)
}))

export const deliveryStatusEnum = pgEnum("deliveryStatus", ["PENDING", "DELIVERED", "FAILED"])

export const event = pgTable(
  "event",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    formattedMessage: text("formattedMessage"),

    userId: text("userId").references(() => user.id).notNull(),

    name: text("name"),
    fields: json("fields"),

    deliveryStatus: deliveryStatusEnum().default("PENDING"),
    
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    index("created_at_idx").on(table.createdAt)
  ]
)

export const eventRelations = relations(event, ({ one }) => ({
  userId: one(user, {
    fields: [event.userId],
    references: [user.id],
  }),
  eventCategoryId: one(eventCategory, {
    fields: [event.id],
    references: [eventCategory.id],
  })
}))

export const quota = pgTable(
  "quota",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    userId: text("userId").references(() => user.id).notNull(),

    year: integer("year"),
    month: integer("month"),
    count: integer("count").default(0),

    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const quotaRelations = relations(quota, ({ one }) => ({
  userId: one(user, {
    fields: [quota.userId],
    references: [user.id],
  })
}))