import * as React from "react";
import {connect, Provider} from "react-redux";

import * as actionTypes from "./_actions";
import {Notification, PantoNotification} from "../../../components/PantoNotify";
import Aux from "../../../components/_Aux";


class Validator extends React.Component {


    render() {

        const {notifications, notifications_keys} = this.props
        const $notify = notifications.map((value, index) => {
            return <Notification
                {...value}
                key={index}
                on_dismiss={async () => {
                    if (value && typeof value.on_dismiss === "function") await value.on_dismiss()
                    this.props.removeNotification(notifications_keys[index]);
                }}
            />
        })


        return <Aux>
            <PantoNotification>
                {$notify}
            </PantoNotification>
        </Aux>

    }
}


const stt2prp = (state) => {
    return {
        train_id: state.train_id,
        device_id: state.device_id,
        signal_detail: state.signal_detail,


        server_response: state.server_response,
        section: state.section,
        allow_send: state.allow_send,
        train_list_open: state.train_list_open,
        device_list_open: state.device_list_open,
        date_time_picker_open: state.date_time_picker_open,
        parameters_open: state.parameters_open,

        filtering_situation: state.filtering_situation,
        download_queue: state.download_queue,
        in_queue: state.in_queue,
        more_detail: state.more_detail,
        signal_list: state.signal_list,

        notifications: state.notifications,
        notifications_keys: state.notifications_keys
    }
}

const dispatch2prp = (dispatch) => {
    return {
        set: (state, value) => dispatch({type: actionTypes.SET, state, value}),
        addNotification: (notification, id = null) => dispatch({type: actionTypes.ADD_NOTIFICATION, notification, id}),
        removeNotification: (id) => dispatch({type: actionTypes.REMOVE_NOTIFICATION, id}),
        setNotification: (id, element, value) => dispatch({type: actionTypes.SET_NOTIFICATION, element, value, id}),
    }
}

export default connect(stt2prp, dispatch2prp)(Validator)