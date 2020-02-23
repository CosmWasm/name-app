import * as React from "react";

import { useError } from "../service";
import { ErrorMessage } from "../theme";

// HeaderLogic calculates the values to render the header component (which can be theme'd)
function ErrorLogic(): JSX.Element {
    const { error, clearError } = useError();

    if (error) {
        return (<ErrorMessage error={error} clearError={clearError} />);
    } else {
        return (<div />);
    }
}
  
export default ErrorLogic;
