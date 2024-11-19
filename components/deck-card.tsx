import type { CardDeck } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { H2, Small } from "./ui/typography";

type DeckCardProps = {
  deck: CardDeck;
  handleToggleFavorite: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

const DeckCard: React.FC<DeckCardProps> = ({
  deck,
  handleToggleFavorite,
  handleDelete,
  handleEdit,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ContextMenu>
      <Link
        asChild
        href={{
          pathname: "/deck/[id]",
          params: { id: deck.id },
        }}
      >
        <ContextMenuTrigger
          onLongPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          }
        >
          <Card className="mx-6 mt-3">
            <CardHeader>
              <View className="flex flex-row items-start justify-between">
                <H2 className="border-b-0 pb-1.5 font-medium tracking-wide">
                  {deck.name}
                </H2>
                <TouchableOpacity
                  key={deck.id}
                  onPress={() => handleToggleFavorite(deck.id)}
                >
                  <AntDesign
                    name={deck.isFavorite ? "star" : "staro"}
                    size={22}
                  />
                </TouchableOpacity>
              </View>

              <CardDescription>Terms: {deck.cards.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <Small className="text-muted-foreground">
                Created at {deck.createdAt.toLocaleDateString()}
              </Small>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
      </Link>

      <ContextMenuContent align="end" insets={insets}>
        <ContextMenuItem
          inset
          className="-pl-1"
          onPress={() => handleEdit(deck.id)}
        >
          <AntDesign name="edit" size={22} />
          <Text>Edit</Text>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="-pl-1"
          onPress={() => handleDelete(deck.id)}
        >
          <AntDesign name="delete" size={22} />
          <Text>Delete</Text>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="-pl-1"
          onPress={() => handleToggleFavorite(deck.id)}
        >
          <AntDesign name={deck.isFavorite ? "star" : "staro"} size={22} />
          <Text>Toggle favorite</Text>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DeckCard;
