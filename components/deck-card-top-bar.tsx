import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "./ui/button";
import { P } from "./ui/typography";

const TopBar = ({
  totalSwiped,
  totalCards,
}: {
  totalSwiped: number;
  totalCards: number;
}) => (
  <View className="flex w-full flex-row items-center justify-between text-muted">
    <Button
      variant="ghost"
      className="flex items-center justify-center"
      onPress={() => router.back()}
    >
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={28}
        color="#6B7990"
      />
    </Button>
    {totalCards === 0 ? (
      <P className="pt-2 text-center align-bottom font-semibold text-muted-foreground">
        It's empty
      </P>
    ) : (
      <P className="pt-2 text-center align-bottom font-semibold text-muted-foreground">
        {totalSwiped} / {totalCards}
      </P>
    )}
    <Button variant="ghost" className="flex items-center justify-center">
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={28}
        color="#6B7990"
      />
    </Button>
  </View>
);

export default TopBar;
