import React from "react";
import { UserStore } from "./src/context/userContext";
import Tabs from "./Tabs";

const App = () => {
  return (
    <UserStore>
      <Tabs />
    </UserStore>
  );
};

export default App;
