import type { CardDeck } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
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
import { H4, Small } from "./ui/typography";

type DeckCardProps = {
  deck: CardDeck;
  handleToggleFavorite: () => void;
};

const DeckCard: React.FC<DeckCardProps> = ({ deck, handleToggleFavorite }) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <ContextMenu>
      <Link
        asChild
        href={{
          pathname: "/deck/[id]",
          params: { id: deck.id },
        }}
      >
        <ContextMenuTrigger>
          <Card className="mx-6 mt-3">
            <CardHeader>
              <View className="flex flex-row items-start justify-between">
                <H4 className="font-medium">{deck.name}</H4>
                <TouchableOpacity key={deck.id} onPress={handleToggleFavorite}>
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

      <ContextMenuContent
        align="start"
        insets={contentInsets}
        className="native:w-72 w-64"
      >
        <ContextMenuItem inset>
          <Text>Edit</Text>
        </ContextMenuItem>
        <ContextMenuItem inset>
          <Text>Delete</Text>
        </ContextMenuItem>
        <ContextMenuItem inset>
          <Text>Toggle favorite</Text>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DeckCard;
