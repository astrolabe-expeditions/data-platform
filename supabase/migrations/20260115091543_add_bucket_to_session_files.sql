INSERT INTO storage.buckets (id, name, public)
VALUES ('session_files', 'session_files', false)
ON CONFLICT (id) DO NOTHING;

  create policy "Authenticated users can access session_files bucket"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'session_files'::text));



  create policy "Authenticated users can insert files into session_files bucket"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'session_files'::text));



