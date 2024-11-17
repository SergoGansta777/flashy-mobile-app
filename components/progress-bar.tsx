import { View } from "react-native";
import { Progress } from "./ui/progress";

const ProgressBar = ({ value, total }: { value: number; total: number }) => (
  <View className="my-1 w-full">
    <Progress
      className="h-1 rounded-none bg-transparent"
      value={(value / total) * 100}
    />
  </View>
);

export default ProgressBar;
