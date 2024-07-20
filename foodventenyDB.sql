CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "role" varchar
);

CREATE TABLE "applications" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "created_at" timestamp,
  "vendor_space" varchar
);

CREATE TABLE "session" (
  "user" integer,
  "session_cookie" varchar,
  "created_at" timestamp
);

ALTER TABLE "applications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "session" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");
