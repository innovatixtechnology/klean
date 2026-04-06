import { relations } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `KLEAN_${name}`);

const timestamps = {
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

// Auth

export const sessions = createTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const accounts = createTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [index("accounts_userId_idx").on(table.userId)],
);

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// --- USERS ---

export const roleEnum = pgEnum("role", ["USER", "PROFESSIONAL", "ADMIN"]);

export const users = createTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").notNull().unique(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }),
  image: text("image"),
  isVerified: boolean("isVerified").default(false),
  role: roleEnum("role").default("USER"),
  ...timestamps,
}, (table) => [
  index("users_email_idx").on(table.email),
]);

export const professionals = createTable("professionals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  bio: varchar("bio", { length: 500 }),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("0"),
  isVerified: boolean("is_verified").default(false),
  additionalInfo: jsonb("additional_info"), // { activeMembers: 2 }
  ...timestamps,
}, (table) => [
  index("professionals_userId_idx").on(table.userId),
]);

export const addresses = createTable("addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  addressLine1: varchar("address_line_1", { length: 500 }),
  addressLine2: varchar("address_line_2", { length: 500 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 10 }),
  isDefault: boolean("is_default").default(false),
  category: varchar("category", { length: 100 }), // HOME, OFFICE, etc.
  ...timestamps,
}, (table) => [
  index("addresses_userId_idx").on(table.userId),
]);


export const professionalServices = createTable("professional_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  professionalId: uuid("professional_id").notNull(),
  serviceId: uuid("service_id").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
}, (table) => [
  index("prof_serv_profId_idx").on(table.professionalId),
  index("prof_serv_servId_idx").on(table.serviceId),
  unique("prof_serv_unique").on(table.professionalId, table.serviceId),
  foreignKey({
    columns: [table.professionalId],
    foreignColumns: [professionals.id],
    name: "prof_serv_prof_id_fk",
  }).onDelete("cascade"),
  foreignKey({
    columns: [table.serviceId],
    foreignColumns: [services.id],
    name: "prof_serv_serv_id_fk",
  }).onDelete("cascade"),
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "PENDING",
  "ASSIGNED",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
]);

export const bookings = createTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  professionalId: uuid("professional_id").references(() => professionals.id, { onDelete: "set null" }),
  addressId: uuid("address_id").references(() => addresses.id).notNull(),
  status: bookingStatusEnum("status").default("PENDING"),
  assignedAt: timestamp("assigned_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [
  index("bookings_userId_idx").on(table.userId),
  index("bookings_profId_idx").on(table.professionalId),
  index("bookings_addrId_idx").on(table.addressId),
]);

export const bookingItems = createTable("booking_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "cascade" }),
  serviceId: uuid("service_id").references(() => services.id),
  quantity: integer("quantity").default(1),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  ...timestamps,
}, (table) => [
  index("booking_items_bookingId_idx").on(table.bookingId),
]);

export const reviews = createTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "cascade" }),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull(),
  comment: varchar("comment", { length: 500 }),
  ...timestamps,
}, (table) => [
  index("reviews_bookingId_idx").on(table.bookingId),
]);

export const categories = createTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  isActive: boolean("is_active").default(true),
  image: text("image"),
  ...timestamps,
});

export const subCategories = createTable("sub_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
}, (table) => [
  index("sub_categories_catId_idx").on(table.categoryId),
]);

export const services = createTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  image: text("image").array(), // Simplified to array of URL strings
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: varchar("description", { length: 500 }),
  isActive: boolean("is_active").default(true),
  additionalInfo: jsonb("additional_info"), // { duration: "2 hours", seats: 2 }
  subCategoryId: uuid("sub_category_id")
    .references(() => subCategories.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
}, (table) => [
  index("services_subCatId_idx").on(table.subCategoryId),
]);

export const paymentStatusEnum = pgEnum("payment_status", ["SUCCESS", "FAILED", "PENDING"]);

export const payments = createTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").references(() => bookings.id, { onDelete: "set null" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum("status").default("PENDING"),
  method: varchar("method", { length: 50 }), // UPI, card
  ...timestamps,
}, (table) => [
  index("payments_bookingId_idx").on(table.bookingId),
]);

export const activityLogs = createTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  comment: varchar("comment", { length: 500 }),
  type: varchar("type", { length: 50 }), // booking, payment, review, etc.
  ...timestamps,
});

export const contacts = createTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  message: varchar("message", { length: 500 }),
  ...timestamps,
});

export const userRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  addresses: many(addresses),
  bookings: many(bookings),
  activityLogs: many(activityLogs),
  professionalProfile: one(professionals, {
    fields: [users.id],
    references: [professionals.userId],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
}));

export const bookingItemsRelations = relations(bookingItems, ({ one }) => ({
  booking: one(bookings, {
    fields: [bookingItems.bookingId],
    references: [bookings.id],
  }),
  service: one(services, {
    fields: [bookingItems.serviceId],
    references: [services.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  professional: one(professionals, {
    fields: [bookings.professionalId],
    references: [professionals.id],
  }),
  address: one(addresses, {
    fields: [bookings.addressId],
    references: [addresses.id],
  }),
  items: many(bookingItems),
  payment: many(payments),
  review: many(reviews),
}));

export const professionalServicesRelations = relations(
  professionalServices,
  ({ one }) => ({
    professional: one(professionals, {
      fields: [professionalServices.professionalId],
      references: [professionals.id],
    }),
    service: one(services, {
      fields: [professionalServices.serviceId],
      references: [services.id],
    }),
  }),
);

export const professionalsRelations = relations(professionals, ({ one, many }) => ({
  user: one(users, {
    fields: [professionals.userId],
    references: [users.id],
  }),
  services: many(professionalServices),
  bookings: many(bookings),
}));

export const addressesRelations = relations(addresses, ({ one, many }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
  bookings: many(bookings),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  subCategories: many(subCategories),
}));

export const subCategoriesRelations = relations(subCategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subCategories.categoryId],
    references: [categories.id],
  }),
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  subCategory: one(subCategories, {
    fields: [services.subCategoryId],
    references: [subCategories.id],
  }),
  professionalServices: many(professionalServices),
  bookingItems: many(bookingItems),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

// Infer Types

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
export type Professional = typeof professionals.$inferSelect;
export type NewProfessional = typeof professionals.$inferInsert;
export type ProfessionalService = typeof professionalServices.$inferSelect;
export type NewProfessionalService = typeof professionalServices.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type BookingItem = typeof bookingItems.$inferSelect;
export type NewBookingItem = typeof bookingItems.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type SubCategory = typeof subCategories.$inferSelect;
export type NewSubCategory = typeof subCategories.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;