import React from 'react';

import './style.scss';

import Aux from "../../components/_Aux";
import config from '../../../config';
import Api from "../../../api";
import {Redirect} from "react-router-dom";

import logo from "../../../assets/images/Plogo.svg";

import SignUpModal from "./SignUpModal";
import PantoInput from "../../components/PantoInput";
import PantoButton from "../../components/PantoButton";
import {validation} from "../../components/Validations";
import * as actionTypes from "../../../dataHandler/actions";
import {connect} from "react-redux";
import Loader from "../../components/PantoLoader";


class Login extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            redirect_to: null,
            is_login: false,
            sign_up_modal_visible: false,
            alert_message: '',
            show_password: false,

            email: '',
            password: ''
        }

    }


    validate = {
        email: [
            ['email', true]
        ]
    }


    field_validation = (field) => {
        let okay = true
        let valid = null
        for (let i = 0; i < this.validate[field].length; i++) {
            valid = this.validate[field][i]
            console.log(field, this.state[field], !validation[valid[0]](valid[1], this.state[field]))
            if (!validation[valid[0]](valid[1], this.state[field])) {
                okay = false
            }
        }
        return okay
    }

    componentDidMount() {
        Api.getMe().then(
            (response) => {
                if (response && response.result && response.result.account) {
                    this.props.onAccountChange(response.result.account)
                    this.props.onPanelLoad(false)
                    this.setState({
                        redirect_to: config.defaultPath
                    })
                } else {
                    this.props.onAccountChange(null)
                    this.props.onPanelLoad(true)
                    document.title = 'Login | ' + config.defaultTitle
                }
            });
    }


    handleChange = (value, name) => {
        this.setState({
            [name]: value
        })
    }


    $login = async (response) => {
        this.setState({is_login: false})
        let {ok, token, description} = response;
        if (ok) {
            await localStorage.setItem('auth_key', token);
            this.props.onPanelLoad(false)

            let final_route = config.basename + config.defaultPath
            const urlParams = new URLSearchParams(this.props.location.search);
            const myParam = urlParams.get('r');
            if(myParam) final_route = myParam
            window.location.href = final_route;
        }
        else {
            this.setState({
                alert_message: description
            })
        }
    }


    handleSubmit = () => {
        let okay = true
        for (const field in this.validate) {
            if (!this.field_validation(field)) okay = false
        }
        if (okay) {
            const login_fields = {
                email: this.state.email,
                password: this.state.password
            }
            this.setState({is_login: true, alert_message: ''})
            Api.login(login_fields).then(this.$login)
        } else {
            this.setState({
                doValidate: true
            })
        }

    }

    render() {


        return (
            <Aux>

                <div className="login-page-container">
                    {this.state.redirect_to ? <Redirect to={this.state.redirect_to}/> : null}

                    {!this.props.panelLoad ? <Loader/> :
                        <Aux>


                            <div className='login-container-bg'>


                                <div className='login'>

                                    <div className={'logo'}>
                                        <img src={logo} alt={'panto-health logo'}/>
                                    </div>

                                    <div className="form-group login-form">

                                        <PantoInput
                                            type="email"
                                            placeholder="Email address"
                                            autoCorrect="off"
                                            autoCapitalize="off"
                                            spellCheck="false"
                                            value={this.state.email}
                                            name={'email'}
                                            disabled={this.state.is_login}
                                            onChange={this.handleChange}
                                            roles={this.validate.email}
                                            doValidate={this.state.doValidate}
                                        />

                                        <PantoInput
                                            type={this.state.show_password ? "text" : "password"}
                                            placeholder="Password"
                                            value={this.state.password}
                                            name={'password'}
                                            disabled={this.state.is_login}
                                            onChange={this.handleChange}
                                            roles={this.validate.password}
                                            doValidate={this.state.doValidate}
                                            rightIcon={<i
                                                onClick={() => {
                                                    this.setState({
                                                        show_password: !this.state.show_password
                                                    })
                                                }}
                                                className={"panto-icon ph-show-icon" + (this.state.show_password ? ' visible' : '')}
                                            />}
                                        />

                                        <PantoButton
                                            onClick={this.handleSubmit}
                                            disabled={this.state.is_login}
                                            loading={this.state.is_login}
                                            className={'outline'}
                                        >Log in</PantoButton>

                                        {!this.state.alert_message ? '' :
                                            <div className="alert-message">
                                                <span>{this.state.alert_message}</span>
                                            </div>
                                        }

                                        <a href="#">Forgot password?</a>

                                    </div>

                                    <PantoButton
                                        onClick={() => {
                                            this.setState({sign_up_modal_visible: true})
                                        }}
                                        disabled={this.state.is_login}
                                    >Register</PantoButton>


                                    <p className="panel-description">
                                        Catana (Catenary Analysis) is our simulation
                                        software which simulates the interaction of
                                        pantograph and catenary. This software has a
                                        unique feature to simulate the effect of tension
                                        loss or broke dropper in the interaction of
                                        pantograph and catenary. Regarding these
                                        features, our product can report all defects in the
                                        overhead catenary system.
                                    </p>

                                </div>


                            </div>
                            <SignUpModal
                                visible={this.state.sign_up_modal_visible}
                                dismiss={() => {
                                    this.setState({sign_up_modal_visible: false})
                                }}
                            />


                        </Aux>
                    }
                </div>

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.account,
        panelLoad: state.panelLoad
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAccountChange: (account) => dispatch({type: actionTypes.ACCOUNT, account: account}),
        onPanelLoad: (panelLoad) => dispatch({type: actionTypes.PANEL_LOADED, panelLoad: panelLoad}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)