import React from "react";
import PantoSwitchButton from "../../../../components/PantoSwitchButton";

import * as actionTypes from "../../DataHandler/_actions";
import {connect} from "react-redux";
import CustomizeTimeModal from "../CustomizeTimeModal"
import {isDisabled, isFocused} from "../../DataHandler";

class Index extends React.Component {


    render() {

        const {
            toggleMapRailWayActive,
            toggleMapCityBorderActive,
            toggleMapCityNameActive,

            timing,
            setTiming,


            isFocused,
            isDisabled,

            setFocused,
            setBlurred

        } = this.props

        return (

            <div className="footer">
                <CustomizeTimeModal/>
                <hr/>


                <div className="footer-content">

                    <div className="footer-tools time-filter">

                        <ul style={{
                            "--caret-width": (timing === 'custom' ? "124px" : "49px"),
                            "--caret-left": (
                                timing === 'custom' ? "1px"
                                    : timing === '1D' ? "126px"
                                    : timing === '1W' ? "176px"
                                        : timing === '1M' ? "227px" : ""
                            )
                        }}>
                            <li
                                onClick={() => {
                                    if(isDisabled('timing')) return
                                    setTiming('1M')
                                }}
                                className={timing === '1M' ? "active" : ""}
                            >1M
                            </li>
                            <li
                                onClick={() => {
                                    if(isDisabled('timing')) return
                                    setTiming('1W')
                                }}
                                className={timing === '1W' ? "active" : ""}
                            >1W
                            </li>
                            <li
                                onClick={() => {
                                    if(isDisabled('timing')) return
                                    setTiming('1D')
                                }}
                                className={timing === '1D' ? "active" : ""}
                            >1D
                            </li>
                            <li
                                onClick={() => {
                                    if(isDisabled('timing')) return
                                    setFocused('customize_time_modal')
                                }}
                                className={timing === 'custom' ? "active" : ""}
                            >Customize time
                            </li>
                        </ul>

                    </div>


                    <div className="footer-tools">

                        <PantoSwitchButton
                            value={this.props.map_railway_active}
                            onChange={toggleMapRailWayActive}
                            label={<label>railways</label>}
                            disabled={isDisabled('railway')}
                        />

                    </div>

                    <div className="footer-tools">

                        <PantoSwitchButton
                            value={this.props.map_city_border_active}
                            onChange={toggleMapCityBorderActive}
                            label={<label>City border</label>}
                            disabled={isDisabled('city_border')}
                        />

                    </div>

                    <div className="footer-tools">

                        <PantoSwitchButton
                            value={this.props.map_city_name_active}
                            onChange={toggleMapCityNameActive}
                            label={<label>City name</label>}
                            disabled={isDisabled('city_name')}
                        />

                    </div>

                </div>
            </div>
        )
    }


}

const stt2prp = (state) => {
    return {
        map_railway_active: state.map_railway_active,
        map_city_border_active: state.map_city_border_active,
        map_city_name_active: state.map_city_name_active,

        timing: state.timing,

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
        toggleMapRailWayActive: (value) => dispatch({type: actionTypes.TOGGLE_MAP_RAILWAY, value}),
        toggleMapCityBorderActive: (value) => dispatch({type: actionTypes.TOGGLE_MAP_CITY_BORDER, value}),
        toggleMapCityNameActive: (value) => dispatch({type: actionTypes.TOGGLE_MAP_CITY_NAME, value}),

        setTiming: (value) => dispatch({type: actionTypes.CHANGE_TIMING, value}),

        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),

    }
}

export default connect(stt2prp, dispatch2prp)(Index)