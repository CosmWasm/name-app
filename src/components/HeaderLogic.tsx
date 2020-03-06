import * as React from "react";

import { useAccount } from "../service";
import { Header } from "../theme";

// HeaderLogic calculates the values to render the header component (which can be theme'd)
function HeaderLogic(): JSX.Element {
  const { account } = useAccount();
  console.log(`HeaderLogic called with ${account}`);

  return <Header account={account} />;
}

export default HeaderLogic;
