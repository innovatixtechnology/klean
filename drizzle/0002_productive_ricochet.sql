CREATE TYPE "public"."block_type" AS ENUM('EMAIL', 'IP', 'PHONE', 'USER_ID', 'DELETE_REQUEST');--> statement-breakpoint
ALTER TYPE "public"."booking_status" ADD VALUE 'IN_PROGRESS';--> statement-breakpoint
ALTER TYPE "public"."role" ADD VALUE 'EMPLOYEE';--> statement-breakpoint
CREATE TABLE "KLEAN_blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "block_type" NOT NULL,
	"value" text NOT NULL,
	"reason" text,
	"is_active" boolean DEFAULT true,
	"user_id" uuid,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" DROP CONSTRAINT "prof_serv_prof_id_fk";
--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" DROP CONSTRAINT "prof_serv_serv_id_fk";
--> statement-breakpoint
ALTER TABLE "KLEAN_addresses" ADD COLUMN "country" varchar(100);--> statement-breakpoint
ALTER TABLE "KLEAN_bookings" ADD COLUMN "completed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "KLEAN_categories" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "KLEAN_categories" ADD COLUMN "description" varchar(500);--> statement-breakpoint
ALTER TABLE "KLEAN_services" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "KLEAN_services" ADD COLUMN "discounted_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "KLEAN_sub_categories" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "KLEAN_users" ADD COLUMN "banned" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "KLEAN_users" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "KLEAN_users" ADD COLUMN "ban_expires" timestamp;--> statement-breakpoint
ALTER TABLE "KLEAN_blocks" ADD CONSTRAINT "KLEAN_blocks_user_id_KLEAN_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."KLEAN_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blocks_type_value_idx" ON "KLEAN_blocks" USING btree ("type","value");--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" ADD CONSTRAINT "KLEAN_professional_services_professional_id_KLEAN_professionals_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."KLEAN_professionals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" ADD CONSTRAINT "KLEAN_professional_services_service_id_KLEAN_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."KLEAN_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_categories" ADD CONSTRAINT "KLEAN_categories_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "KLEAN_services" ADD CONSTRAINT "KLEAN_services_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "KLEAN_sub_categories" ADD CONSTRAINT "KLEAN_sub_categories_slug_unique" UNIQUE("slug");