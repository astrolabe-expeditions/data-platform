alter table "public"."models" drop column "program";

alter table "public"."models" drop column "version";

alter table "public"."models" add column "description" text;


