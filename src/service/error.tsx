import * as React from "react";

export interface IErrorContext {
    readonly error?: string;
    readonly setError: (err: string) => void;
    readonly clearError: () => void;
}

const defaultContext = (): IErrorContext => {
    return {
        setError: () => { throw new Error("uninitialized"); } ,
        clearError: () => { throw new Error("uninitialized"); } ,
    };
};

export const ErrorContext = React.createContext<IErrorContext>(defaultContext());

export const useError = () => React.useContext(ErrorContext);

interface State {
    readonly error?: string;
}

/*
This tracker singleton is a bit complex, but the issue is that we want to return the same
setError, clearError functions to the consumers, so they don't trigger new effects everytime
we update the error state, which can lead to an infinite loop:

Component.useEffect returns error, calls setError
ErrorProvider updates value and returns new closure for setError
useEffect is triggered again, with another error....

When this is updated, we only want things to re-render that depend on the actual error value.
There may be cleaner ways to do this but encapsulating a singleton here seemed fine.
(We can't rely on local variables that change each time ErrorProvider() is called).
*/

class ErrorTracker {
    public callback: (state: State) => void;

    public constructor() {
        this.callback = () => { throw new Error("no callback set yet") };
    }

    public setError(err: any): void {
        console.log(`Set error: ${err}`);
        const error = (typeof err === "string") ? err : err.toString();
        this.callback({error});
    }

    public clearError(): void {
        console.log(`Clear error`);
        this.callback({});
    }
}

const tracker = new ErrorTracker();

const setError = tracker.setError.bind(tracker);
const clearError = tracker.clearError.bind(tracker);

export function ErrorProvider(props: {readonly children: any}): JSX.Element {
    console.log("Re-render ErrorProvider");
    const [value, setValue] = React.useState<State>({});
    tracker.callback = setValue;

    const context: IErrorContext = {
        error: value.error,
        setError,
        clearError,
    };

    return (
        <ErrorContext.Provider value={context}>
          {props.children}
        </ErrorContext.Provider>
      );    
}
