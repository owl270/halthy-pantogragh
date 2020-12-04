import React from "react";

import {PantoModals, Modal} from "../../../../components/PantoModal"
import PantoCalendar from "../../../../components/PantoCalendar"
import PantoButton from "../../../../components/PantoButton"


import DeviceTripsTable from "./DeviceTripsTable"
import DeviceTripsSelector from "./DeviceTripsSelector"

import {connect} from "react-redux";

import * as actionTypes from "../../DataHandler/_actions";
import {isDisabled, isFocused} from "../../DataHandler";
import Aux from "../../../../components/_Aux";


class Index extends React.Component {

    state = {
        start_duration: null,
        end_duration: null,
    }


    renderThumb({style, ...props}) {
        const thumbStyle = {
            backgroundColor: 'rgba(255,255,255,0.16)',
            width: '4px',
            padding: 0,
            borderRadius: '5px'
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackVertical({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "4px",
            right: "2px",
            bottom: "2px",
            top: "0",
            borderRadius: "5px",
            backgroundColor: "transparent"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderView({style, ...props}) {
        const thumbStyle = {
            "margin-right": "-30px",
            "margin-bottom": "-30px",
            "padding-right": "13px",
            "padding-bottom": "13px",
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.duration !== this.props.duration) {
            this.setState({
                start_duration: this.props.duration[0],
                end_duration: this.props.duration[1]
            })
        }
    }

    okay = () => {
        this.props.setBlurred('customize_time_modal')
        this.props.setDuration([this.state.start_duration, this.state.end_duration])
        this.props.setTiming(null)
    }

    cancel = () => {
        this.props.setBlurred('customize_time_modal')
    }

    render() {

        const {
            isFocused,
            device_trips,
            calendar_range,
            setCalendarRange
        } = this.props

        const $footer_modal = <Aux>
            <PantoButton className={'outline'} onClick={this.cancel}>Cancel</PantoButton>
            <PantoButton onClick={this.okay}>Ok</PantoButton>
        </Aux>

        return (

            <PantoModals>

                <Modal
                    name={'customize-time'}
                    header={''}
                    footer={$footer_modal}
                    visible={isFocused('customize_time_modal')}
                    dismiss={this.cancel}
                >

                    <div className="panto-row">
                        <div className="panto-col">

                            <PantoCalendar
                                calendar_range={calendar_range}
                                setCalendarRange={setCalendarRange}
                            />

                        </div>

                        <div className="panto-col hide-scrollbar" style={{width: "300px"}}>

                            <DeviceTripsTable
                                device_trips={device_trips}
                            />

                        </div>

                    </div>

                    <div className="panto-row">

                        <div className="device-trips-selector">

                            <DeviceTripsSelector
                                start_duration={this.state.start_duration}
                                end_duration={this.state.end_duration}
                                setStartDuration={(v) => {
                                    this.setState({
                                        start_duration: v
                                    })
                                }}
                                setEndDuration={(v) => {
                                    this.setState({
                                        end_duration: v
                                    })
                                }}
                                device_trips={device_trips}
                                calendar_range={calendar_range}
                            />

                        </div>

                    </div>


                </Modal>

            </PantoModals>

        )


    }

}

const stt2prp = (state) => {
    return {
        calendar_range: state.calendar_range,
        duration: state.duration,
        device_trips: state.device_trips,

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
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),

        setTiming: (value) => dispatch({type: actionTypes.CHANGE_TIMING, value}),
        setCalendarRange: (value) => dispatch({type: actionTypes.CHANGE_CALENDAR_RANGE, value}),
        setDuration: (value) => dispatch({type: actionTypes.CHANGE_DURATION, value}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)

