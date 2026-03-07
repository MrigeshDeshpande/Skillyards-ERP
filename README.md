# Skillyards ERP

Skillyards ERP is an internal management system designed to support operations such as CRM, enquiries, hiring, analytics, and administrative workflows.

The application is built as a full-stack system using modern web technologies.

## Tech Stack

* Next.js
* Drizzle ORM
* PostgreSQL
* Neon
* Tailwind CSS
* React Hook Form
* Shadcn UI
* Zod

## Features

* Admin dashboard
* Programme management
* Job roles and applications
* Marketing analytics
* QR code tracking
* Notifications system
* Role-based access control (RBAC)

---

# Project Structure

```
src
 ├ app
 │   ├ (admin)        → Admin dashboard routes
 │   ├ (auth)         → Authentication pages
 │   └ api            → Backend API routes
 │
 ├ components         → Reusable UI components
 ├ db                 → Database schema and client
 │   ├ index.js
 │   └ schema
 │
 ├ lib                → External integrations
 ├ services           → Business logic layer
 ├ validations        → Zod validation schemas
 └ types              → Shared types
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/MrigeshDeshpande/Skillyards-ERP.git
cd skillyards-erp
```

---

## 2. Setup Environment Variables

Create a `.env` file.

Example:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

Example with Neon:

```
DATABASE_URL=postgresql://neondb_owner:password@ep-xxxxx.aws.neon.tech/neondb?sslmode=require
```

---

## 3. First-Time Setup

Run the setup script:

```bash
npm run setup
```

This will automatically:

```
install dependencies
apply database schema
```

---

## 4. Start Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

# Database Commands

Generate migration after schema changes:

```bash
npm run db:generate
```

Apply migration to database:

```bash
npm run db:push
```

---

# API Verification

To confirm the backend is working, open:

```
http://localhost:3000/api/test
```

Expected response:

```json
{
  "success": true,
  "data": []
}
```

This confirms:

```
Next.js API
↓
Drizzle ORM
↓
Neon PostgreSQL
```

---

# Development Workflow

Feature development follows this pipeline:

```
Schema
↓
Service
↓
API Route
↓
UI
```

Example:

```
src/db/schema
src/services
src/app/api
src/app/(admin)
```

---

# Useful Commands

Start development server:

```bash
npm run dev
```

Generate migrations:

```bash
npm run db:generate
```

Push schema to database:

```bash
npm run db:push
```

Clear Next.js cache:

```bash
npm run clean
```

---

# Engineering Principles

The system follows:

```
Layered architecture
Service-based logic
RBAC permissions model
UUID primary keys
Modular domain design
```

This ensures the system remains scalable as the ERP grows.

---

# Deployment

Recommended deployment stack:

* Vercel — application hosting
* Neon — database

Deployment is typically handled through GitHub → Vercel CI/CD.

---

# Documentation

Project documentation is available in the `docs` directory:

```
docs/
 ├ LOCAL_SETUP.md
 ├ ARCHITECTURE.md
 ├ DATABASE_ARCHITECTURE.md
 ├ DEVELOPMENT_WORKFLOW.md
```

---

# Maintainers

Skillyards Engineering Team

---
