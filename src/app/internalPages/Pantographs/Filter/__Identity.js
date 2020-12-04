import React from "react";
import PantoSelectList from "../../../components/PantoSelectList";


import {connect} from "react-redux";
import * as actionTypes from "../DataHandler/_actions";

import {isDisabled, isFocused} from "../DataHandler";
import PantoInput from "../../../components/PantoInput";
import Aux from "../../../components/_Aux";


class Index extends React.Component {


    render() {

        const {
            setTrain,
            setDevice,
            isDisabled,
            isFocused,
            setFocused,
            setBlurred,

            train_list,
            train_id,
            device_list,
            device_id

        } = this.props


        return (
            <div className="filtering-group">
                <label className="filtering-label">Identity</label>

                <div className="filtering-content">

                    <div className="input-content">
                        <i className={' panto-icon  ph-red-shock'}/>
                        <div className="range-inputs">
                            <PantoInput />
                            <span className="unit">cm</span>
                        </div>
                    </div>

                    <div className="input-content">

                        <i className={' panto-icon  ph-yellow-shock-bg'}/>

                        <div className="range-inputs">
                            <PantoInput
                                containerClass="radio-input-section"/>
                            <span className="unit">cm</span>

                        </div>
                    </div>

                    <div className="input-content">

                        <i className={' panto-icon  ph-white-shock-bg'}/>
                        <div className="range-inputs">
                            <PantoInput />
                            <span className="unit">cm</span>
                        </div>

                    </div>

                </div>


            </div>
        )
    }

}


const stt2prp = (state) => {
    return {
        train_list: state.train_list,
        train_id: state.train_id,

        device_list: state.device_list,
        device_id: state.device_id,

        isDisabled: (item) => {
            return isDisabled(state, item)
        },
        isFocused: (item) => {
            return isFocused(state, item)
        },

    }
}

const dispatch2prp = (dispatch) => {
    return {
        setTrain: (value) => dispatch({type: actionTypes.CHANGE_TRAIN, value}),
        setDevice: (value) => dispatch({type: actionTypes.CHANGE_DEVICE, value}),

        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)