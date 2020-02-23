import * as React from "react";

interface Props {
    readonly children: any;
};

// TODO: add any global styling here
export function PageLayout({children}: Props): JSX.Element {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}