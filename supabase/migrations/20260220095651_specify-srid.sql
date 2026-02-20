alter table "public"."measures" alter column "position" set data type extensions.geometry(Point,4326) using "position"::extensions.geometry(Point,4326);


