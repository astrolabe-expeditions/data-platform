create table public.dataset_files (
  id uuid primary key default gen_random_uuid(),
  dataset_id uuid not null references public.datasets(id) on delete cascade,
  instrument_id uuid not null references public.instruments(id) on delete cascade,
  storage_path text not null,
  uploaded_at timestamp with time zone default now(),
  processed boolean default false,
  processed_at timestamp with time zone
);

ALTER TABLE public.dataset_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view files"
  ON public.dataset_files
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert files"
  ON public.dataset_files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('dataset_files', 'dataset_files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can access dataset_files bucket"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'dataset_files'
  );

CREATE POLICY "Authenticated users can insert files into dataset_files bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'dataset_files'
  );
