import React from 'react';
import { useParams } from 'react-router';

import ContractLogic from "../components/ContractLogic";

function ContractSearch() {
  let { address } = useParams();

  return (
        <ContractLogic address={address || ""} />
  );
}

export default ContractSearch;