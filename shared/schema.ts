import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dictionaries = pgTable("dictionaries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  word: text("word").notNull(),
  type: text("type").notNull(), // kata benda, kata kerja, etc.
  pronunciation: text("pronunciation"),
  definition: text("definition").notNull(),
  example: text("example"),
  synonyms: text("synonyms").array(),
  dictionary_type: text("dictionary_type").notNull(), // kbbi, english, tesaurus
  createdAt: timestamp("created_at").defaultNow(),
});

export const searchLogs = pgTable("search_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  query: text("query").notNull(),
  results_count: text("results_count"),
  dictionary_type: text("dictionary_type"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertDictionarySchema = createInsertSchema(dictionaries).pick({
  word: true,
  type: true,
  pronunciation: true,
  definition: true,
  example: true,
  synonyms: true,
  dictionary_type: true,
});

export const searchSchema = z.object({
  query: z.string().min(1),
  dictionary_type: z.enum(["kbbi", "english", "tesaurus"]).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDictionary = z.infer<typeof insertDictionarySchema>;
export type Dictionary = typeof dictionaries.$inferSelect;
export type SearchQuery = z.infer<typeof searchSchema>;
