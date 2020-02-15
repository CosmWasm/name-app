import React from 'react';

import ContractList from "../../components/ContractList";

function Root() {
  const items = [
      {name: "First Contract", address: "1234567890"},
      {name: "Second Contract", address: "DEADBEEF"},
    ];

  return (
    <ContractList items={items} />
  );
}

export default Root;
