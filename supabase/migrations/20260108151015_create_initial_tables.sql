create extension if not exists "postgis" with schema "extensions";


  create table "public"."instruments" (
    "id" uuid not null default gen_random_uuid(),
    "identifier" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "model_id" uuid
      );


alter table "public"."instruments" enable row level security;


  create table "public"."models" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "version" text not null,
    "program" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );


alter table "public"."models" enable row level security;


  create table "public"."station_has_instruments" (
    "station_id" uuid not null,
    "instrument_id" uuid not null,
    "assigned_at" timestamp with time zone default now(),
    "unassigned_at" timestamp with time zone
      );


alter table "public"."station_has_instruments" enable row level security;


  create table "public"."stations" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "is_mobile" boolean not null default false,
    "position" extensions.geography(Point,4326),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone
      );


alter table "public"."stations" enable row level security;

CREATE UNIQUE INDEX instruments_identifier_key ON public.instruments USING btree (identifier);

CREATE UNIQUE INDEX instruments_pkey ON public.instruments USING btree (id);

CREATE UNIQUE INDEX models_pkey ON public.models USING btree (id);

CREATE UNIQUE INDEX station_has_instruments_pkey ON public.station_has_instruments USING btree (station_id, instrument_id);

CREATE UNIQUE INDEX stations_pkey ON public.stations USING btree (id);

alter table "public"."instruments" add constraint "instruments_pkey" PRIMARY KEY using index "instruments_pkey";

alter table "public"."models" add constraint "models_pkey" PRIMARY KEY using index "models_pkey";

alter table "public"."station_has_instruments" add constraint "station_has_instruments_pkey" PRIMARY KEY using index "station_has_instruments_pkey";

alter table "public"."stations" add constraint "stations_pkey" PRIMARY KEY using index "stations_pkey";

alter table "public"."instruments" add constraint "instruments_identifier_key" UNIQUE using index "instruments_identifier_key";

alter table "public"."instruments" add constraint "instruments_model_id_fkey" FOREIGN KEY (model_id) REFERENCES public.models(id) not valid;

alter table "public"."instruments" validate constraint "instruments_model_id_fkey";

alter table "public"."station_has_instruments" add constraint "station_has_instruments_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES public.instruments(id) ON DELETE CASCADE not valid;

alter table "public"."station_has_instruments" validate constraint "station_has_instruments_instrument_id_fkey";

alter table "public"."station_has_instruments" add constraint "station_has_instruments_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE not valid;

alter table "public"."station_has_instruments" validate constraint "station_has_instruments_station_id_fkey";

grant delete on table "public"."instruments" to "anon";

grant insert on table "public"."instruments" to "anon";

grant references on table "public"."instruments" to "anon";

grant select on table "public"."instruments" to "anon";

grant trigger on table "public"."instruments" to "anon";

grant truncate on table "public"."instruments" to "anon";

grant update on table "public"."instruments" to "anon";

grant delete on table "public"."instruments" to "authenticated";

grant insert on table "public"."instruments" to "authenticated";

grant references on table "public"."instruments" to "authenticated";

grant select on table "public"."instruments" to "authenticated";

grant trigger on table "public"."instruments" to "authenticated";

grant truncate on table "public"."instruments" to "authenticated";

grant update on table "public"."instruments" to "authenticated";

grant delete on table "public"."instruments" to "service_role";

grant insert on table "public"."instruments" to "service_role";

grant references on table "public"."instruments" to "service_role";

grant select on table "public"."instruments" to "service_role";

grant trigger on table "public"."instruments" to "service_role";

grant truncate on table "public"."instruments" to "service_role";

grant update on table "public"."instruments" to "service_role";

grant delete on table "public"."models" to "anon";

grant insert on table "public"."models" to "anon";

grant references on table "public"."models" to "anon";

grant select on table "public"."models" to "anon";

grant trigger on table "public"."models" to "anon";

grant truncate on table "public"."models" to "anon";

grant update on table "public"."models" to "anon";

grant delete on table "public"."models" to "authenticated";

grant insert on table "public"."models" to "authenticated";

grant references on table "public"."models" to "authenticated";

grant select on table "public"."models" to "authenticated";

grant trigger on table "public"."models" to "authenticated";

grant truncate on table "public"."models" to "authenticated";

grant update on table "public"."models" to "authenticated";

grant delete on table "public"."models" to "service_role";

grant insert on table "public"."models" to "service_role";

grant references on table "public"."models" to "service_role";

grant select on table "public"."models" to "service_role";

grant trigger on table "public"."models" to "service_role";

grant truncate on table "public"."models" to "service_role";

grant update on table "public"."models" to "service_role";

grant delete on table "public"."station_has_instruments" to "anon";

grant insert on table "public"."station_has_instruments" to "anon";

grant references on table "public"."station_has_instruments" to "anon";

grant select on table "public"."station_has_instruments" to "anon";

grant trigger on table "public"."station_has_instruments" to "anon";

grant truncate on table "public"."station_has_instruments" to "anon";

grant update on table "public"."station_has_instruments" to "anon";

grant delete on table "public"."station_has_instruments" to "authenticated";

grant insert on table "public"."station_has_instruments" to "authenticated";

grant references on table "public"."station_has_instruments" to "authenticated";

grant select on table "public"."station_has_instruments" to "authenticated";

grant trigger on table "public"."station_has_instruments" to "authenticated";

grant truncate on table "public"."station_has_instruments" to "authenticated";

grant update on table "public"."station_has_instruments" to "authenticated";

grant delete on table "public"."station_has_instruments" to "service_role";

grant insert on table "public"."station_has_instruments" to "service_role";

grant references on table "public"."station_has_instruments" to "service_role";

grant select on table "public"."station_has_instruments" to "service_role";

grant trigger on table "public"."station_has_instruments" to "service_role";

grant truncate on table "public"."station_has_instruments" to "service_role";

grant update on table "public"."station_has_instruments" to "service_role";

grant delete on table "public"."stations" to "anon";

grant insert on table "public"."stations" to "anon";

grant references on table "public"."stations" to "anon";

grant select on table "public"."stations" to "anon";

grant trigger on table "public"."stations" to "anon";

grant truncate on table "public"."stations" to "anon";

grant update on table "public"."stations" to "anon";

grant delete on table "public"."stations" to "authenticated";

grant insert on table "public"."stations" to "authenticated";

grant references on table "public"."stations" to "authenticated";

grant select on table "public"."stations" to "authenticated";

grant trigger on table "public"."stations" to "authenticated";

grant truncate on table "public"."stations" to "authenticated";

grant update on table "public"."stations" to "authenticated";

grant delete on table "public"."stations" to "service_role";

grant insert on table "public"."stations" to "service_role";

grant references on table "public"."stations" to "service_role";

grant select on table "public"."stations" to "service_role";

grant trigger on table "public"."stations" to "service_role";

grant truncate on table "public"."stations" to "service_role";

grant update on table "public"."stations" to "service_role";


