import * as React from "react";

import { useSdk } from "../service";
import { Loading, PageLayout } from "../theme";

// Splash is a container to either show a loading (splash) page, or render the app
// with a given PageLayout
function Splash(props: {readonly children: any}): JSX.Element {
    const { loading } = useSdk();

    if (loading) {
        return <Loading />
    } else {
        return (
            <PageLayout>
                {props.children}
            </PageLayout>
        );    
    }
}
  
export default Splash;
