CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  program_id uuid REFERENCES public.programs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

ALTER TABLE
  public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to view campaigns" ON public.campaigns FOR
SELECT
  TO anon, authenticated USING (TRUE);
