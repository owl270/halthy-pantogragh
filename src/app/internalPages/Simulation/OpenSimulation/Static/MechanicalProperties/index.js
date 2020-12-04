import * as React from "react";
import PantoCard from "../../../../../components/PantoCard"

import Helper from "./_Helper"
import ContactWire from "./_ContactWire"
import MessengerWire from "./_MessengerWire"
import MessengerWireSupport from "./_MessengerWireSupport"
import Dropper from "./_Dropper"
import SteadyArm from "./_SteadyArm"
import StitchWire from "./_StitchWire"


class Index extends React.Component {





    render() {

        return <>
            <PantoCard>

                <header><h6>Mechanical Properties</h6></header>


                <svg viewBox="0 0 391.318 312.503">
                    <Helper/>
                    <ContactWire/>
                    <MessengerWire/>
                    <MessengerWireSupport/>
                    <StitchWire/>
                    <SteadyArm/>
                    <Dropper/>
                </svg>


            </PantoCard>
        </>

    }

}

export default Index