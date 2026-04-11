ALTER TABLE "KLEAN_bookings" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "KLEAN_addresses" ADD COLUMN "name" varchar(100);--> statement-breakpoint
ALTER TABLE "KLEAN_addresses" ADD COLUMN "phone" varchar(15);