import React from 'react';
import { useParams } from 'react-router';

import ContractDetails from "../../components/ContractDetails";

function Details() {
    let { address } = useParams();
    const details = {
        name: "Tester",
        address: address || "unknown",
        topName: "Johnny Rocket",
    };
    

  return (
        <ContractDetails {...details} />
  );
}

export default Details;
