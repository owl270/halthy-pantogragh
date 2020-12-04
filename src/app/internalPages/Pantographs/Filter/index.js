import React from "react";
import PantoCard from "../../../components/PantoCard";
import PantoSelectList from "../../../components/PantoSelectList";


import IdentityFilter from "./__Identity";
import SectionFilter from "./__Section";
import ParametersFilter from "./__Parameters";


import {connect} from "react-redux";
import * as actionTypes from "../DataHandler/_actions";
import {isDisabled, isFocused} from "../DataHandler";



class Index extends React.Component {





    render() {


        const {
            setLocation,

            isDisabled,
            isFocused,
            setFocused,
            setBlurred,

            location_list,
            location

        } = this.props






        return (
            <PantoCard
                loading={this.props.loading}
                loading_label={this.props.loading_label}
            >
                <header>
                    <h6>Filter</h6>
                    <div className="align-right">

                        <div className="filter-input-focus-location">
                            <PantoSelectList
                                open={isFocused('location_list')}
                                onOpen={() => {setFocused('location_list')}}
                                onClose={() => {setBlurred('location_list')}}
                                disabled={isDisabled('location_list')}
                                onChange={setLocation}
                                items={location_list}
                                value={location}
                                placeholder="location"
                                live_search={true}
                            />
                        </div>
                    </div>
                </header>


                <div className="filtering-container">
                    <div className="filtering-parameters-container">

                    <IdentityFilter/>
                    <SectionFilter/>

                    <ParametersFilter/>
                    <ParametersFilter/>
                    </div>
                </div>

            </PantoCard>
        )
    }


}

const stt2prp = (state) => {
    return {
        loading: state.loading,
        loading_label: state.loading_label,

        location_list: state.location_list,
        location: state.location,

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
        setLocation: (value) => dispatch({type: actionTypes.CHANGE_LOCATION, value}),
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)