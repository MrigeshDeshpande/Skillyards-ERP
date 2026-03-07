# Skillyards ERP — System Architecture

## Overview

Skillyards ERP is a full-stack web application designed to manage internal operations including:

* CRM (leads, enquiries, admissions)
* Academic management
* HR
* Marketing
* Analytics
* Notifications

The system is built as a **single full-stack application** using:

* Next.js
* Drizzle ORM
* Neon

---

# High Level Architecture

```
Browser
   │
   ▼
Next.js Application
   │
   ├── UI (React Components)
   ├── API Routes
   ├── Server Components
   │
   ▼
Service Layer
   │
   ▼
Database Layer (Drizzle ORM)
   │
   ▼
PostgreSQL (Neon)
```

---

# Application Layers

The system follows a layered architecture.

## 1. UI Layer

Located in:

```
src/components
src/app
```

Responsibilities:

* Render UI
* Handle user interactions
* Call APIs
* Display data

Technologies:

* React
* TailwindCSS
* ShadCN UI

---

## 2. Routing Layer

Located in:

```
src/app
```

Next.js App Router handles:

* page routing
* API routes
* layouts
* middleware

Example routes:

```
/admin/dashboard
/admin/users
/admin/enquiries
/api/jobs
/api/contact
```

---

## 3. API Layer

Located in:

```
src/app/api
```

API routes handle server logic.

Example:

```
src/app/api/test/route.js
```

Example flow:

```
HTTP Request
   ↓
API Route
   ↓
Service Layer
   ↓
Database
   ↓
JSON Response
```

---

## 4. Service Layer

Located in:

```
src/services
```

Purpose:

Keep business logic outside of routes.

Example services:

```
user.service.js
job.service.js
enquiry.service.js
```

Example responsibilities:

* validation
* workflow logic
* calling database queries

---

## 5. Database Layer

Located in:

```
src/db
```

Files:

```
index.js
schema.js
```

Responsibilities:

* database connection
* schema definitions
* queries

Database ORM:

Drizzle ORM

---

## 6. Integration Layer

Located in:

```
src/lib
```

Handles integrations such as:

```
auth.js
email.js
ga4.js
openai.js
qrcode.js
webpush.js
```

These modules integrate external services.

---

# Database Architecture

Database is hosted on:

Neon

Schema is defined in:

```
src/db/schema.js
```

Migrations are handled by:

```
drizzle-kit
```

Commands:

```
npm run db:generate
npm run db:push
```

---

# Core Domain Modules

The ERP is organized into domain modules.

## Core System

```
users
roles
permissions
audit_logs
notifications
```

---

## CRM

```
leads
enquiries
followups
notes
contacts
```

Workflow:

```
Lead → Enquiry → Counselling → Admission → Student
```

---

## Academic Management

```
programmes
batches
students
attendance
teachers
```

---

## HR

```
employees
job_roles
job_applications
```

---

## Marketing

```
subscribers
visitor_logs
feedback
campaigns
```

---

# Background Jobs

Certain tasks run asynchronously:

Examples:

```
send feedback emails
generate analytics reports
cleanup logs
```

Currently handled via:

```
Vercel Cron Jobs
```

Future scaling may introduce:

```
Redis
Queue Workers
```

---

# Deployment Architecture

Production deployment uses:

* Vercel
* Neon

Deployment flow:

```
GitHub
   ↓
Vercel CI/CD
   ↓
Production Deployment
```

---

# Project Directory Structure

```
src
 ├ app
 │   ├ (admin)
 │   ├ (auth)
 │   └ api
 │
 ├ components
 ├ db
 ├ lib
 ├ services
 ├ validations
 └ types
```

---

# Development Workflow

Typical developer workflow:

```
1. Create schema changes
2. Generate migration
3. Push migration
4. Implement service logic
5. Implement API route
6. Build UI
```

Commands:

```
npm run db:generate
npm run db:push
npm run dev
```

---

# Future Architecture Evolution

If the system scales significantly, architecture may evolve into:

```
Next.js Frontend
Node.js API Server
Worker Services
Redis Queue
PostgreSQL Cluster
```

However current architecture supports:

```
Admin Dashboard
CRM
ERP Modules
Analytics
Notifications
```

---

# Maintainers

```
Skillyards Engineering Team
```

---
