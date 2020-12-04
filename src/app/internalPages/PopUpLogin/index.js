import React from "react";

import './style.scss';


import {PantoModals, Modal} from "../../components/PantoModal";

import PantoInput from "../../components/PantoInput";

import {validation} from "../../components/Validations"
import Api from "../../../api";
import PantoButton from "../../components/PantoButton";
import Aux from "../../components/_Aux";
import logo from "../../../assets/images/Plogo.svg";
import config from "../../../config";


class LoginModal extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            alert_message: '',
            show_password: false,
            is_login: false,


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

    handleChange = (value, name) => {
        this.setState({
            [name]: value
        })
    }


    $login = async (response) => {
        this.setState({is_login: false})
        let {ok, token, description} = response;
        if(ok) {
            await localStorage.setItem('auth_key', token);
            this.modal_dismiss()
            this.props.onLogin()
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
        }
        else {
            this.setState({
                doValidate: true
            })
        }

    }


    modal_dismiss = () => {
        if (this.state.is_login) return
        this.props.setUnVisible()
        this.setState({
            email: '',
            password: ''
        })
    }

    render() {

        const $header = <Aux>

            <div className="login-popup-header">

                <div className={'login-popup-logo'}>
                    <img src={logo} alt={'panto-health logo'}/>
                </div>

                <b>
                    Login
                </b>

            </div>

        </Aux>;


        return (

            <PantoModals>
                <Modal
                    visible={this.props.visible}
                    name={'login'}
                    // dismiss={this.modal_dismiss}
                    header={$header}
                >

                    <div className="form-group login-form-popup">

                        For continue, you should login again:

                        <PantoInput
                            type="email"
                            placeHolder="Email address"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            value={this.state.email}
                            name={'email'}
                            disabled={this.state.is_login}
                            onChange={this.handleChange}
                            roles={this.validate.email}
                            doValidate={this.state.doValidate}
                        />

                        <PantoInput
                            type={this.state.show_password ? "text" : "password"}
                            placeHolder="Password"
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
                        >Log in</PantoButton>

                        {!this.state.alert_message ? '' :
                            <div className="alert-message">
                                <span>{this.state.alert_message}</span>
                            </div>
                        }


                        <a href={config.authPath}>Register</a>

                    </div>

                </Modal>


            </PantoModals>

        )
    }

}

export default LoginModal