# Overview

KamusKu is a modern web-based Indonesian and English dictionary application built with a full-stack architecture. It provides comprehensive dictionary services including KBBI (Indonesian dictionary), English dictionary, and Tesaurus functionality. The application serves as an online resource for users to search word definitions, pronunciations, examples, and synonyms across multiple dictionary types.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui for consistent, accessible design system
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Management**: Express sessions with configurable storage (memory/PostgreSQL)
- **API Design**: RESTful endpoints with proper HTTP status codes and JSON responses
- **Request Handling**: Express middleware for logging, error handling, and request parsing

## Data Layer
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database**: PostgreSQL with Neon serverless database integration
- **Schema**: Structured tables for users, dictionaries, and search logs with UUID primary keys
- **Migrations**: Drizzle Kit for database schema versioning and deployment
- **Storage Abstraction**: Interface-based storage layer supporting both memory and database backends

## Authentication & Authorization
- **Strategy**: Session-based authentication with secure password hashing using Node.js scrypt
- **Session Storage**: Configurable session store (memory for development, PostgreSQL for production)
- **Password Security**: Salt-based hashing with timing-safe comparison
- **Route Protection**: Middleware-based authentication checks for admin routes
- **User Management**: Full user lifecycle with registration, login, and session management

## Application Features
- **Multi-Dictionary Search**: Support for KBBI, English, and Tesaurus dictionary types
- **Auto-suggestions**: Real-time search suggestions with debounced API calls
- **Admin Dashboard**: Full CRUD operations for dictionary entries with form validation
- **Responsive Design**: Mobile-first approach with adaptive UI components
- **Search Analytics**: Logging of search queries for usage analytics

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database driver for cloud-native database connectivity
- **drizzle-orm**: Type-safe ORM for database operations with PostgreSQL dialect support
- **@tanstack/react-query**: Server state management library for caching and synchronization
- **express & passport**: Backend framework with authentication middleware

## UI & Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework for responsive design
- **class-variance-authority**: Utility for creating component variants with Tailwind
- **lucide-react**: Consistent icon library with React components

## Development & Build Tools
- **vite**: Fast build tool with hot module replacement and optimized bundling
- **typescript**: Static type checking for enhanced developer experience
- **react-hook-form**: Performant form library with validation support
- **zod**: Schema validation library for runtime type safety

## Session & Security
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **express-session**: Session middleware with configurable storage backends
- **bcrypt/scrypt**: Secure password hashing utilities (Node.js built-in scrypt implementation)

## Utility Libraries
- **date-fns**: Modern date manipulation library
- **wouter**: Minimalist routing library for React applications
- **nanoid**: Secure URL-friendly unique ID generator