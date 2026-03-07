# Skillyards ERP — Local Development Guide

This document explains how to run the Skillyards ERP project locally after cloning the repository.

The system uses:

* Next.js
* Drizzle ORM
* Neon

---

# 1. Prerequisites

Install the following before starting.

### Node.js

Recommended version:

```
Node.js >= 18
```

Check:

```bash
node -v
```

---

### npm

```bash
npm -v
```

---

# 2. Clone the Repository

```bash
git clone https://github.com/MrigeshDeshpande/Skillyards-ERP.git
```

Enter project directory:

```bash
cd skillyards-erp
```

---

# 3. Setup Environment Variables

Create a local environment file.

```bash
cp .env.example .env
```

Edit `.env` and add the Neon database connection string.

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

Example using Neon:

```env
DATABASE_URL=postgresql://neondb_owner:password@ep-xxxx.aws.neon.tech/neondb?sslmode=require
```

---

# 4. First-Time Project Setup

Run the setup command:

```bash
npm run setup
```

This command automatically:

```
1. Installs dependencies
2. Applies database schema to Neon
```

Equivalent commands:

```bash
npm install
npx drizzle-kit push
```

---

# 5. Start Development Server

Run:

```bash
npm run dev
```

Application starts at:

```
http://localhost:3000
```

---

# 6. Verify Database Connection

Open the test API endpoint:

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

The backend is working correctly.

---

# 7. Project Structure Overview

```
src
 ├ app
 │   ├ (admin)       → Admin dashboard routes
 │   ├ (auth)        → Authentication pages
 │   └ api           → API routes
 │
 ├ components        → Shared UI components
 ├ db                → Database schema and client
 │   ├ index.js
 │   └ schema.js
 │
 ├ lib               → External integrations
 ├ services          → Business logic
 ├ validations       → Zod validation schemas
```

---

# 8. Useful Development Commands

### Start development server

```bash
npm run dev
```

---

### Generate migration after schema changes

```bash
npm run db:generate
```

Equivalent to:

```
npx drizzle-kit generate
```

---

### Push schema to database

```bash
npm run db:push
```

Equivalent to:

```
npx drizzle-kit push
```

---

### Clear Next.js cache

```bash
npm run clean
```

Equivalent to:

```
rm -rf .next
```

---

# 9. Common Issues

### Module not found

Clear build cache and restart:

```bash
npm run clean
npm run dev
```

---

### Port already in use

Kill the process using port 3000:

```bash
kill -9 $(lsof -t -i:3000)
```

---

### Database connection errors

Check the `.env` file and verify:

```
DATABASE_URL
```

---

# 10. Current System Status

Working components:

```
Next.js API
Drizzle ORM
Neon PostgreSQL
Database migrations
API connectivity
```

Upcoming modules:

```
Authentication
Admin dashboard
CRM (Enquiries)
Programmes
Jobs
Applications
QR codes
Visitor analytics
Notifications
```

---

# Maintained By

```
Skillyards Engineering Team
```

---

