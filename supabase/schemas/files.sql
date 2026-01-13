create table public.files (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  storage_path text not null,
  uploaded_at timestamp with time zone default now(),
  processed boolean default false,
  processed_at timestamp with time zone
);

ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view files"
  ON public.files
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert files"
  ON public.files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
