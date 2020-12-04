import React, {Component} from "react";
import {connect} from "react-redux";
import Aux from "../../components/_Aux";
import ClickOutHandler from "react-onclickout"
import logo from "../../../assets/images/Plogo.svg"
import * as actionTypes from "../../../dataHandler/actions";
import {REFRESH_DATA} from "../../../dataHandler/actions";

class NavBar extends Component {

    state = {
        open_search: false
    }

    render() {

        let account = this.props.account || null;
        this.full_name = (account ? (account.first_name + ' ' + account.last_name) : '-');

        let nav_barClass = ['nav-bar'];


        return (
            <Aux>
                <header className={nav_barClass.join(" ")}>

                    <div className={'nav-bar-logo'}>
                        <img src={logo} alt={'panto-health logo'}/>
                    </div>

                    <div className={'nav-bar-items'}>

                        <ClickOutHandler
                            onClickOut={() => {
                                this.setState({
                                    open_search: false
                                })
                            }}
                            >
                            <div className={'nav-bar-search' + (this.state.open_search ? ' active' : '')} onClick={() => {
                                this.setState({
                                    open_search: true
                                })
                            }}>
                                <i className={'panto-icon ph-search'}/>
                                <input type={'text'} placeholder={'Search here for reports, analytics and help'}/>
                            </div>
                        </ClickOutHandler>


                        <ul className={'nav-bar-nav'}>
                            <li className={'nav-bar-nav-item'} onClick={()=>{this.props.refreshData()}}>
                                <i className={'nav-bar-nav-icon panto-icon ph-refresh'}/>
                            </li>
                            <li className={'nav-bar-nav-item has-badge'}>
                                <i className={'nav-bar-nav-icon panto-icon ph-notifications'}/>
                            </li>
                        </ul>


                        <div className={'nav-bar-profile'}>
                            <div className={'nav-bar-profile-name'}>
                                {this.full_name}
                            </div>
                            <i className={'panto-icon ph-arrow-down'}/>
                        </div>

                    </div>

                </header>
            </Aux>
        );

    }
}

const stt2prp = state => {
    return {
        account: state.account,

    }
};

const dispatch2prp = (dispatch) => {
    return {
        refreshData: (value) => dispatch({type: REFRESH_DATA})
    }
}

export default connect(stt2prp, dispatch2prp)(NavBar)

