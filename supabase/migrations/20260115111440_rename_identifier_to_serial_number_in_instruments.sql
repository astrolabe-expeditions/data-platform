alter table "public"."instruments" drop constraint "instruments_identifier_key";

drop index if exists "public"."instruments_identifier_key";

alter table "public"."instruments" drop column "identifier";

alter table "public"."instruments" add column "serial_number" text not null;

CREATE UNIQUE INDEX instruments_serial_number_key ON public.instruments USING btree (serial_number);

alter table "public"."instruments" add constraint "instruments_serial_number_key" UNIQUE using index "instruments_serial_number_key";


