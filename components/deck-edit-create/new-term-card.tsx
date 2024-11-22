import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import NewDeckInput from "./new-deck-input";

type NewTermCardProps = {
  cardId: string;
  term: string;
  definition: string;
  handleUpdateCard: (
    cardId: string,
    key: "term" | "definition",
    value: string,
  ) => void;
};

const NewTermCard: React.FC<NewTermCardProps> = ({
  cardId,
  term,
  definition,
  handleUpdateCard,
}) => {
  return (
    <Card className="mx-6 my-4">
      <CardContent className="gap-6 py-6">
        <NewDeckInput
          placeholder=""
          value={term}
          label="Term"
          onChangeText={(text) => handleUpdateCard(cardId, "term", text)}
        />

        <NewDeckInput
          placeholder=""
          value={definition}
          label="Definition"
          onChangeText={(text) => handleUpdateCard(cardId, "definition", text)}
        />
      </CardContent>
    </Card>
  );
};

export default NewTermCard;
