drop policy "Allow all authenticated users to insert files" on "public"."session_files";

drop policy "Allow all authenticated users to view files" on "public"."session_files";

drop policy "Allow all authenticated users to insert sessions" on "public"."sessions";

drop policy "Allow all authenticated users to view sessions" on "public"."sessions";

revoke delete on table "public"."session_files" from "anon";

revoke insert on table "public"."session_files" from "anon";

revoke references on table "public"."session_files" from "anon";

revoke select on table "public"."session_files" from "anon";

revoke trigger on table "public"."session_files" from "anon";

revoke truncate on table "public"."session_files" from "anon";

revoke update on table "public"."session_files" from "anon";

revoke delete on table "public"."session_files" from "authenticated";

revoke insert on table "public"."session_files" from "authenticated";

revoke references on table "public"."session_files" from "authenticated";

revoke select on table "public"."session_files" from "authenticated";

revoke trigger on table "public"."session_files" from "authenticated";

revoke truncate on table "public"."session_files" from "authenticated";

revoke update on table "public"."session_files" from "authenticated";

revoke delete on table "public"."session_files" from "service_role";

revoke insert on table "public"."session_files" from "service_role";

revoke references on table "public"."session_files" from "service_role";

revoke select on table "public"."session_files" from "service_role";

revoke trigger on table "public"."session_files" from "service_role";

revoke truncate on table "public"."session_files" from "service_role";

revoke update on table "public"."session_files" from "service_role";

revoke delete on table "public"."sessions" from "anon";

revoke insert on table "public"."sessions" from "anon";

revoke references on table "public"."sessions" from "anon";

revoke select on table "public"."sessions" from "anon";

revoke trigger on table "public"."sessions" from "anon";

revoke truncate on table "public"."sessions" from "anon";

revoke update on table "public"."sessions" from "anon";

revoke delete on table "public"."sessions" from "authenticated";

revoke insert on table "public"."sessions" from "authenticated";

revoke references on table "public"."sessions" from "authenticated";

revoke select on table "public"."sessions" from "authenticated";

revoke trigger on table "public"."sessions" from "authenticated";

revoke truncate on table "public"."sessions" from "authenticated";

revoke update on table "public"."sessions" from "authenticated";

revoke delete on table "public"."sessions" from "service_role";

revoke insert on table "public"."sessions" from "service_role";

revoke references on table "public"."sessions" from "service_role";

revoke select on table "public"."sessions" from "service_role";

revoke trigger on table "public"."sessions" from "service_role";

revoke truncate on table "public"."sessions" from "service_role";

revoke update on table "public"."sessions" from "service_role";

alter table "public"."session_files" drop constraint "session_files_instrument_id_fkey";

alter table "public"."session_files" drop constraint "session_files_session_id_fkey";

alter table "public"."sessions" drop constraint "sessions_station_id_fkey";

alter table "public"."session_files" drop constraint "session_files_pkey";

alter table "public"."sessions" drop constraint "sessions_pkey";

drop index if exists "public"."session_files_pkey";

drop index if exists "public"."sessions_pkey";

drop table "public"."session_files";

drop table "public"."sessions";


  create table "public"."dataset_files" (
    "id" uuid not null default gen_random_uuid(),
    "dataset_id" uuid not null,
    "instrument_id" uuid not null,
    "storage_path" text not null,
    "uploaded_at" timestamp with time zone default now(),
    "processed" boolean default false,
    "processed_at" timestamp with time zone
      );


alter table "public"."dataset_files" enable row level security;


  create table "public"."datasets" (
    "id" uuid not null default gen_random_uuid(),
    "description" text,
    "start_at" timestamp with time zone not null,
    "end_at" timestamp with time zone not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "station_id" uuid not null
      );


alter table "public"."datasets" enable row level security;

CREATE UNIQUE INDEX dataset_files_pkey ON public.dataset_files USING btree (id);

CREATE UNIQUE INDEX datasets_pkey ON public.datasets USING btree (id);

