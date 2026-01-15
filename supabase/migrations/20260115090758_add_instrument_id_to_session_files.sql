alter table "public"."session_files" add column "instrument_id" uuid not null;

alter table "public"."sessions" add column "description" text;

alter table "public"."session_files" add constraint "session_files_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES public.instruments(id) ON DELETE CASCADE not valid;

alter table "public"."session_files" validate constraint "session_files_instrument_id_fkey";


