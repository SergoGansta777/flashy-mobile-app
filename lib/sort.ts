import { Blocks } from "@/lib/icons/Blocks";
import { Clock } from "@/lib/icons/Clock";
import { Star } from "@/lib/icons/Star";
import { WholeWord } from "@/lib/icons/WholeWord";
import type { CardDeck } from "@/types";

export const deckSortOptions = [
  {
    id: 1,
    icon: Clock,
    label: "Created at",
    sortFunction: (a: CardDeck, b: CardDeck) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  },
  {
    id: 2,
    icon: Star,
    label: "Favorite",
    sortFunction: (a: CardDeck, b: CardDeck) =>
      Number(!!b.isFavorite) - Number(!!a.isFavorite),
  },
  {
    id: 3,
    icon: Blocks,
    label: "Terms",
    sortFunction: (a: CardDeck, b: CardDeck) =>
      (b.cards?.length || 0) - (a.cards?.length || 0),
  },
  {
    id: 4,
    icon: WholeWord,
    label: "Name",
    sortFunction: (a: CardDeck, b: CardDeck) =>
      (a.name || "").localeCompare(b.name || ""),
  },
];
