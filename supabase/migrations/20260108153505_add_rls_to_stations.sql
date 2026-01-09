alter table "public"."instruments" alter column "model_id" set not null;


  create policy "Allow all authenticated users to view stations"
  on "public"."stations"
  as permissive
  for select
  to authenticated
using (true);



