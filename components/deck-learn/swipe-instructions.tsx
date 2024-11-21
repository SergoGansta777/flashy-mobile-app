import React, { useCallback, useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Muted } from "../ui/typography";

const SwipeInstructions = () => {
  const [message, setMessage] = useState(0);
  const opacity = useSharedValue(1);
  const messageIndex = useSharedValue(0);

  const toggleMessage = useCallback(() => {
    opacity.value = withTiming(0, { duration: 900 }, () => {
      messageIndex.value = Math.floor(Math.random() * 3);
      opacity.value = withTiming(1, { duration: 900 });
    });
  }, [opacity, messageIndex]);

  useEffect(() => {
    const interval = setInterval(toggleMessage, 5000);
    return () => clearInterval(interval);
  }, [toggleMessage]);

  useDerivedValue(() => {
    runOnJS(setMessage)(messageIndex.value);
  }, [messageIndex.value]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Muted>
        {message === 0 && (
          <>
            Swipe left to mark as{" "}
            <Muted className="font-bold">Still learning</Muted>
          </>
        )}
        {message === 1 && (
          <>
            Swipe right to mark as <Muted className="font-bold">Known</Muted>
          </>
        )}
        {message === 2 && (
          <>
            Tap on card to reveal <Muted className="font-bold">Answer</Muted>
          </>
        )}
      </Muted>
    </Animated.View>
  );
};

export default SwipeInstructions;
