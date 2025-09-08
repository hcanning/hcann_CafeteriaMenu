# Campus Eats - University Meal Management System

## Overview

Campus Eats is a full-stack web application designed for university dining services to manage and display daily meal offerings. The system provides students with an intuitive interface to browse meals by day of the week, view detailed nutritional information, and filter options based on dietary preferences and price ranges. The application features a modern React frontend with a comprehensive component library and a Node.js/Express backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible interface components
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Structure**: RESTful endpoints for meal retrieval by day and individual meal details
- **Error Handling**: Centralized middleware for consistent error responses
- **Request Logging**: Custom middleware for API request monitoring and debugging

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Single meals table with comprehensive meal attributes including nutritional data and dietary flags
- **Development Storage**: In-memory storage implementation for development and testing
- **Migration Management**: Drizzle Kit for database schema migrations

### Component Architecture
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Component Structure**: Modular components for meal cards, filters, navigation, and modal dialogs
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG-compliant components with proper ARIA attributes

### Key Features
- **Day-based Navigation**: Dynamic meal filtering by day of the week
- **Advanced Filtering**: Price range and dietary restriction filters (vegetarian, vegan, gluten-free, etc.)
- **Search Functionality**: Real-time search across meal names and descriptions
- **Detailed Views**: Modal-based meal detail displays with comprehensive information
- **Nutritional Information**: Complete macronutrient breakdown and calorie counts
- **Allergen Management**: Clear allergen information and warnings

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and data fetching with caching
- **wouter**: Lightweight React routing solution
- **drizzle-orm**: Type-safe PostgreSQL ORM with schema validation
- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connections

### UI Component Libraries
- **@radix-ui**: Complete set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **lucide-react**: Modern icon library with consistent design
- **class-variance-authority**: Utility for creating variant-based component APIs
- **tailwind-merge**: Intelligent Tailwind class merging utility

### Development and Build Tools
- **vite**: Fast build tool with hot module replacement
- **typescript**: Static type checking for enhanced developer experience
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **drizzle-kit**: Database migration and schema management tool

### Database and Storage
- **PostgreSQL**: Primary database for persistent meal data storage
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **zod**: Schema validation library for runtime type checking

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique ID generator

The application follows a modern full-stack architecture with clear separation of concerns between the client and server layers, utilizing industry-standard libraries and patterns for maintainability and scalability.