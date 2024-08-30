CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"password" text,
	"googleId" text,
	"linkedinId" text,
	"createdAt" timestamp DEFAULT now()
);
