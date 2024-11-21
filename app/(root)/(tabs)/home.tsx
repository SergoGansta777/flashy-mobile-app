import HomeTab from "@/components/tabs/home-tab";
import { clearDeckStore } from "@/lib/store";
import React from "react";

const Home = () => {
  const isTmpClear = false;

  if (isTmpClear) {
    clearDeckStore();
  }

  return <HomeTab />;
};

export default Home;
