alter table "public"."deck" add column "deleted" boolean not null default false;

alter table "public"."flash_card" add column "deleted" boolean not null default false;


