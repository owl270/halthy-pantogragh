import * as React from "react";
import {connect} from "react-redux";
import Aux from "../../../components/_Aux";

import {SET} from "./_actions";




class Validator extends React.Component {





    componentDidUpdate(prevProps, prevState, snapshot) {

        // if(prevProps.duration!==this.props.duration) {
        //     this.props.setDuration(this.props.duration)
        // }
        //
        // if(prevProps.show_number!==this.props.show_number) {
        //     this.props.setShowNumber(this.props.show_number)
        // }
    }


    render() {

        return null

    }
}


const stt2prp = (state) => {
    return {

    }
}

const dispatch2prp = (dispatch) => {
    return {
        setDuration: (value) => dispatch({type: SET, state: 'duration', value}),
        setShowNumber: (value) => dispatch({type: SET, state: 'show', value}),
    }
}

export default connect(stt2prp, dispatch2prp)(Validator)