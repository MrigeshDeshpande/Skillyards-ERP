# Skillyards ERP — Development Workflow

## Overview

This document defines the **standard workflow for developing features** in the Skillyards ERP system.

The stack used is:

* Next.js
* Drizzle ORM
* Neon

Every feature must follow the same pipeline:

```
Database
   ↓
Service Layer
   ↓
API Route
   ↓
UI
```

This ensures the system remains **predictable and maintainable**.

---

# Feature Development Pipeline

When building any new feature, follow these steps.

```
1️⃣ Design schema
2️⃣ Update schema.js
3️⃣ Generate migration
4️⃣ Push migration
5️⃣ Create service logic
6️⃣ Create API route
7️⃣ Build UI
8️⃣ Test
```

---

# Step 1 — Design the Data Model

Before writing code, define the data structure.

Example:

```
Feature: Enquiry Management
```

Required fields:

```
first_name
last_name
email
mobile
programme_id
status
```

Relationships:

```
programme_id → programmes.id
counsellor_id → users.id
```

Always document the schema change first.

---

# Step 2 — Update Database Schema

Edit:

```
src/db/schema/
```

Example:

```
crm.schema.js
```

Example table:

```javascript
export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  mobile: text("mobile"),
  programmeId: uuid("programme_id"),
  createdAt: timestamp("created_at").defaultNow()
});
```

---

# Step 3 — Generate Migration

Run:

```bash
npm run db:generate
```

This creates migration SQL inside:

```
drizzle/
```

---

# Step 4 — Apply Migration

Push schema to database:

```bash
npm run db:push
```

This updates the Neon PostgreSQL database.

---

# Step 5 — Create Service Layer

Business logic lives in:

```
src/services
```

Example:

```
enquiry.service.js
```

Example:

```javascript
import { db } from "../db";
import { enquiries } from "../db/schema";

export async function createEnquiry(data) {
  return db.insert(enquiries).values(data);
}
```

Service layer handles:

```
validation
workflow logic
database interaction
```

API routes should remain **thin**.

---

# Step 6 — Create API Route

Location:

```
src/app/api/
```

Example:

```
src/app/api/enquiries/route.js
```

Example:

```javascript
import { NextResponse } from "next/server";
import { createEnquiry } from "@/services/enquiry.service";

export async function POST(req) {
  const body = await req.json();
  const result = await createEnquiry(body);

  return NextResponse.json(result);
}
```

---

# Step 7 — Build UI

Location:

```
src/app/(admin)
```

Example page:

```
/admin/enquiries
```

UI components should live in:

```
src/components
```

Examples:

```
tables
forms
charts
```

Use:

* React Hook Form
* Zod validation
* ShadCN UI components

---

# Step 8 — Testing

Verify the feature through:

```
API test
UI test
Database verification
```

Example:

```
POST /api/enquiries
```

Check:

```
database row inserted
UI updates correctly
```

---

# Development Commands

Start development server:

```bash
npm run dev
```

Generate database migration:

```bash
npm run db:generate
```

Apply migration:

```bash
npm run db:push
```

Clear Next.js cache:

```bash
npm run clean
```

---

# Git Workflow

Recommended workflow:

```
main
│
├── feature/enquiries
├── feature/jobs
├── feature/analytics
```

Example process:

```
1. create branch
2. implement feature
3. open pull request
4. code review
5. merge to main
```

---

# Code Organization Rules

Follow these rules strictly.

### API routes

```
src/app/api
```

### Business logic

```
src/services
```

### Database layer

```
src/db
```

### UI components

```
src/components
```

Never mix layers.

---

# Folder Structure

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

# Engineering Principles

Every feature should follow:

```
Single responsibility
Separation of concerns
Predictable structure
```

This ensures the ERP remains **scalable and maintainable**.

---

# Maintainers

```
Skillyards Engineering Team
```

---

