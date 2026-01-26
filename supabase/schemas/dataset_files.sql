CREATE TABLE public.dataset_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  extension text NOT NULL,
  dataset_id uuid NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
  instrument_id uuid NOT NULL REFERENCES public.instruments(id) ON DELETE CASCADE,
  path text NOT NULL,
  started_at timestamp WITH time zone,
  uploaded_at timestamp WITH time zone DEFAULT NOW(),
  processed boolean DEFAULT false,
  processed_at timestamp WITH time zone
);

ALTER TABLE
  public.dataset_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view files" ON public.dataset_files FOR
SELECT
  TO authenticated USING (TRUE);

CREATE POLICY "Allow all authenticated users to insert files" ON public.dataset_files FOR
INSERT
  TO authenticated WITH CHECK (TRUE);

INSERT INTO
  STORAGE.buckets (id, name, public)
VALUES
  ('dataset_files', 'dataset_files', false) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can access dataset_files bucket" ON STORAGE.objects FOR
SELECT
  TO authenticated USING (bucket_id = 'dataset_files');

CREATE POLICY "Authenticated users can insert files into dataset_files bucket" ON STORAGE.objects FOR
INSERT
  TO authenticated WITH CHECK (bucket_id = 'dataset_files');
