alter table "public"."dataset_files" drop column "status";

alter table "public"."dataset_files" add column "processing_status" public.processing_status not null default 'pending'::public.processing_status;

alter table "public"."datasets" drop column "status";

alter table "public"."datasets" add column "processing_status" public.processing_status not null default 'pending'::public.processing_status;


