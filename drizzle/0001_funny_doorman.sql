ALTER TABLE "KLEAN_professional_services" DROP CONSTRAINT "KLEAN_professional_services_professional_id_KLEAN_professionals_id_fk";
--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" DROP CONSTRAINT "KLEAN_professional_services_service_id_KLEAN_services_id_fk";
--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" ADD CONSTRAINT "prof_serv_prof_id_fk" FOREIGN KEY ("professional_id") REFERENCES "public"."KLEAN_professionals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "KLEAN_professional_services" ADD CONSTRAINT "prof_serv_serv_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."KLEAN_services"("id") ON DELETE cascade ON UPDATE no action;