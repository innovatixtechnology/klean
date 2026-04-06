CREATE TYPE "public"."booking_status" AS ENUM('PENDING', 'ASSIGNED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('SUCCESS', 'FAILED', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'PROFESSIONAL', 'ADMIN');--> statement-breakpoint
CREATE TABLE "KLEAN_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"comment" varchar(500),
	"type" varchar(50),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"address_line_1" varchar(500),
	"address_line_2" varchar(500),
	"city" varchar(100),
	"state" varchar(100),
	"pincode" varchar(10),
	"is_default" boolean DEFAULT false,
	"category" varchar(100),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_booking_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"service_id" uuid,
	"quantity" integer DEFAULT 1,
	"price" numeric(10, 2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"professional_id" uuid,
	"address_id" uuid NOT NULL,
	"status" "booking_status" DEFAULT 'PENDING',
	"assigned_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"image" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(100) NOT NULL,
	"phone" varchar(15),
	"message" varchar(500),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"amount" numeric(10, 2) NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING',
	"method" varchar(50),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_professional_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"professional_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	CONSTRAINT "prof_serv_unique" UNIQUE("professional_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "KLEAN_professionals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"bio" varchar(500),
	"rating" numeric(3, 2) DEFAULT '0',
	"is_verified" boolean DEFAULT false,
	"additional_info" jsonb,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid,
	"rating" numeric(3, 2) NOT NULL,
	"comment" varchar(500),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" text[],
	"price" numeric(10, 2) NOT NULL,
	"description" varchar(500),
	"is_active" boolean DEFAULT true,
	"additional_info" jsonb,
	"sub_category_id" uuid NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "KLEAN_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "KLEAN_sub_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(500),
	"image" text,
	"is_active" boolean DEFAULT true,
	"category_id" uuid NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "KLEAN_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"phone_number" varchar(15),
	"image" text,
	"isVerified" boolean DEFAULT false,
	"role" "role" DEFAULT 'USER',
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "KLEAN_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "KLEAN_accounts" ADD CONSTRAINT "KLEAN_accounts_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_activity_logs" ADD CONSTRAINT "KLEAN_activity_logs_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_addresses" ADD CONSTRAINT "KLEAN_addresses_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_booking_items" ADD CONSTRAINT "KLEAN_booking_items_booking_id_KLEAN_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."KLEAN_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_booking_items" ADD CONSTRAINT "KLEAN_booking_items_service_id_KLEAN_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."KLEAN_services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_bookings" ADD CONSTRAINT "KLEAN_bookings_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_bookings" ADD CONSTRAINT "KLEAN_bookings_professional_id_KLEAN_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."KLEAN_professionals"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_bookings" ADD CONSTRAINT "KLEAN_bookings_address_id_KLEAN_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."KLEAN_addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_payments" ADD CONSTRAINT "KLEAN_payments_booking_id_KLEAN_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."KLEAN_bookings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" ADD CONSTRAINT "KLEAN_professional_services_professional_id_KLEAN_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."KLEAN_professionals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" ADD CONSTRAINT "KLEAN_professional_services_service_id_KLEAN_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."KLEAN_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_professionals" ADD CONSTRAINT "KLEAN_professionals_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_reviews" ADD CONSTRAINT "KLEAN_reviews_booking_id_KLEAN_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."KLEAN_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_services" ADD CONSTRAINT "KLEAN_services_sub_category_id_KLEAN_sub_categories_id_fk" FOREIGN KEY ("sub_category_id") REFERENCES "public"."KLEAN_sub_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_sessions" ADD CONSTRAINT "KLEAN_sessions_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_sub_categories" ADD CONSTRAINT "KLEAN_sub_categories_category_id_KLEAN_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."KLEAN_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_userId_idx" ON "KLEAN_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "addresses_userId_idx" ON "KLEAN_addresses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "booking_items_bookingId_idx" ON "KLEAN_booking_items" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "bookings_userId_idx" ON "KLEAN_bookings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "bookings_profId_idx" ON "KLEAN_bookings" USING btree ("professional_id");--> statement-breakpoint
CREATE INDEX "bookings_addrId_idx" ON "KLEAN_bookings" USING btree ("address_id");--> statement-breakpoint
CREATE INDEX "payments_bookingId_idx" ON "KLEAN_payments" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "prof_serv_profId_idx" ON "KLEAN_professional_services" USING btree ("professional_id");--> statement-breakpoint
CREATE INDEX "prof_serv_servId_idx" ON "KLEAN_professional_services" USING btree ("service_id");--> statement-breakpoint
CREATE INDEX "professionals_userId_idx" ON "KLEAN_professionals" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "reviews_bookingId_idx" ON "KLEAN_reviews" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "services_subCatId_idx" ON "KLEAN_services" USING btree ("sub_category_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "KLEAN_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sub_categories_catId_idx" ON "KLEAN_sub_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "KLEAN_users" USING btree ("email");