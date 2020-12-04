import React from "react";
import PantoRadio from "../../../components/PantoRadio";
import PantoInput from "../../../components/PantoInput";


import {connect} from "react-redux";
import {isDisabled, isFocused} from "../DataHandler";
import * as actionTypes from "../DataHandler/_actions";
import Aux from "../../../components/_Aux";

class Index extends React.Component {


    render() {

        const {
            section,
            setSectionType,
            setSectionTime,
            setSectionDistance,
            isDisabled,
            isFocused,
            setFocused,
            setBlurred
        } = this.props

        return (
            <div className="filtering-group">

                <label className="filtering-label">Chunk</label>

                <div className="filtering-content">

                    <div className="my-icon">
                        <i className={' panto-icon  ph-red-shock'}/>
                    <div className="parameter-input">

                        <PantoInput
                                            containerClass="radio-input-section"
                                            value={section.time}
                                            onChange={setSectionTime}
                                            onFocus={() => {
                                                setFocused('section_time')
                                            }}
                                            onBlur={() => {
                                                setBlurred('section_time')
                                            }}
                                            disabled={isDisabled('section_time')}
                                            readOnly={!isFocused('section_time')}
                                        />
                                        <span
                                            className={"unit" + (isDisabled('section_time') ? " inactive" : "")}>min</span>

                    </div>
                    </div>
                    <div className="my-icon">
                        <i className={' panto-icon  ph-red-shock'}/>
                        <div className="parameter-input">

                            <PantoInput
                                containerClass="radio-input-section"
                                value={section.time}
                                onChange={setSectionTime}
                                onFocus={() => {
                                    setFocused('section_time')
                                }}
                                onBlur={() => {
                                    setBlurred('section_time')
                                }}
                                disabled={isDisabled('section_time')}
                                readOnly={!isFocused('section_time')}
                            />
                            <span
                                className={"unit" + (isDisabled('section_time') ? " inactive" : "")}>min</span>

                        </div>
                    </div>
                    <div className="my-icon">
                        <i className={' panto-icon  ph-red-shock'}/>
                        <div className="parameter-input">

                            <PantoInput
                                containerClass="radio-input-section"
                                value={section.time}
                                onChange={setSectionTime}
                                onFocus={() => {
                                    setFocused('section_time')
                                }}
                                onBlur={() => {
                                    setBlurred('section_time')
                                }}
                                disabled={isDisabled('section_time')}
                                readOnly={!isFocused('section_time')}
                            />
                            <span
                                className={"unit" + (isDisabled('section_time') ? " inactive" : "")}>min</span>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const stt2prp = (state) => {
    return {
        section: state.section,
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
        setSectionType: (value) => dispatch({type: actionTypes.CHANGE_SECTION_TYPE, value}),
        setSectionTime: (value) => dispatch({type: actionTypes.CHANGE_SECTION_TIME, value}),
        setSectionDistance: (value) => dispatch({type: actionTypes.CHANGE_SECTION_DISTANCE, value}),

        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),

        addNotification: (notification, id=null) => dispatch({type: actionTypes.ADD_NOTIFICATION, notification, id}),
        removeNotification: (id) => dispatch({type: actionTypes.REMOVE_NOTIFICATION, id}),
        setNotification: (id, element, value) => dispatch({type: actionTypes.SET_NOTIFICATION, element, value, id}),

    }
}

export default connect(stt2prp, dispatch2prp)(Index)