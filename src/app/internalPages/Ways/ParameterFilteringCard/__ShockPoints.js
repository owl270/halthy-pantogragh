import React from 'react';
import PantoInput from "../../../components/PantoInput";
import {isFocused} from "../../Settings/DataHandler";
import * as actionTypes from "../../Settings/DataHandler/_actions";
import {connect} from "react-redux";

class ParamRangeSlider extends React.Component {


    state = {
        mouse_down: false,
        selected_caret: null,
        first_caret: 0,
        last_caret: 0.1
    }


    render() {


        const {
            point,
            setPointRed,
            setPointWhite,
            setPointYellow,

        } = this.props


        return (

            <div className="filtering-group">

                <label className="filtering-label">
                    Shock Point
                </label>
                <div className="filtering-content">



                    <div className="panto-range-slider">

                        <div className="input-content">
                            <i className={' panto-icon  ph-red-shock'}/>
                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A25154'}}
                                    value={point.red}
                                    onChange={setPointRed}
                                />
                                <span >cm</span>
                            </div>
                        </div>

                        <div className="input-content">

                            <i className={' panto-icon  ph-yellow-shock-bg'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A17D48'}}
                                    value={point.yellow}
                                    onChange={setPointYellow}
                                />
                                <span >cm</span>
                            </div>
                        </div>

                        <div className="input-content">

                            <i className={' panto-icon  ph-white-shock-bg'}/>
                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#9FA2A9'}}
                                    value={point.white}
                                    onChange={setPointWhite}
                                />
                                <span >cm</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

const stt2prp = (state) => {
    return {
        point: state.point,

    }
}

const dispatch2prp = (dispatch) => {
    return {
        setPointRed: (value) => dispatch({type: actionTypes.CHANGE_POINT_RED, value}),
        setPointWhite :(value) =>dispatch({type:actionTypes.CHANGE_POINT_WHITE, value}),
        setPointYellow:(value)=>dispatch({type:actionTypes.CHANGE_POINT_YELLOW, value}),


    }
}

export default connect(stt2prp, dispatch2prp)(ParamRangeSlider)
