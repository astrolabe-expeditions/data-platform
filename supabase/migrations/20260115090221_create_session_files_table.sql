
  create table "public"."session_files" (
    "id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "storage_path" text not null,
    "uploaded_at" timestamp with time zone default now(),
    "processed" boolean default false,
    "processed_at" timestamp with time zone
      );


alter table "public"."session_files" enable row level security;

CREATE UNIQUE INDEX session_files_pkey ON public.session_files USING btree (id);

alter table "public"."session_files" add constraint "session_files_pkey" PRIMARY KEY using index "session_files_pkey";

alter table "public"."session_files" add constraint "session_files_session_id_fkey" FOREIGN KEY (session_id) REFERENCES public.sessions(id) ON DELETE CASCADE not valid;

alter table "public"."session_files" validate constraint "session_files_session_id_fkey";

grant delete on table "public"."session_files" to "anon";

grant insert on table "public"."session_files" to "anon";

grant references on table "public"."session_files" to "anon";

grant select on table "public"."session_files" to "anon";

grant trigger on table "public"."session_files" to "anon";

grant truncate on table "public"."session_files" to "anon";

grant update on table "public"."session_files" to "anon";

grant delete on table "public"."session_files" to "authenticated";

grant insert on table "public"."session_files" to "authenticated";

grant references on table "public"."session_files" to "authenticated";

grant select on table "public"."session_files" to "authenticated";

grant trigger on table "public"."session_files" to "authenticated";

grant truncate on table "public"."session_files" to "authenticated";

grant update on table "public"."session_files" to "authenticated";

grant delete on table "public"."session_files" to "service_role";

grant insert on table "public"."session_files" to "service_role";

grant references on table "public"."session_files" to "service_role";

grant select on table "public"."session_files" to "service_role";

grant trigger on table "public"."session_files" to "service_role";

grant truncate on table "public"."session_files" to "service_role";

grant update on table "public"."session_files" to "service_role";


  create policy "Allow all authenticated users to insert files"
  on "public"."session_files"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Allow all authenticated users to view files"
  on "public"."session_files"
  as permissive
  for select
  to authenticated
using (true);



