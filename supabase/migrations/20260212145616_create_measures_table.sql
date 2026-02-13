
  create table "public"."measures" (
    "id" uuid not null default gen_random_uuid(),
    "recorded_at" timestamp with time zone not null,
    "position" extensions.geography,
    "parameters" jsonb,
    "instrument_id" uuid not null,
    "dataset_id" uuid not null
      );


alter table "public"."measures" enable row level security;

CREATE UNIQUE INDEX measures_pkey ON public.measures USING btree (id);

alter table "public"."measures" add constraint "measures_pkey" PRIMARY KEY using index "measures_pkey";

alter table "public"."measures" add constraint "measures_dataset_id_fkey" FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE not valid;

alter table "public"."measures" validate constraint "measures_dataset_id_fkey";

alter table "public"."measures" add constraint "measures_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES public.instruments(id) ON DELETE CASCADE not valid;

alter table "public"."measures" validate constraint "measures_instrument_id_fkey";

grant delete on table "public"."measures" to "anon";

grant insert on table "public"."measures" to "anon";

grant references on table "public"."measures" to "anon";

grant select on table "public"."measures" to "anon";

grant trigger on table "public"."measures" to "anon";

grant truncate on table "public"."measures" to "anon";

grant update on table "public"."measures" to "anon";

grant delete on table "public"."measures" to "authenticated";

grant insert on table "public"."measures" to "authenticated";

grant references on table "public"."measures" to "authenticated";

grant select on table "public"."measures" to "authenticated";

grant trigger on table "public"."measures" to "authenticated";

grant truncate on table "public"."measures" to "authenticated";

grant update on table "public"."measures" to "authenticated";

grant delete on table "public"."measures" to "service_role";

grant insert on table "public"."measures" to "service_role";

grant references on table "public"."measures" to "service_role";

grant select on table "public"."measures" to "service_role";

grant trigger on table "public"."measures" to "service_role";

grant truncate on table "public"."measures" to "service_role";

grant update on table "public"."measures" to "service_role";


  create policy "Allow all authenticated users to view measures"
  on "public"."measures"
  as permissive
  for select
  to authenticated
using (true);