alter table "public"."dataset_files" add constraint "dataset_files_pkey" PRIMARY KEY using index "dataset_files_pkey";

alter table "public"."datasets" add constraint "datasets_pkey" PRIMARY KEY using index "datasets_pkey";

alter table "public"."dataset_files" add constraint "dataset_files_dataset_id_fkey" FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE not valid;

alter table "public"."dataset_files" validate constraint "dataset_files_dataset_id_fkey";

alter table "public"."dataset_files" add constraint "dataset_files_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES public.instruments(id) ON DELETE CASCADE not valid;

alter table "public"."dataset_files" validate constraint "dataset_files_instrument_id_fkey";

alter table "public"."datasets" add constraint "datasets_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE not valid;

alter table "public"."datasets" validate constraint "datasets_station_id_fkey";

grant delete on table "public"."dataset_files" to "anon";

grant insert on table "public"."dataset_files" to "anon";

grant references on table "public"."dataset_files" to "anon";

grant select on table "public"."dataset_files" to "anon";

grant trigger on table "public"."dataset_files" to "anon";

grant truncate on table "public"."dataset_files" to "anon";

grant update on table "public"."dataset_files" to "anon";

grant delete on table "public"."dataset_files" to "authenticated";

grant insert on table "public"."dataset_files" to "authenticated";

grant references on table "public"."dataset_files" to "authenticated";

grant select on table "public"."dataset_files" to "authenticated";

grant trigger on table "public"."dataset_files" to "authenticated";

grant truncate on table "public"."dataset_files" to "authenticated";

grant update on table "public"."dataset_files" to "authenticated";

grant delete on table "public"."dataset_files" to "service_role";

grant insert on table "public"."dataset_files" to "service_role";

grant references on table "public"."dataset_files" to "service_role";

grant select on table "public"."dataset_files" to "service_role";

grant trigger on table "public"."dataset_files" to "service_role";

grant truncate on table "public"."dataset_files" to "service_role";

grant update on table "public"."dataset_files" to "service_role";

grant delete on table "public"."datasets" to "anon";

grant insert on table "public"."datasets" to "anon";

grant references on table "public"."datasets" to "anon";

grant select on table "public"."datasets" to "anon";

grant trigger on table "public"."datasets" to "anon";

grant truncate on table "public"."datasets" to "anon";

grant update on table "public"."datasets" to "anon";

grant delete on table "public"."datasets" to "authenticated";

grant insert on table "public"."datasets" to "authenticated";

grant references on table "public"."datasets" to "authenticated";

grant select on table "public"."datasets" to "authenticated";

grant trigger on table "public"."datasets" to "authenticated";

grant truncate on table "public"."datasets" to "authenticated";

grant update on table "public"."datasets" to "authenticated";

grant delete on table "public"."datasets" to "service_role";

grant insert on table "public"."datasets" to "service_role";

grant references on table "public"."datasets" to "service_role";

grant select on table "public"."datasets" to "service_role";

grant trigger on table "public"."datasets" to "service_role";

grant truncate on table "public"."datasets" to "service_role";

grant update on table "public"."datasets" to "service_role";


  create policy "Allow all authenticated users to insert files"
  on "public"."dataset_files"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Allow all authenticated users to view files"
  on "public"."dataset_files"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Allow all authenticated users to insert datasets"
  on "public"."datasets"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Allow all authenticated users to view datasets"
  on "public"."datasets"
  as permissive
  for select
  to authenticated
using (true);


drop policy "Authenticated users can access session_files bucket" on "storage"."objects";

drop policy "Authenticated users can insert files into session_files bucket" on "storage"."objects";

INSERT INTO storage.buckets (id, name, public)
VALUES ('dataset_files', 'dataset_files', false)
ON CONFLICT (id) DO NOTHING;


  create policy "Authenticated users can access dataset_files bucket"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'dataset_files'::text));



  create policy "Authenticated users can insert files into dataset_files bucket"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'dataset_files'::text));



