import * as React from "react";
import Modeling from "./Modeling";
import MechanicalProperties from "./MechanicalProperties";
import Preview from "./Preview"
import PantoCard from "../../../../components/PantoCard";
import * as actions from "../_DataHandler/_actions";
import {connect} from "react-redux";

class Index extends React.Component {

    render() {

        return <>

            <div className="panto-col static-simulation">
                <div className="panto-row">
                    <div className="panto-col simulation-static-modeling-col">
                        <Modeling/>
                    </div>
                </div>
                <div className="panto-row" style={{margin: 0}}>
                    <div className="panto-col simulation-static-preview-col">
                        <Preview/>
                    </div>
                    <div className="panto-col simulation-static-mechanical-properties-col">
                        <MechanicalProperties/>
                    </div>
                </div>
            </div>


        </>

    }

}

const stt2prp = (state) => {
    return {
        project: state.project,
        static_modeling_active_tab: state.static_modeling_active_tab,
    };
};

const dispatch2prp = (dispatch) => {
    return {
        addNotification: (notify) => actions.addNotification(dispatch, notify),

        setActiveStaticModelingTab: (tab) => actions.setActiveStaticModelingTab(dispatch, tab),

        setProjectStaticModelingValues: (id, label, value) => actions.setProjectStaticModelingValues(dispatch, id, label, value),
        addProjectStaticModelingSpan: (data) => actions.addProjectStaticModelingSpan(dispatch, data),
        removeProjectStaticModelingSpan: (id) => actions.removeProjectStaticModelingSpan(dispatch, id),
    };
};

export default connect(stt2prp, dispatch2prp)(Index);