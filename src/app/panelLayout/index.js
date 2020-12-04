import React, {Component, Suspense} from 'react';
import './app.scss';

import {
    Redirect,
    Switch,
    Route,
    useLocation,
    useHistory

} from "react-router-dom";


import {connect} from 'react-redux';
import windowSize from 'react-window-size';
import _internalPages from "../../_internalPages";
import Aux from "../components/_Aux";


import Api from "../../api";
import NavBar from "./NavBar";
import Navigation from "./Navigation";
import Loader from '../components/PantoLoader'
import Breadcrumb from "./Breadcrumb";


import PantoTooltip from "../components/PantoTooltip";


import config from "../../config"
import * as actionTypes from "../../dataHandler/actions";
import {Scrollbars} from "react-custom-scrollbars";

import Supervision from "../internalPages/Supervision"
import moment from "moment";

import Server from "../../api/server";



function RouterSwitch() {

    let location = useLocation();
    let history = useHistory();

    const internal_pages = _internalPages.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )}/>
        ) : null;
    });


    let background = location.state && location.state.background;

    return (
        <Aux>

            <Switch location={background || location}>
                {internal_pages}
                <Route
                    path="/supervision/:train/:device/:start/:end"
                    children={(props) => {
                        if (props.match && props.match.params && props.match.params) {
                            const {train, device, start, end} = props.match.params
                            if (train && device && start && end) {
                                return <Supervision
                                    train_id={train}
                                    device_id={device}
                                    duration={[moment.unix(start), moment.unix(end)]}
                                    unmount={() => {
                                        history.push(config.defaultPath)
                                    }}
                                />
                            }
                        }
                        return null
                    }}/>



                <Redirect from="/" to={config.defaultPath}/>
            </Switch>

            {
                background &&
                <Route
                    path="/supervision/:train/:device/:start/:end"
                    children={(props) => {
                        if (props.match && props.match.params && props.match.params) {
                            const {train, device, start, end} = props.match.params
                            if (train && device && start && end) {
                                return <Supervision
                                    train_id={train}
                                    device_id={device}
                                    duration={[moment.unix(start), moment.unix(end)]}
                                    unmount={() => {
                                        history.goBack()
                                    }}
                                />
                            }
                        }
                        return null
                    }}/>
            }

        </Aux>
    );
}


class PanelLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect_to: null
        }

        this.props.onPanelLoad(false)






        Api.getMe().then((response) => {
            if (response.ok && response.result && response.result.account) {
                this.props.setAccount(response.result.account)
                this.props.onPanelLoad(true)
            } else {
                if (response.status === 401) {
                    this.props.setAccount(null)
                    this.props.onPanelLoad(false)
                    this.props.redirectTo(config.authPath + `?r=${this.props.location.pathname}`)
                }
            }
        });


    }


    renderThumbVertical({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    renderTrackVertical({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    renderThumbHorizontal({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    renderTrackHorizontal({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderView({style, ...props}) {
        const thumbStyle = {
            marginRight: "-30px",
            marginBottom: "-30px",
            paddingRight: "15px",
            paddingBottom: "5px",
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    render() {

        return (
            <Aux>


                {this.props.redirect ? <Redirect to={this.props.redirect} push/> : null}


                {!this.props.panelLoad ? <Loader/>
                    :
                    <Aux>


                        <div className="dashboard-main">

                            <NavBar/>
                            <Navigation/>
                            <Breadcrumb/>


                            <Server/>


                            <div
                                id={"main-container"}
                                className={"main-container hide-scrollbar"}>

                                <Scrollbars
                                    ref="scrollbars"
                                    renderThumbVertical={this.renderThumbVertical}
                                    renderTrackVertical={this.renderTrackVertical}
                                    renderThumbHorizontal={this.renderThumbHorizontal}
                                    renderTrackHorizontal={this.renderTrackHorizontal}
                                    renderView={this.renderView}
                                >
                                    <div className="main-content">
                                        <Suspense fallback={<Loader utils="panelLayout"/>}>
                                            <RouterSwitch/>
                                        </Suspense>
                                    </div>
                                </Scrollbars>


                            </div>

                        </div>
                    </Aux>
                }
            </Aux>
        );


    }
}


const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        account: state.account,
        panelLoad: state.panelLoad,
        redirect: state.redirect,
        stretch_mode: state.stretch_mode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAccount: (account) => dispatch({type: actionTypes.ACCOUNT, account: account}),
        onPanelLoad: (panelLoad) => dispatch({type: actionTypes.PANEL_LOADED, panelLoad: panelLoad}),
        redirectTo: (val) => dispatch({type: actionTypes.REDIRECT, redirect: val}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(windowSize(PanelLayout))