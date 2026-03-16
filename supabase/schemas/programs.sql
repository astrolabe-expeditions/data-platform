CREATE TABLE public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

ALTER TABLE
  public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to view programs" ON public.programs FOR
SELECT
  TO anon, authenticated USING (TRUE);
