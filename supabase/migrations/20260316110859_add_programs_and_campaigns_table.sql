
  create table "public"."campaigns" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "program_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );


alter table "public"."campaigns" enable row level security;


  create table "public"."programs" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );


alter table "public"."programs" enable row level security;


  create table "public"."station_has_campaigns" (
    "station_id" uuid not null,
    "campaign_id" uuid not null,
    "enroll_at" timestamp with time zone default now()
      );


alter table "public"."station_has_campaigns" enable row level security;


  create table "public"."station_has_programs" (
    "station_id" uuid not null,
    "program_id" uuid not null,
    "enroll_at" timestamp with time zone default now()
      );


alter table "public"."station_has_programs" enable row level security;

alter table "public"."datasets" add column "campaign_id" uuid;

alter table "public"."datasets" add column "program_id" uuid;

CREATE UNIQUE INDEX campaigns_pkey ON public.campaigns USING btree (id);

CREATE UNIQUE INDEX programs_pkey ON public.programs USING btree (id);

CREATE UNIQUE INDEX station_has_campaigns_pkey ON public.station_has_campaigns USING btree (station_id, campaign_id);

CREATE UNIQUE INDEX station_has_programs_pkey ON public.station_has_programs USING btree (station_id, program_id);

alter table "public"."campaigns" add constraint "campaigns_pkey" PRIMARY KEY using index "campaigns_pkey";

alter table "public"."programs" add constraint "programs_pkey" PRIMARY KEY using index "programs_pkey";

alter table "public"."station_has_campaigns" add constraint "station_has_campaigns_pkey" PRIMARY KEY using index "station_has_campaigns_pkey";

alter table "public"."station_has_programs" add constraint "station_has_programs_pkey" PRIMARY KEY using index "station_has_programs_pkey";

alter table "public"."campaigns" add constraint "campaigns_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL not valid;

alter table "public"."campaigns" validate constraint "campaigns_program_id_fkey";

alter table "public"."datasets" add constraint "datasets_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE SET NULL not valid;

alter table "public"."datasets" validate constraint "datasets_campaign_id_fkey";

alter table "public"."datasets" add constraint "datasets_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL not valid;

alter table "public"."datasets" validate constraint "datasets_program_id_fkey";

alter table "public"."station_has_campaigns" add constraint "station_has_campaigns_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."station_has_campaigns" validate constraint "station_has_campaigns_campaign_id_fkey";

alter table "public"."station_has_campaigns" add constraint "station_has_campaigns_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE not valid;

alter table "public"."station_has_campaigns" validate constraint "station_has_campaigns_station_id_fkey";

alter table "public"."station_has_programs" add constraint "station_has_programs_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE CASCADE not valid;

alter table "public"."station_has_programs" validate constraint "station_has_programs_program_id_fkey";

alter table "public"."station_has_programs" add constraint "station_has_programs_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE not valid;

alter table "public"."station_has_programs" validate constraint "station_has_programs_station_id_fkey";

grant delete on table "public"."campaigns" to "anon";

grant insert on table "public"."campaigns" to "anon";

grant references on table "public"."campaigns" to "anon";

grant select on table "public"."campaigns" to "anon";

grant trigger on table "public"."campaigns" to "anon";

grant truncate on table "public"."campaigns" to "anon";

grant update on table "public"."campaigns" to "anon";

grant delete on table "public"."campaigns" to "authenticated";

grant insert on table "public"."campaigns" to "authenticated";

grant references on table "public"."campaigns" to "authenticated";

grant select on table "public"."campaigns" to "authenticated";

grant trigger on table "public"."campaigns" to "authenticated";

grant truncate on table "public"."campaigns" to "authenticated";

grant update on table "public"."campaigns" to "authenticated";

grant delete on table "public"."campaigns" to "service_role";

grant insert on table "public"."campaigns" to "service_role";

grant references on table "public"."campaigns" to "service_role";

grant select on table "public"."campaigns" to "service_role";

grant trigger on table "public"."campaigns" to "service_role";

grant truncate on table "public"."campaigns" to "service_role";

grant update on table "public"."campaigns" to "service_role";

grant delete on table "public"."programs" to "anon";

grant insert on table "public"."programs" to "anon";

grant references on table "public"."programs" to "anon";

grant select on table "public"."programs" to "anon";

grant trigger on table "public"."programs" to "anon";

