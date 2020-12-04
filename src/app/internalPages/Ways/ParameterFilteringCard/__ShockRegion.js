import React from 'react';
import PantoInput from "../../../components/PantoInput";
import {isFocused} from "../../Settings/DataHandler";
import * as actionTypes from "../../Settings/DataHandler/_actions";
import {connect} from "react-redux";

class ParamRangeSlider extends React.Component {




    render() {

        const {
            region,
            setRegionWhite,
            setRegionRed,
            setRegionYellow,

        } = this.props

        return (

            <div className="filtering-group">

                <label className="filtering-label">
                    Shock Regions
                </label>
                <div className="filtering-content">



                    <div className="panto-range-slider">

                        <div className="input-content">
                            <i className={' panto-icon  ph-red-shock'}/>
                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A25154'}}
                                    value={region.red}
                                    onChange={setRegionRed}
                                />
                                <span >cm</span>
                            </div>
                        </div>

                        <div className="input-content">

                            <i className={' panto-icon  ph-yellow-shock-bg'}/>

                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#A17D48'}}
                                    value={region.yellow}
                                    onChange={setRegionYellow}/>
                                <span >cm</span>
                            </div>
                        </div>

                        <div className="input-content">

                            <i className={' panto-icon  ph-white-shock-bg'}/>
                            <div className="range-inputs">
                                <PantoInput
                                    style={{color:'#9FA2A9'}}
                                    value={region.white}
                                    onChange={setRegionWhite}
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
        region: state.region,

    }
}

const dispatch2prp = (dispatch) => {
    return {
        setRegionRed: (value) => dispatch({type: actionTypes.CHANGE_REGION_RED, value}),
        setRegionWhite :(value) =>dispatch({type:actionTypes.CHANGE_REGION_WHITE, value}),
        setRegionYellow:(value)=>dispatch({type:actionTypes.CHANGE_REGION_YELLOW, value}),



    }
}

export default connect(stt2prp, dispatch2prp)(ParamRangeSlider)
