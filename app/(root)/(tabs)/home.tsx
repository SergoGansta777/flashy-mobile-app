import HomeTab from "@/components/tabs/home-tab";
import { clearStorage } from "@/lib/store";
import React from "react";

const Home = () => {
  const isTmpClear = false;

  if (isTmpClear) {
    clearStorage();
  }

  return <HomeTab />;
};

export default Home;
