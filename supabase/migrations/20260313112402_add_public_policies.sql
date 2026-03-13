
  create policy "Public can view public datasets"
  on "public"."datasets"
  as permissive
  for select
  to anon
using (((is_public = true) AND (deleted_at IS NULL)));



  create policy "Public can view instruments of public stations"
  on "public"."instruments"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM ((public.station_has_instruments shi
     JOIN public.stations s ON ((s.id = shi.station_id)))
     JOIN public.datasets d ON ((d.station_id = s.id)))
  WHERE ((shi.instrument_id = instruments.id) AND (d.is_public = true) AND (d.deleted_at IS NULL)))));



  create policy "Public can view measures from public datasets"
  on "public"."measures"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM public.datasets d
  WHERE ((d.id = measures.dataset_id) AND (d.is_public = true) AND (d.deleted_at IS NULL)))));



  create policy "Public can view station-instrument links for public stations"
  on "public"."station_has_instruments"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM (public.stations s
     JOIN public.datasets d ON ((d.station_id = s.id)))
  WHERE ((s.id = station_has_instruments.station_id) AND (d.is_public = true) AND (d.deleted_at IS NULL)))));



  create policy "Public can view stations with public datasets"
  on "public"."stations"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM public.datasets d
  WHERE ((d.station_id = stations.id) AND (d.is_public = true) AND (d.deleted_at IS NULL)))));



