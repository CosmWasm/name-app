import React from 'react';
import logo from './logo.svg';
import './App.css';

import ContractList from "./components/ContractList";

function App() {
  const items = [
      {name: "First Contract", address: "1234567890"},
      {name: "Second Contract", address: "DEADBEEF"},
    ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ContractList items={items} />
      </header>
    </div>
  );
}

export default App;
