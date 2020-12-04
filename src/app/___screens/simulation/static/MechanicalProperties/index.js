import MechanicalPropertiesContent from "./content";
import Index from "../../../../components/PantoCard";
import React, {Component} from "react";
import DataHandler, {mechanicalProperties,setMechanicalProperties} from "../dataHandler";

class MechanicalProperties extends Component {

    state = {
        loading: true
    }


    render() {
        return([
            <Index
                loading={this.state.loading}
            >
                <header><h6>Mechanical Properties</h6></header>
                {this.state.loading ? '' :
                    <MechanicalPropertiesContent
                        data={mechanicalProperties()}
                        set_data={setMechanicalProperties}
                    />
                }
            </Index>,

            <DataHandler load={()=>{
                this.setState({
                    loading: false
                })
            }}/>

        ])
    }

}

export default MechanicalProperties