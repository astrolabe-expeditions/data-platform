alter table "public"."dataset_files" add column "is_validated" boolean default false;

alter table "public"."datasets" drop column "processed_at";

alter table "public"."datasets" drop column "processing_status";


