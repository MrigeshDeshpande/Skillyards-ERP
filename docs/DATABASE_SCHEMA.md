# Skillyards ERP — Database Architecture

## Overview

The Skillyards ERP system uses:

* PostgreSQL
* Neon
* Drizzle ORM

The database schema is defined in:

```
src/db/schema/
```

Schema migrations are handled using **Drizzle Kit**.

---

# Design Principles

The database follows several architectural principles.

## 1. UUID Primary Keys

All tables use UUIDs instead of auto-increment IDs.

Example:

```
id → uuid
```

Reason:

* prevents ID enumeration
* supports distributed systems
* avoids collisions across services
* safer for public APIs

Example:

```
8a5c1f34-9b7a-4f2b-9c1e-0a3e0b5c4d4f
```

---

## 2. Role-Based Access Control (RBAC)

The system uses **RBAC** instead of a simple role column.

Instead of:

```
users.role
```

The system uses relational tables:

```
users
roles
permissions
user_roles
role_permissions
```

This allows flexible permission management across teams.

---

## 3. Modular Domain Structure

Database tables are grouped by domain modules:

```
Auth
CRM
HR
Marketing
Analytics
Notifications
```

Each module represents a functional system inside the ERP.

---

# Core Authentication System

## Users

Stores all system users.

```
users
```

Columns:

```
id (uuid)
first_name
last_name
email
password
avatar
is_active
created_at
updated_at
```

---

## Roles

Defines roles available in the system.

```
roles
```

Example roles:

```
super_admin
admin
counsellor
marketing
trainer
hr
```

Columns:

```
id
name
description
created_at
```

---

## Permissions

Permissions define specific capabilities.

```
permissions
```

Examples:

```
enquiry.read
enquiry.write
jobs.manage
analytics.read
users.manage
```

Columns:

```
id
name
description
```

---

## User Roles

Maps users to roles.

```
user_roles
```

Columns:

```
id
user_id
role_id
```

Relationships:

```
user_roles.user_id → users.id
user_roles.role_id → roles.id
```

---

## Role Permissions

Maps roles to permissions.

```
role_permissions
```

Columns:

```
id
role_id
permission_id
```

Relationships:

```
role_permissions.role_id → roles.id
role_permissions.permission_id → permissions.id
```

---

# CRM Module

## Programmes

Training programs offered by Skillyards.

```
programmes
```

Columns:

```
id
title
slug
description
is_active
created_at
updated_at
```

Example:

```
Full Stack Development
Data Science
Digital Marketing
```

---

## Enquiries

Student enquiries submitted through website or counsellors.

```
enquiries
```

Columns:

```
id
first_name
last_name
email
mobile
programme_id
counsellor_id
status
created_at
updated_at
```

Relationships:

```
programme_id → programmes.id
counsellor_id → users.id
```

Status examples:

```
new
contacted
counselling
converted
rejected
```

---

## Feedback

Feedback provided by students after counselling.

```
feedback
```

Columns:

```
id
enquiry_id
rating
comments
created_at
```

Relationship:

```
enquiry_id → enquiries.id
```

---

# HR Module

## Job Roles

Open job positions.

```
job_roles
```

Columns:

```
id
title
slug
description
requirements
is_active
is_featured
created_at
```

---

## Job Applications

Applications submitted for job roles.

```
job_applications
```

Columns:

```
id
job_role_id
name
email
resume_path
created_at
```

Relationship:

```
job_role_id → job_roles.id
```

---

# Marketing Module

## Subscribers

Email newsletter subscribers.

```
subscribers
```

Columns:

```
id
email
token
verified
created_at
```

---

## Contacts

Contact form submissions.

```
contacts
```

Columns:

```
id
name
email
message
is_read
created_at
```

---

# QR Code Tracking

## QR Codes

Used for campaign tracking.

```
qr_codes
```

Columns:

```
id
uuid
url
user_id
redirect_count
created_at
```

Relationship:

```
user_id → users.id
```

---

# Analytics Module

## Visitor Logs

Tracks website visitors.

```
visitor_logs
```

Columns:

```
id
ip
url
user_agent
created_at
```

---

## Visitor Stats

Aggregated daily statistics.

```
visitor_stats
```

Columns:

```
id
date
total_visits
unique_visitors
```

---

## Page Views

Tracks page popularity.

```
page_views
```

Columns:

```
id
url
visited_on
```

---

## Visitor Counter

Global visitor counter.

```
visitor_counter
```

Columns:

```
id
count
```

---

# Notifications Module

## Custom Notifications

System notifications sent to users.

```
custom_notifications
```

Columns:

```
id
title
body
target_type
sent_at
```

---

## Push Subscriptions

Stores browser push notification subscriptions.

```
push_subscriptions
```

Columns:

```
id
user_id
endpoint
p256dh
auth
```

Relationship:

```
user_id → users.id
```

---

# Database Relationships

Simplified relationship map:

```
users
  │
  ├── enquiries
  │        │
  │        └── feedback
  │
  └── qr_codes

programmes
  │
  └── enquiries

job_roles
  │
  └── job_applications

roles
  │
  └── role_permissions

users
  │
  └── user_roles
```

---

# Migration System

Schema migrations are managed with **Drizzle Kit**.

Commands:

Generate migration:

```
npm run db:generate
```

Apply schema changes:

```
npm run db:push
```

---

# Future Expansion

The ERP architecture allows future modules such as:

```
students
batches
courses
attendance
faculty
payments
invoices
campaigns
```

These modules will integrate with existing CRM and analytics systems.

---

# Maintainers

```
Skillyards Engineering Team
```

---
