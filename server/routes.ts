import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get meals by day
  app.get("/api/meals/:day", async (req, res) => {
    try {
      const day = req.params.day;
      const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      
      if (!validDays.includes(day)) {
        return res.status(400).json({ message: "Invalid day of week" });
      }

      const meals = await storage.getMealsByDay(day);
      res.json(meals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });

  // Get all meals
  app.get("/api/meals", async (req, res) => {
    try {
      const meals = await storage.getAllMeals();
      res.json(meals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });

  // Get meal by ID
  app.get("/api/meal/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const meal = await storage.getMealById(id);
      
      if (!meal) {
        return res.status(404).json({ message: "Meal not found" });
      }

      res.json(meal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
