import React from 'react';
import { useParams } from 'react-router';

import ContractDetails from "../../components/ContractDetails";

function Details() {
    let { address } = useParams();

  return (
        <ContractDetails address={address || ""} />
  );
}

export default Details;
