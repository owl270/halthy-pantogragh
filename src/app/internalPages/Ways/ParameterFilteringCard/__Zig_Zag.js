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
            zig_zag,
            setZigZagRightRed,
            setZigZagRightWhite,
            setZigZagRightYellow,

            setZigZagLeftRed,
            setZigZagLeftWhite,
            setZigZagLeftYellow,

        } = this.props

        return (

            <div className="filtering-group-second">

                <label className="filtering-label">Zig-Zag</label>
                <div className="filtering-content">
                    <div className="panto-range-slider">
                        <label>Right limite</label>

                        <div className="parametr-label">
                        <div className="input-content">

                            <i className={'icon panto-icon  ph-white-zig-zog'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#9FA2A9'}}
                                    value={zig_zag.whiteRight}
                                    onChange={setZigZagRightWhite}
                                />
                                <span >cm</span>
                            </div>
                        </div>

                        <div className="input-content">

                            <i className={'icon panto-icon  ph-yellow-zig-zog'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A17D48'}}
                                    value={zig_zag.yellowRight}
                                    onChange={setZigZagRightYellow}
                                />
                                <span >cm</span>
                            </div>
                        </div>

                        <div className="input-content">

                            <i className={'icon panto-icon  ph-red-zig-zog'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A25154'}}
                                    value={zig_zag.redRight}
                                    onChange={setZigZagRightRed}
                                />
                                <span >cm</span>
                            </div>

                        </div>
                    </div>
                    </div>

                        <div className="vl"></div>


                    <div className="panto-range-slider">
                        <label>Left limite</label>

                        <div className="parametr-label">

                        <div className="input-content">

                            <i className={'icon panto-icon ph-white-zig-zog'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#9FA2A9'}}
                                    value={zig_zag.whiteLeft}
                                    onChange={setZigZagLeftWhite}
                                />
                                <span >cm</span>
                            </div>

                        </div>

                        <div className="input-content">

                            <i className={'icon panto-icon  ph-yellow-zig-zog'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A17D48'}}
                                    value={zig_zag.yellowLeft}
                                    onChange={setZigZagLeftYellow}/>
                                <span >cm</span>
                            </div>

                        </div>

                        <div className="input-content">

                            <i className={'icon panto-icon  ph-red-zig-zog'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A25154'}}
                                    value={zig_zag.redLeft}
                                    onChange={setZigZagLeftRed}
                                />
                                <span >cm</span>
                            </div>

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
        zig_zag: state.zig_zag,

    }
}

const dispatch2prp = (dispatch) => {
    return {

        setZigZagRightRed: (value) => dispatch({type: actionTypes.CHANGE_RIGHT_RED, value}),
        setZigZagRightWhite: (value) => dispatch({type: actionTypes.CHANGE_RIGHT_WHITE, value}),
        setZigZagRightYellow: (value)=> dispatch({type: actionTypes.CHANGE_RIGHT_YELLOW, value}),

        setZigZagLeftRed: (value) => dispatch({type: actionTypes.CHANGE_LEFT_RED, value}),
        setZigZagLeftWhite: (value) => dispatch({type: actionTypes.CHANGE_LEFT_WHITE, value}),
        setZigZagLeftYellow: (value) => dispatch({type: actionTypes.CHANGE_LEFT_YELLOW, value}),



    }
}

export default connect(stt2prp, dispatch2prp)(ParamRangeSlider)
