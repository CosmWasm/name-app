import React from 'react';
import logo from './logo.svg';
import './App.css';

import ContractList from "./components/ContractList";
import ContractDetails from "./components/ContractDetails";

function App() {
  return (
    <div className="App">
        <ContractList />
    </div>
  );
}

export default App;
