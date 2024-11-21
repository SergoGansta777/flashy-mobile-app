revoke delete on table "public"."Deck" from "anon";

revoke insert on table "public"."Deck" from "anon";

revoke references on table "public"."Deck" from "anon";

revoke select on table "public"."Deck" from "anon";

revoke trigger on table "public"."Deck" from "anon";

revoke truncate on table "public"."Deck" from "anon";

revoke update on table "public"."Deck" from "anon";

revoke delete on table "public"."Deck" from "authenticated";

revoke insert on table "public"."Deck" from "authenticated";

revoke references on table "public"."Deck" from "authenticated";

revoke select on table "public"."Deck" from "authenticated";

revoke trigger on table "public"."Deck" from "authenticated";

revoke truncate on table "public"."Deck" from "authenticated";

revoke update on table "public"."Deck" from "authenticated";

revoke delete on table "public"."Deck" from "service_role";

revoke insert on table "public"."Deck" from "service_role";

revoke references on table "public"."Deck" from "service_role";

revoke select on table "public"."Deck" from "service_role";

revoke trigger on table "public"."Deck" from "service_role";

revoke truncate on table "public"."Deck" from "service_role";

revoke update on table "public"."Deck" from "service_role";

revoke delete on table "public"."FlashCard" from "anon";

revoke insert on table "public"."FlashCard" from "anon";

revoke references on table "public"."FlashCard" from "anon";

revoke select on table "public"."FlashCard" from "anon";

revoke trigger on table "public"."FlashCard" from "anon";

revoke truncate on table "public"."FlashCard" from "anon";

revoke update on table "public"."FlashCard" from "anon";

revoke delete on table "public"."FlashCard" from "authenticated";

revoke insert on table "public"."FlashCard" from "authenticated";

revoke references on table "public"."FlashCard" from "authenticated";

revoke select on table "public"."FlashCard" from "authenticated";

revoke trigger on table "public"."FlashCard" from "authenticated";

revoke truncate on table "public"."FlashCard" from "authenticated";

revoke update on table "public"."FlashCard" from "authenticated";

revoke delete on table "public"."FlashCard" from "service_role";

revoke insert on table "public"."FlashCard" from "service_role";

revoke references on table "public"."FlashCard" from "service_role";

revoke select on table "public"."FlashCard" from "service_role";

revoke trigger on table "public"."FlashCard" from "service_role";

revoke truncate on table "public"."FlashCard" from "service_role";

revoke update on table "public"."FlashCard" from "service_role";

alter table "public"."FlashCard" drop constraint "FlashCard_deck_id_fkey";

alter table "public"."Deck" drop constraint "FlashCardDeck_pkey";

alter table "public"."FlashCard" drop constraint "FlashCard_pkey";

drop index if exists "public"."FlashCardDeck_pkey";

drop index if exists "public"."FlashCard_pkey";

drop table "public"."Deck";

drop table "public"."FlashCard";

create table "public"."deck" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "name" character varying not null,
    "is_favorite" boolean not null default false
);


alter table "public"."deck" enable row level security;

create table "public"."flash_card" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "term" character varying not null,
    "definition" character varying not null,
    "deck_id" uuid not null
);


alter table "public"."flash_card" enable row level security;

CREATE UNIQUE INDEX "FlashCardDeck_pkey" ON public.deck USING btree (id);

CREATE UNIQUE INDEX "FlashCard_pkey" ON public.flash_card USING btree (id);

alter table "public"."deck" add constraint "FlashCardDeck_pkey" PRIMARY KEY using index "FlashCardDeck_pkey";

alter table "public"."flash_card" add constraint "FlashCard_pkey" PRIMARY KEY using index "FlashCard_pkey";

alter table "public"."flash_card" add constraint "FlashCard_deck_id_fkey" FOREIGN KEY (deck_id) REFERENCES deck(id) ON DELETE CASCADE not valid;

alter table "public"."flash_card" validate constraint "FlashCard_deck_id_fkey";

grant delete on table "public"."deck" to "anon";

grant insert on table "public"."deck" to "anon";

grant references on table "public"."deck" to "anon";

grant select on table "public"."deck" to "anon";

grant trigger on table "public"."deck" to "anon";

grant truncate on table "public"."deck" to "anon";

grant update on table "public"."deck" to "anon";

grant delete on table "public"."deck" to "authenticated";

grant insert on table "public"."deck" to "authenticated";

grant references on table "public"."deck" to "authenticated";

grant select on table "public"."deck" to "authenticated";

grant trigger on table "public"."deck" to "authenticated";

grant truncate on table "public"."deck" to "authenticated";

grant update on table "public"."deck" to "authenticated";

grant delete on table "public"."deck" to "service_role";

grant insert on table "public"."deck" to "service_role";

grant references on table "public"."deck" to "service_role";

grant select on table "public"."deck" to "service_role";

grant trigger on table "public"."deck" to "service_role";

grant truncate on table "public"."deck" to "service_role";

grant update on table "public"."deck" to "service_role";

grant delete on table "public"."flash_card" to "anon";

grant insert on table "public"."flash_card" to "anon";

grant references on table "public"."flash_card" to "anon";

grant select on table "public"."flash_card" to "anon";

grant trigger on table "public"."flash_card" to "anon";

grant truncate on table "public"."flash_card" to "anon";

grant update on table "public"."flash_card" to "anon";

grant delete on table "public"."flash_card" to "authenticated";

grant insert on table "public"."flash_card" to "authenticated";

grant references on table "public"."flash_card" to "authenticated";

grant select on table "public"."flash_card" to "authenticated";

grant trigger on table "public"."flash_card" to "authenticated";

grant truncate on table "public"."flash_card" to "authenticated";

grant update on table "public"."flash_card" to "authenticated";

grant delete on table "public"."flash_card" to "service_role";

grant insert on table "public"."flash_card" to "service_role";

grant references on table "public"."flash_card" to "service_role";

grant select on table "public"."flash_card" to "service_role";

grant trigger on table "public"."flash_card" to "service_role";

grant truncate on table "public"."flash_card" to "service_role";

grant update on table "public"."flash_card" to "service_role";


