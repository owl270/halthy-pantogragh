import React from 'react';
import PantoInput from "../../../components/PantoInput";
import YellowHeight from "../ParameterFilteringCard/icons/YellowHeight";
import {isFocused} from "../../Settings/DataHandler";
import * as actionTypes from "../../Settings/DataHandler/_actions";
import {connect} from "react-redux";
import * as actions from "../_DataHandler/_actions";
class ParamRangeSlider extends React.Component {




    render() {


        const {
            height,
            setHeightUpRed,
            setHeightUpWhite,
            setHeightUpYellow,

            setHeightDownRed,
            setHeightDownWhite,
            setHeightDownYellow,

        } = this.props

        return (

            <div className="filtering-group-second">

                <label className="filtering-label">
                    Height
                </label>
                <div className="filtering-content">
                    <div className="panto-range-slider">
                        <label>Down limite</label>

                        <div className="parametr-label">
                            <div className="input-content">
                                <i className={' panto-icon  ph-white-height'}/>
                                <div className="range-inputs">
                                    <PantoInput
                                        style={{color:'#9FA2A9'}}
                                        value={height.whiteDown}
                                        onChange={setHeightDownWhite}
                                    />
                                    <span >cm</span>
                                </div>
                            </div>

                            <div className="input-content">

                                <i className={' panto-icon  ph-yellow-height'}/>

                                <div className="range-inputs">
                                    <PantoInput
                                        style={{color:'#A17D48'}}
                                        value={height.yellowDown}
                                        onChange={setHeightDownYellow}
                                    />
                                    <span >cm</span>
                                </div>
                            </div>

                            <div className="input-content">

                                <i className={' panto-icon  ph-red-height'}/>
                                <div className="range-inputs">
                                    <PantoInput
                                        style={{color:'#A25154'}}
                                        value={height.redDown}
                                        onChange={setHeightDownRed}
                                    />
                                    <span >cm</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="vl"></div>


                    <div className="panto-range-slider">
                        <label>Up limite</label>

                        <div className="parametr-label">

                            <div className="input-content">

                                <i className={'icon panto-icon ph-white-height'}/>

                                <div className="range-inputs">
                                    <PantoInput
                                        style={{color:'#9FA2A9'}}
                                        value={height.whiteUp}
                                        onChange={setHeightUpWhite}
                                    />
                                    <span >cm</span>
                                </div>

                            </div>

                            <div className="input-content">

                                <i className={'icon panto-icon  ph-yellow-height'}/>

                                <div className="range-inputs">
                                    <PantoInput
                                        style={{color:'#A17D48'}}
                                        value={height.yellowUp}
                                        onChange={setHeightUpYellow}
                                    />
                                    <span >cm</span>
                                </div>

                            </div>

                            <div className="input-content">

                                <i className={'icon panto-icon  ph-red-height'}/>

                                <div className="range-inputs">
                                    <PantoInput
                                        style={{color:'#A25154'}}
                                        value={height.redUp}
                                        onChange={setHeightUpRed}
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
        height: state.height,

    }
}

const dispatch2prp = (dispatch) => {
    return {

        setHeightUpRed: (value) =>actions.setHeightUpRed(dispatch,'height', value),
        setHeightUpWhite: (value) => actions.setHeightUpWhite(dispatch,'height', value),
        setHeightUpYellow: (value)=> actions.setHeightUpYellow(dispatch,'height', value),

        setHeightDownRed: (value) =>  actions.setHeightDownRed(dispatch,'height', value),
        setHeightDownWhite: (value) =>actions.setHeightDownWhite(dispatch,'height', value),
        setHeightDownYellow: (value) => actions.setHeightDownYellow(dispatch,'height', value),



    }
}

export default connect(stt2prp, dispatch2prp)(ParamRangeSlider)