grant truncate on table "public"."programs" to "anon";

grant update on table "public"."programs" to "anon";

grant delete on table "public"."programs" to "authenticated";

grant insert on table "public"."programs" to "authenticated";

grant references on table "public"."programs" to "authenticated";

grant select on table "public"."programs" to "authenticated";

grant trigger on table "public"."programs" to "authenticated";

grant truncate on table "public"."programs" to "authenticated";

grant update on table "public"."programs" to "authenticated";

grant delete on table "public"."programs" to "service_role";

grant insert on table "public"."programs" to "service_role";

grant references on table "public"."programs" to "service_role";

grant select on table "public"."programs" to "service_role";

grant trigger on table "public"."programs" to "service_role";

grant truncate on table "public"."programs" to "service_role";

grant update on table "public"."programs" to "service_role";

grant delete on table "public"."station_has_campaigns" to "anon";

grant insert on table "public"."station_has_campaigns" to "anon";

grant references on table "public"."station_has_campaigns" to "anon";

grant select on table "public"."station_has_campaigns" to "anon";

grant trigger on table "public"."station_has_campaigns" to "anon";

grant truncate on table "public"."station_has_campaigns" to "anon";

grant update on table "public"."station_has_campaigns" to "anon";

grant delete on table "public"."station_has_campaigns" to "authenticated";

grant insert on table "public"."station_has_campaigns" to "authenticated";

grant references on table "public"."station_has_campaigns" to "authenticated";

grant select on table "public"."station_has_campaigns" to "authenticated";

grant trigger on table "public"."station_has_campaigns" to "authenticated";

grant truncate on table "public"."station_has_campaigns" to "authenticated";

grant update on table "public"."station_has_campaigns" to "authenticated";

grant delete on table "public"."station_has_campaigns" to "service_role";

grant insert on table "public"."station_has_campaigns" to "service_role";

grant references on table "public"."station_has_campaigns" to "service_role";

grant select on table "public"."station_has_campaigns" to "service_role";

grant trigger on table "public"."station_has_campaigns" to "service_role";

grant truncate on table "public"."station_has_campaigns" to "service_role";

grant update on table "public"."station_has_campaigns" to "service_role";

grant delete on table "public"."station_has_programs" to "anon";

grant insert on table "public"."station_has_programs" to "anon";

grant references on table "public"."station_has_programs" to "anon";

grant select on table "public"."station_has_programs" to "anon";

grant trigger on table "public"."station_has_programs" to "anon";

grant truncate on table "public"."station_has_programs" to "anon";

grant update on table "public"."station_has_programs" to "anon";

grant delete on table "public"."station_has_programs" to "authenticated";

grant insert on table "public"."station_has_programs" to "authenticated";

grant references on table "public"."station_has_programs" to "authenticated";

grant select on table "public"."station_has_programs" to "authenticated";

grant trigger on table "public"."station_has_programs" to "authenticated";

grant truncate on table "public"."station_has_programs" to "authenticated";

grant update on table "public"."station_has_programs" to "authenticated";

grant delete on table "public"."station_has_programs" to "service_role";

grant insert on table "public"."station_has_programs" to "service_role";

grant references on table "public"."station_has_programs" to "service_role";

grant select on table "public"."station_has_programs" to "service_role";

grant trigger on table "public"."station_has_programs" to "service_role";

grant truncate on table "public"."station_has_programs" to "service_role";

grant update on table "public"."station_has_programs" to "service_role";


  create policy "Allow all users to view campaigns"
  on "public"."campaigns"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow all users to view programs"
  on "public"."programs"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow all authenticated users to view station_has_campaigns"
  on "public"."station_has_campaigns"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Public can view station-campaign links for public stations"
  on "public"."station_has_campaigns"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM (public.stations s
     JOIN public.datasets d ON ((d.station_id = s.id)))
  WHERE ((s.id = station_has_campaigns.station_id) AND (d.is_public = true) AND (d.deleted_at IS NULL)))));



  create policy "Allow all authenticated users to view station_has_programs"
  on "public"."station_has_programs"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Public can view station-program links for public stations"
  on "public"."station_has_programs"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM (public.stations s
     JOIN public.datasets d ON ((d.station_id = s.id)))
  WHERE ((s.id = station_has_programs.station_id) AND (d.is_public = true) AND (d.deleted_at IS NULL)))));



