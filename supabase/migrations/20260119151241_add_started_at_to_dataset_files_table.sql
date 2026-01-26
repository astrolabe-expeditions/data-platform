alter table "public"."dataset_files" drop column "storage_path";

alter table "public"."dataset_files" add column "path" text not null;

alter table "public"."dataset_files" add column "started_at" timestamp with time zone;


