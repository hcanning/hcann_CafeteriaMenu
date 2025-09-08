import { type Meal, type InsertMeal } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getMealsByDay(dayOfWeek: string): Promise<Meal[]>;
  getAllMeals(): Promise<Meal[]>;
  getMealById(id: string): Promise<Meal | undefined>;
  createMeal(meal: InsertMeal): Promise<Meal>;
}

export class MemStorage implements IStorage {
  private users: Map<string, any>;
  private meals: Map<string, Meal>;

  constructor() {
    this.users = new Map();
    this.meals = new Map();
    this.initializeMeals();
  }

  private initializeMeals() {
    const mealsData: InsertMeal[] = [
      // Monday meals
      {
        name: "Fish & Chips",
        description: "Crispy beer-battered cod with golden fries and tartar sauce",
        price: "9.99",
        calories: 540,
        protein: "25.0",
        carbs: "45.0",
        fat: "22.0",
        ingredients: "Cod fillet, beer batter (flour, beer, salt), potatoes, vegetable oil, tartar sauce (mayonnaise, pickles, capers)",
        allergens: "Contains: Fish, Gluten, Eggs. May contain traces of soy.",
        imageUrl: "https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        dayOfWeek: "Monday",
        isPescatarian: true,
      },
      {
        name: "Mediterranean Bowl",
        description: "Grilled chicken with quinoa, fresh vegetables, and tzatziki",
        price: "11.49",
        calories: 420,
        protein: "28.0",
        carbs: "35.0",
        fat: "12.0",
        ingredients: "Grilled chicken breast, quinoa, cucumber, cherry tomatoes, red onion, kalamata olives, feta cheese, mixed greens, tzatziki sauce",
        allergens: "Contains: Dairy. May contain traces of nuts.",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.6",
        dayOfWeek: "Monday",
        isGlutenFree: true,
      },
      {
        name: "Campus Gourmet Burger",
        description: "Angus beef patty with cheese, lettuce, tomato, and sweet potato fries",
        price: "12.99",
        calories: 680,
        protein: "32.0",
        carbs: "52.0",
        fat: "28.0",
        ingredients: "Angus beef patty, brioche bun, cheddar cheese, lettuce, tomato, red onion, special sauce, sweet potato fries",
        allergens: "Contains: Gluten, Dairy, Eggs. May contain traces of soy.",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        dayOfWeek: "Monday",
      },
      {
        name: "Rainbow Buddha Bowl",
        description: "Colorful mix of roasted vegetables, chickpeas, and tahini dressing",
        price: "10.49",
        calories: 380,
        protein: "15.0",
        carbs: "48.0",
        fat: "14.0",
        ingredients: "Roasted sweet potato, chickpeas, quinoa, red cabbage, carrots, broccoli, tahini dressing, pumpkin seeds",
        allergens: "Contains: Sesame. May contain traces of nuts.",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        dayOfWeek: "Monday",
        isVegan: true,
        isGlutenFree: true,
      },
      {
        name: "Chicken Alfredo Pasta",
        description: "Creamy alfredo sauce with grilled chicken and fresh herbs",
        price: "13.49",
        calories: 620,
        protein: "35.0",
        carbs: "58.0",
        fat: "24.0",
        ingredients: "Grilled chicken breast, fettuccine pasta, cream, parmesan cheese, garlic, herbs, butter",
        allergens: "Contains: Gluten, Dairy. May contain traces of eggs.",
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        dayOfWeek: "Monday",
      },
      {
        name: "Sushi Combo Platter",
        description: "Fresh salmon and tuna rolls with miso soup and edamame",
        price: "15.99",
        calories: 450,
        protein: "22.0",
        carbs: "55.0",
        fat: "12.0",
        ingredients: "Sushi rice, nori, salmon, tuna, cucumber, avocado, wasabi, pickled ginger, soy sauce, miso soup, edamame",
        allergens: "Contains: Fish, Soy. May contain traces of shellfish.",
        imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.7",
        dayOfWeek: "Monday",
        isGlutenFree: true,
        isPescatarian: true,
      },
      {
        name: "Korean BBQ Bowl",
        description: "Marinated beef bulgogi with steamed rice and kimchi",
        price: "12.49",
        calories: 520,
        protein: "28.0",
        carbs: "45.0",
        fat: "18.0",
        ingredients: "Marinated beef bulgogi, steamed rice, kimchi, bean sprouts, carrots, sesame oil, scallions",
        allergens: "Contains: Soy, Sesame. May contain traces of gluten.",
        imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.4",
        dayOfWeek: "Monday",
        isSpicy: true,
      },
      {
        name: "Garden Fresh Salad",
        description: "Mixed greens with seasonal vegetables and choice of dressing",
        price: "8.99",
        calories: 220,
        protein: "8.0",
        carbs: "18.0",
        fat: "12.0",
        ingredients: "Mixed greens, cherry tomatoes, cucumber, carrots, red onion, croutons, choice of dressing",
        allergens: "Contains: Gluten (croutons). Dressing may contain dairy, eggs.",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.1",
        dayOfWeek: "Monday",
        isVegetarian: true,
      },
      {
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomato sauce, and basil on crispy crust",
        price: "11.99",
        calories: 480,
        protein: "18.0",
        carbs: "58.0",
        fat: "16.0",
        ingredients: "Pizza dough, tomato sauce, fresh mozzarella, fresh basil, olive oil, oregano",
        allergens: "Contains: Gluten, Dairy. May contain traces of eggs.",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        dayOfWeek: "Monday",
        isVegetarian: true,
      },
      {
        name: "All-Day Breakfast Burrito",
        description: "Scrambled eggs, cheese, potatoes, and salsa in a warm tortilla",
        price: "9.49",
        calories: 460,
        protein: "20.0",
        carbs: "42.0",
        fat: "22.0",
        ingredients: "Scrambled eggs, cheddar cheese, hash browns, salsa, flour tortilla, bell peppers, onions",
        allergens: "Contains: Gluten, Dairy, Eggs. May contain traces of soy.",
        imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        rating: "4.2",
        dayOfWeek: "Monday",
        isVegetarian: true,
      },
    ];

    // Add meals for other days (simplified for brevity)
    const days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach(day => {
      mealsData.forEach(meal => {
        const dayMeal = { 
          ...meal, 
          dayOfWeek: day,
          isVegetarian: meal.isVegetarian || false,
          isVegan: meal.isVegan || false,
          isGlutenFree: meal.isGlutenFree || false,
          isDairyFree: meal.isDairyFree || false,
          isKeto: meal.isKeto || false,
          isLowSodium: meal.isLowSodium || false,
          isPescatarian: meal.isPescatarian || false,
          isSpicy: meal.isSpicy || false,
        };
        mealsData.push(dayMeal);
      });
    });

    mealsData.forEach(meal => {
      const id = randomUUID();
      const fullMeal: Meal = { 
        ...meal, 
        id,
        isVegetarian: meal.isVegetarian || false,
        isVegan: meal.isVegan || false,
        isGlutenFree: meal.isGlutenFree || false,
        isDairyFree: meal.isDairyFree || false,
        isKeto: meal.isKeto || false,
        isLowSodium: meal.isLowSodium || false,
        isPescatarian: meal.isPescatarian || false,
        isSpicy: meal.isSpicy || false,
      };
      this.meals.set(id, fullMeal);
    });
  }

  async getUser(id: string): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = randomUUID();
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMealsByDay(dayOfWeek: string): Promise<Meal[]> {
    return Array.from(this.meals.values()).filter(
      (meal) => meal.dayOfWeek === dayOfWeek,
    );
  }

  async getAllMeals(): Promise<Meal[]> {
    return Array.from(this.meals.values());
  }

  async getMealById(id: string): Promise<Meal | undefined> {
    return this.meals.get(id);
  }

  async createMeal(insertMeal: InsertMeal): Promise<Meal> {
    const id = randomUUID();
    const meal: Meal = { ...insertMeal, id };
    this.meals.set(id, meal);
    return meal;
  }
}

export const storage = new MemStorage();
