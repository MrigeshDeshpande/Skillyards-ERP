import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    firstName: text("first_name"),
    lastName: text("last_name"),

    email: text("email").notNull().unique(),
    password: text("password").notNull(),

    role: text("role").default("admin"),

    createdAt: timestamp("created_at").defaultNow(),
});

