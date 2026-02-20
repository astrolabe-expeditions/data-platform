alter table "public"."dataset_files" drop column "processed";

alter table "public"."datasets" add column "processed_at" timestamp with time zone;


