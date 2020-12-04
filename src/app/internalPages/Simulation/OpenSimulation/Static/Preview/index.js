import * as React from "react";
import PantoCard from "../../../../../components/PantoCard";
import Preview from "./_preview"

class Index extends React.Component {

    render() {

        return <>
            <PantoCard>
                <header><h6>Preview</h6></header>
                <Preview/>
            </PantoCard>
        </>

    }

}

export default Index