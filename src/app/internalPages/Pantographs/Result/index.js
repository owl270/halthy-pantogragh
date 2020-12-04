import React from "react";
import PantoCard from "../../../components/PantoCard";



import DataList from "./DataList";
import MapContent from "./MapContent";
import Footer from "./Footer"

import {connect} from "react-redux";

class Index extends React.Component {


    render() {
        return (
            <PantoCard
                loading={this.props.loading}
                loading_label={this.props.loading_label}
            >

                <div className="body-content">
                    <DataList/>
                    <MapContent/>
                </div>

                <Footer/>


            </PantoCard>
        )
    }


}

const stt2prp = (state) => {
    return {
        loading: state.loading,
        loading_label: state.loading_label
    }
}



export default connect(stt2prp)(Index)