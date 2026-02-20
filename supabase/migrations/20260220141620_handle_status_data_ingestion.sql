create type "public"."processing_status" as enum ('pending', 'processing', 'completed', 'failed');

alter table "public"."dataset_files" add column "status" public.processing_status not null default 'pending'::public.processing_status;

alter table "public"."datasets" add column "status" public.processing_status not null default 'pending'::public.processing_status;


