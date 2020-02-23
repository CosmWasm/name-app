import * as React from "react";

export function PageLayout(props: {readonly children: any}): JSX.Element {
    // Here you can provide any generic styling that you wish to provide on the page
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}