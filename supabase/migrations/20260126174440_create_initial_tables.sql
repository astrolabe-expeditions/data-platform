CREATE extension IF NOT EXISTS "postgis" WITH schema "extensions";

CREATE TABLE "public"."dataset_files" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "extension" text NOT NULL,
  "dataset_id" uuid NOT NULL,
  "instrument_id" uuid NOT NULL,
  "path" text NOT NULL,
  "started_at" timestamp WITH time zone,
  "uploaded_at" timestamp WITH time zone DEFAULT NOW(),
  "processed" boolean DEFAULT false,
  "processed_at" timestamp WITH time zone
);

ALTER TABLE
  "public"."dataset_files" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."datasets" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "description" text,
  "start_at" timestamp WITH time zone NOT NULL,
  "end_at" timestamp WITH time zone NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "deleted_at" timestamp WITH time zone,
  "station_id" uuid NOT NULL
);

ALTER TABLE
  "public"."datasets" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."instruments" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "serial_number" text NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "deleted_at" timestamp WITH time zone,
  "model_id" uuid NOT NULL
);

ALTER TABLE
  "public"."instruments" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."models" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "code" text NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "deleted_at" timestamp WITH time zone
);

ALTER TABLE
  "public"."models" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."station_has_instruments" (
  "station_id" uuid NOT NULL,
  "instrument_id" uuid NOT NULL,
  "assigned_at" timestamp WITH time zone DEFAULT NOW(),
  "unassigned_at" timestamp WITH time zone
);

ALTER TABLE
  "public"."station_has_instruments" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."stations" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "description" text,
  "is_mobile" boolean NOT NULL DEFAULT false,
  "position" extensions.geography(Point, 4326),
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "updated_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "deleted_at" timestamp WITH time zone
);

ALTER TABLE
  "public"."stations" enable ROW LEVEL SECURITY;

CREATE UNIQUE INDEX dataset_files_pkey ON public.dataset_files USING btree (id);

CREATE UNIQUE INDEX datasets_pkey ON public.datasets USING btree (id);

CREATE UNIQUE INDEX instruments_pkey ON public.instruments USING btree (id);

CREATE UNIQUE INDEX instruments_serial_number_key ON public.instruments USING btree (serial_number);

CREATE UNIQUE INDEX models_pkey ON public.models USING btree (id);

CREATE UNIQUE INDEX station_has_instruments_pkey ON public.station_has_instruments USING btree (station_id, instrument_id);

CREATE UNIQUE INDEX stations_pkey ON public.stations USING btree (id);

ALTER TABLE
  "public"."dataset_files"
ADD
  CONSTRAINT "dataset_files_pkey" PRIMARY KEY USING INDEX "dataset_files_pkey";

ALTER TABLE
  "public"."datasets"
ADD
  CONSTRAINT "datasets_pkey" PRIMARY KEY USING INDEX "datasets_pkey";

ALTER TABLE
  "public"."instruments"
ADD
  CONSTRAINT "instruments_pkey" PRIMARY KEY USING INDEX "instruments_pkey";

ALTER TABLE
  "public"."models"
ADD
  CONSTRAINT "models_pkey" PRIMARY KEY USING INDEX "models_pkey";

ALTER TABLE
  "public"."station_has_instruments"
ADD
  CONSTRAINT "station_has_instruments_pkey" PRIMARY KEY USING INDEX "station_has_instruments_pkey";

ALTER TABLE
  "public"."stations"
ADD
  CONSTRAINT "stations_pkey" PRIMARY KEY USING INDEX "stations_pkey";

ALTER TABLE
  "public"."dataset_files"
ADD
  CONSTRAINT "dataset_files_dataset_id_fkey" FOREIGN KEY (dataset_id) REFERENCES public.datasets(id) ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."dataset_files" validate CONSTRAINT "dataset_files_dataset_id_fkey";

ALTER TABLE
  "public"."dataset_files"
ADD
  CONSTRAINT "dataset_files_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES public.instruments(id) ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."dataset_files" validate CONSTRAINT "dataset_files_instrument_id_fkey";

ALTER TABLE
  "public"."datasets"
ADD
  CONSTRAINT "datasets_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."datasets" validate CONSTRAINT "datasets_station_id_fkey";

ALTER TABLE
  "public"."instruments"
ADD
  CONSTRAINT "instruments_model_id_fkey" FOREIGN KEY (model_id) REFERENCES public.models(id) NOT valid;

