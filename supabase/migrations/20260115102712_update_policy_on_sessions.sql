alter table "public"."sessions" alter column "station_id" set not null;


  create policy "Allow all authenticated users to insert sessions"
  on "public"."sessions"
  as permissive
  for insert
  to authenticated
with check (true);



