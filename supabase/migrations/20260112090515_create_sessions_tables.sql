
  create table "public"."sessions" (
    "id" uuid not null default gen_random_uuid(),
    "start_at" timestamp with time zone not null,
    "end_at" timestamp with time zone not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "station_id" uuid
      );


alter table "public"."sessions" enable row level security;

CREATE UNIQUE INDEX sessions_pkey ON public.sessions USING btree (id);

alter table "public"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "public"."sessions" add constraint "sessions_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE not valid;

alter table "public"."sessions" validate constraint "sessions_station_id_fkey";

grant delete on table "public"."sessions" to "anon";

grant insert on table "public"."sessions" to "anon";

grant references on table "public"."sessions" to "anon";

grant select on table "public"."sessions" to "anon";

grant trigger on table "public"."sessions" to "anon";

grant truncate on table "public"."sessions" to "anon";

grant update on table "public"."sessions" to "anon";

grant delete on table "public"."sessions" to "authenticated";

grant insert on table "public"."sessions" to "authenticated";

grant references on table "public"."sessions" to "authenticated";

grant select on table "public"."sessions" to "authenticated";

grant trigger on table "public"."sessions" to "authenticated";

grant truncate on table "public"."sessions" to "authenticated";

grant update on table "public"."sessions" to "authenticated";

grant delete on table "public"."sessions" to "service_role";

grant insert on table "public"."sessions" to "service_role";

grant references on table "public"."sessions" to "service_role";

grant select on table "public"."sessions" to "service_role";

grant trigger on table "public"."sessions" to "service_role";

grant truncate on table "public"."sessions" to "service_role";

grant update on table "public"."sessions" to "service_role";


  create policy "Allow all authenticated users to view sessions"
  on "public"."sessions"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Allow all authenticated users to view station_has_instruments"
  on "public"."station_has_instruments"
  as permissive
  for select
  to authenticated
using (true);



