import HomeTab from "@/components/tabs/home-tab";
import { clearDeckStore } from "@/lib/store";
import React from "react";

const Home = () => {
  const isTmpClear = false;

  if (isTmpClear) {
    clearDeckStore();
  }

  // React.useEffect(() => {
  //   const getTodos = async () => {
  //     const { data } = await supabase.schema("public").from("deck").select();

  //     console.log("data", data);
  //   };

  //   getTodos();
  // }, []);

  return <HomeTab />;
};

export default Home;
