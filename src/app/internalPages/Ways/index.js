import React from "react";


import {connect, Provider} from "react-redux";
import {createStore} from "redux";
import DataHandler from "./_DataHandler";


import "./style.scss"
import Main from "./Main";


const $DataHandler = createStore(
    DataHandler
);


class Index extends React.Component {


    render() {
        return <Provider store={$DataHandler}>
            <Main refresh={this.props.refresh_data}/>
        </Provider>
    }


}


const stt2prp = state => {
    return {
        refresh_data: state.refresh_data,
    }
};



export default connect(stt2prp)(Index)
