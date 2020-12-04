import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";


import "./style.scss"
import DataHandler from "./_DataHandler";
import config from "../../../../config";


import Main from "./Main";
import PantoTooltip from "../../../components/_PantoTooltip";
const querystring = require('querystring')


const $DataHandler = createStore(
    DataHandler
)


class Index extends React.Component {


    render() {

        return <>
            <Provider store={$DataHandler}>

                <Main
                    token={this.props.match.params.token}
                    data={querystring.parse(this.props.location.search.toString().substring(1))}
                />
            </Provider>
        </>

    }

}

export default Index;