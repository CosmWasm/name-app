import React from "react";
import { useParams } from "react-router";

import ContractLogic from "../components/ContractLogic";

function NameDetails(): JSX.Element {
  const { address, name } = useParams();

  return <ContractLogic address={address || ""} name={name} />;
}

export default NameDetails;
