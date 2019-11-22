// @flow

import React from "react";
import MonthGrid from "./components/MonthGrid";
import { AppContainer, Header } from "./App.styles";

const App = () => {
  return (
    <AppContainer>
      <Header>
        <MonthGrid />
      </Header>
    </AppContainer>
  );
};

export default App;
