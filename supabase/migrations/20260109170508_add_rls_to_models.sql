
  create policy "Allow all authenticated users to view models"
  on "public"."models"
  as permissive
  for select
  to authenticated
using (true);



