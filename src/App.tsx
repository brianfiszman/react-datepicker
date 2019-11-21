import React from 'react';
import logo from './logo.svg';
import MonthGrid from './components/MonthGrid';
import { AppContainer, Header, Logo } from './App.styles';

const App: React.FC = () => {
  console.log(typeof MonthGrid);
  return (
    <AppContainer>
      <Header>
        <MonthGrid />
      </Header>
    </AppContainer>
  );
};

export default App;