ALTER TABLE
  "public"."instruments" validate CONSTRAINT "instruments_model_id_fkey";

ALTER TABLE
  "public"."instruments"
ADD
  CONSTRAINT "instruments_serial_number_key" UNIQUE USING INDEX "instruments_serial_number_key";

ALTER TABLE
  "public"."station_has_instruments"
ADD
  CONSTRAINT "station_has_instruments_instrument_id_fkey" FOREIGN KEY (instrument_id) REFERENCES public.instruments(id) ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."station_has_instruments" validate CONSTRAINT "station_has_instruments_instrument_id_fkey";

ALTER TABLE
  "public"."station_has_instruments"
ADD
  CONSTRAINT "station_has_instruments_station_id_fkey" FOREIGN KEY (station_id) REFERENCES public.stations(id) ON DELETE CASCADE NOT valid;

ALTER TABLE
  "public"."station_has_instruments" validate CONSTRAINT "station_has_instruments_station_id_fkey";

GRANT DELETE ON TABLE "public"."dataset_files" TO "anon";

GRANT
INSERT
  ON TABLE "public"."dataset_files" TO "anon";

GRANT REFERENCES ON TABLE "public"."dataset_files" TO "anon";

GRANT
SELECT
  ON TABLE "public"."dataset_files" TO "anon";

GRANT trigger ON TABLE "public"."dataset_files" TO "anon";

GRANT TRUNCATE ON TABLE "public"."dataset_files" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."dataset_files" TO "anon";

GRANT DELETE ON TABLE "public"."dataset_files" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."dataset_files" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."dataset_files" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."dataset_files" TO "authenticated";

GRANT trigger ON TABLE "public"."dataset_files" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."dataset_files" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."dataset_files" TO "authenticated";

GRANT DELETE ON TABLE "public"."dataset_files" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."dataset_files" TO "service_role";

GRANT REFERENCES ON TABLE "public"."dataset_files" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."dataset_files" TO "service_role";

GRANT trigger ON TABLE "public"."dataset_files" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."dataset_files" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."dataset_files" TO "service_role";

GRANT DELETE ON TABLE "public"."datasets" TO "anon";

GRANT
INSERT
  ON TABLE "public"."datasets" TO "anon";

GRANT REFERENCES ON TABLE "public"."datasets" TO "anon";

GRANT
SELECT
  ON TABLE "public"."datasets" TO "anon";

GRANT trigger ON TABLE "public"."datasets" TO "anon";

GRANT TRUNCATE ON TABLE "public"."datasets" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."datasets" TO "anon";

GRANT DELETE ON TABLE "public"."datasets" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."datasets" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."datasets" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."datasets" TO "authenticated";

GRANT trigger ON TABLE "public"."datasets" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."datasets" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."datasets" TO "authenticated";

GRANT DELETE ON TABLE "public"."datasets" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."datasets" TO "service_role";

GRANT REFERENCES ON TABLE "public"."datasets" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."datasets" TO "service_role";

GRANT trigger ON TABLE "public"."datasets" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."datasets" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."datasets" TO "service_role";

GRANT DELETE ON TABLE "public"."instruments" TO "anon";

GRANT
INSERT
  ON TABLE "public"."instruments" TO "anon";

GRANT REFERENCES ON TABLE "public"."instruments" TO "anon";

GRANT
SELECT
  ON TABLE "public"."instruments" TO "anon";

GRANT trigger ON TABLE "public"."instruments" TO "anon";

GRANT TRUNCATE ON TABLE "public"."instruments" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."instruments" TO "anon";

GRANT DELETE ON TABLE "public"."instruments" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."instruments" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."instruments" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."instruments" TO "authenticated";

GRANT trigger ON TABLE "public"."instruments" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."instruments" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."instruments" TO "authenticated";

GRANT DELETE ON TABLE "public"."instruments" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."instruments" TO "service_role";

GRANT REFERENCES ON TABLE "public"."instruments" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."instruments" TO "service_role";

GRANT trigger ON TABLE "public"."instruments" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."instruments" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."instruments" TO "service_role";

GRANT DELETE ON TABLE "public"."models" TO "anon";

GRANT
INSERT
  ON TABLE "public"."models" TO "anon";

GRANT REFERENCES ON TABLE "public"."models" TO "anon";

GRANT
SELECT
  ON TABLE "public"."models" TO "anon";

