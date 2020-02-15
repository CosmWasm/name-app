import React from 'react';
import logo from './logo.svg';
import './App.css';

import ContractList from "./components/ContractList";
import ContractDetails from "./components/ContractDetails";

function App() {
  const items = [
      {name: "First Contract", address: "1234567890"},
      {name: "Second Contract", address: "DEADBEEF"},
    ];
  const details = {
    name: "Tester",
    address: "0xF00BA3",
    topName: "Johnny Rocket",
  };

  return (
    <div className="App">
        <ContractList items={items} />
        {/* <ContractDetails {...details} /> */}
    </div>
  );
}

export default App;
