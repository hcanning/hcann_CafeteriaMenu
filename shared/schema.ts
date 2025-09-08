import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const meals = pgTable("meals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  calories: integer("calories").notNull(),
  protein: decimal("protein", { precision: 5, scale: 1 }).notNull(),
  carbs: decimal("carbs", { precision: 5, scale: 1 }).notNull(),
  fat: decimal("fat", { precision: 5, scale: 1 }).notNull(),
  ingredients: text("ingredients").notNull(),
  allergens: text("allergens").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  dayOfWeek: varchar("day_of_week", { length: 10 }).notNull(), // Monday, Tuesday, etc.
  isVegetarian: boolean("is_vegetarian").notNull().default(false),
  isVegan: boolean("is_vegan").notNull().default(false),
  isGlutenFree: boolean("is_gluten_free").notNull().default(false),
  isDairyFree: boolean("is_dairy_free").notNull().default(false),
  isKeto: boolean("is_keto").notNull().default(false),
  isLowSodium: boolean("is_low_sodium").notNull().default(false),
  isPescatarian: boolean("is_pescatarian").notNull().default(false),
  isSpicy: boolean("is_spicy").notNull().default(false),
});

export const insertMealSchema = createInsertSchema(meals).omit({
  id: true,
});

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = typeof meals.$inferSelect;