GRANT trigger ON TABLE "public"."models" TO "anon";

GRANT TRUNCATE ON TABLE "public"."models" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."models" TO "anon";

GRANT DELETE ON TABLE "public"."models" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."models" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."models" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."models" TO "authenticated";

GRANT trigger ON TABLE "public"."models" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."models" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."models" TO "authenticated";

GRANT DELETE ON TABLE "public"."models" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."models" TO "service_role";

GRANT REFERENCES ON TABLE "public"."models" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."models" TO "service_role";

GRANT trigger ON TABLE "public"."models" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."models" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."models" TO "service_role";

GRANT DELETE ON TABLE "public"."station_has_instruments" TO "anon";

GRANT
INSERT
  ON TABLE "public"."station_has_instruments" TO "anon";

GRANT REFERENCES ON TABLE "public"."station_has_instruments" TO "anon";

GRANT
SELECT
  ON TABLE "public"."station_has_instruments" TO "anon";

GRANT trigger ON TABLE "public"."station_has_instruments" TO "anon";

GRANT TRUNCATE ON TABLE "public"."station_has_instruments" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."station_has_instruments" TO "anon";

GRANT DELETE ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT trigger ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."station_has_instruments" TO "authenticated";

GRANT DELETE ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT REFERENCES ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT trigger ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."station_has_instruments" TO "service_role";

GRANT DELETE ON TABLE "public"."stations" TO "anon";

GRANT
INSERT
  ON TABLE "public"."stations" TO "anon";

GRANT REFERENCES ON TABLE "public"."stations" TO "anon";

GRANT
SELECT
  ON TABLE "public"."stations" TO "anon";

GRANT trigger ON TABLE "public"."stations" TO "anon";

GRANT TRUNCATE ON TABLE "public"."stations" TO "anon";

GRANT
UPDATE
  ON TABLE "public"."stations" TO "anon";

GRANT DELETE ON TABLE "public"."stations" TO "authenticated";

GRANT
INSERT
  ON TABLE "public"."stations" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."stations" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."stations" TO "authenticated";

GRANT trigger ON TABLE "public"."stations" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."stations" TO "authenticated";

GRANT
UPDATE
  ON TABLE "public"."stations" TO "authenticated";

GRANT DELETE ON TABLE "public"."stations" TO "service_role";

GRANT
INSERT
  ON TABLE "public"."stations" TO "service_role";

GRANT REFERENCES ON TABLE "public"."stations" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."stations" TO "service_role";

GRANT trigger ON TABLE "public"."stations" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."stations" TO "service_role";

GRANT
UPDATE
  ON TABLE "public"."stations" TO "service_role";

CREATE policy "Allow all authenticated users to insert files" ON "public"."dataset_files" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (TRUE);

CREATE policy "Allow all authenticated users to view files" ON "public"."dataset_files" AS permissive FOR
SELECT
  TO authenticated USING (TRUE);

CREATE policy "Allow all authenticated users to insert datasets" ON "public"."datasets" AS permissive FOR
INSERT
  TO authenticated WITH CHECK (TRUE);

CREATE policy "Allow all authenticated users to view datasets" ON "public"."datasets" AS permissive FOR
SELECT
  TO authenticated USING (TRUE);

CREATE policy "Allow all authenticated users to view instruments" ON "public"."instruments" AS permissive FOR
SELECT
  TO authenticated USING (TRUE);

CREATE policy "Allow all authenticated users to view models" ON "public"."models" AS permissive FOR
SELECT
  TO authenticated USING (TRUE);

CREATE policy "Allow all authenticated users to view station_has_instruments" ON "public"."station_has_instruments" AS permissive FOR
SELECT
  TO authenticated USING (TRUE);

CREATE policy "Allow all authenticated users to view stations" ON "public"."stations" AS permissive FOR
SELECT
  TO authenticated USING (TRUE);

CREATE policy "Authenticated users can access dataset_files bucket" ON "storage"."objects" AS permissive FOR
SELECT
  TO authenticated USING ((bucket_id = 'dataset_files' :: text));

CREATE policy "Authenticated users can insert files into dataset_files bucket" ON "storage"."objects" AS permissive FOR
INSERT
  TO authenticated WITH CHECK ((bucket_id = 'dataset_files' :: text));

INSERT INTO
  STORAGE.buckets (id, name, public)
VALUES
  ('dataset_files', 'dataset_files', false) ON CONFLICT (id) DO NOTHING;
