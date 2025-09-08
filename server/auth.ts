import session from "express-session";
import bcrypt from "bcryptjs";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: sessionTtl,
    },
  });
}

export function setupAuth(app: Express) {
  app.use(getSession());
}

export const requireAuth: RequestHandler = async (req, res, next) => {
  const session = req.session as any;
  
  if (!session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const user = await storage.getUser(session.userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  req.user = user;
  next();
};

export async function initializeAdminUser() {
  try {
    // Check if admin user already exists
    const existingUser = await storage.getUserByUsername("hcanning");
    if (!existingUser) {
      // Create the admin user with hashed password
      const hashedPassword = await bcrypt.hash("technics1", 10);
      await storage.createUser({
        username: "hcanning",
        password: hashedPassword,
        role: "admin"
      });
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}