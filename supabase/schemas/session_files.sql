create table public.session_files (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  instrument_id uuid not null references public.instruments(id) on delete cascade,
  storage_path text not null,
  uploaded_at timestamp with time zone default now(),
  processed boolean default false,
  processed_at timestamp with time zone
);

ALTER TABLE public.session_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view files"
  ON public.session_files
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert files"
  ON public.session_files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('session_files', 'session_files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can access session_files bucket"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'session_files'
  );

CREATE POLICY "Authenticated users can insert files into session_files bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'session_files'
  );
