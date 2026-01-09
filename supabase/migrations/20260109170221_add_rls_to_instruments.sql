
  create policy "Allow all authenticated users to view instruments"
  on "public"."instruments"
  as permissive
  for select
  to authenticated
using (true);



