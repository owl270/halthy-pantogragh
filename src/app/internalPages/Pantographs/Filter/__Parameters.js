import React from "react";

import {Scrollbars} from "react-custom-scrollbars";
import ClickOutHandler from "react-onclickout";
import PantoCheckButton from "../../../components/PantoCheckButton";


import ParametersFilter from "./parametersFilter";
import FilterProperties from "./parametersFilter/FilterProperties";
import PantoButton from "../../../components/PantoButton";

import {connect} from "react-redux";
import {isDisabled, isFocused} from "../DataHandler";
import * as actionTypes from "../DataHandler/_actions";
import update from "react-addons-update";
import PantoInput from "../../../components/PantoInput";


class Index extends React.Component {


    state = {
        filtering: {
            shock_point: {
                active: false,
                range: "0,180"
            },
            zig_zag: {
                active: false,
                range: "0,180"
            },
            height: {
                active: false,
                range: "0,180"
            }
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.parameters_filtering !== this.props.parameters_filtering) {
            this.setState({
                filtering: this.props.parameters_filtering
            })
        }
    }

    activeFilter = (type) => {
        let active = this.state.filtering[type].active
        this.setState({
            filtering: update(this.state.filtering, {[type]: {active: {$set: !active}}})
        })
    }


    onOpen = () => {
        this.props.setFocused('parameters')
    }

    onClose = () => {
        this.props.setBlurred('parameters')
    }

    onCancel = () => {
        this.setState({
            filtering: this.props.parameters_filtering
        })
        this.onClose()
    }

    onOkay = () => {
        this.props.setParametersFiltering(this.state.filtering)
        this.onClose()
    }

    render() {

        const {
            isFocused,
            isDisabled
        } = this.props

        let $classes = ['parameters-filter']
        if (isFocused('parameters') && !isDisabled('parameters')) $classes.push("open")



        const $pFilters = this.state.filtering


        const filters_keys = Object.keys($pFilters)
        const filters_count = filters_keys.length
        let is_filter = false
        let label_btn = ""


        for (let i = 0; i < filters_count; i++) {
            if ($pFilters[filters_keys[i]].active) {
                is_filter = true
                label_btn += FilterProperties(filters_keys[i]).title + ", "
            }
        }

        if (is_filter) label_btn = label_btn.slice(0, -2)
        else label_btn = "Not Filtered"


        const $param_list = [
            <ParametersFilter key={1} type='shock_point' data={$pFilters.shock_point} activeFilter={this.activeFilter}/>,
            <ParametersFilter key={2} type='zig_zag' data={$pFilters.zig_zag} activeFilter={this.activeFilter}/>,
            <ParametersFilter key={3} type='height' data={$pFilters.height} activeFilter={this.activeFilter}/>
        ]


        return (
            <div className="filtering-group-second">
                <label className="filtering-label">Parameters</label>


                <div className="filtering-content">


                        <div className="parameters-filter-container">


                            <div className="input-content">
                                <i className={' panto-icon  ph-red-shock'}/>
                                <div className="range-inputs">
                                    <PantoInput />
                                    <span >cm</span>
                                </div>
                            </div>

                            <div className="input-content">

                                <i className={' panto-icon  ph-yellow-shock-bg'}/>

                                <div className="range-inputs">
                                    <PantoInput />
                                    <span >cm</span>
                                </div>
                            </div>

                            <div className="input-content">

                                <i className={' panto-icon  ph-white-shock-bg'}/>
                                <div className="range-inputs">
                                    <PantoInput />
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
        parameters_filtering: state.parameters_filtering,
        isDisabled: (item) => {
            return isDisabled(state, item)
        },
        isFocused: (item) => {
            return isFocused(state, item)
        }
    }
}

const dispatch2prp = (dispatch) => {
    return {
        setParametersFiltering: (value) => dispatch({type: actionTypes.CHANGE_PARAMETER_FILTERING, value}),
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item})
    }
}


export default connect(stt2prp, dispatch2prp)(Index)