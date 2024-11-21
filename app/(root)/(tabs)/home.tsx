import HomeTab from "@/components/tabs/home-tab";
import { clearDeckStore } from "@/lib/store";
import React from "react";

const Home = () => {
  React.useEffect(() => {
    clearDeckStore();
  }, []);

  return <HomeTab />;
};

export default Home;
