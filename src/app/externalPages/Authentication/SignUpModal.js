import React from "react";
import {PantoModals, Modal} from "../../components/PantoModal";
import PantoCheckButton from "../../components/PantoCheckButton";
import PantoSelectOption from "../../components/PantoSelectOption";
import CountryCodes from "../../data/ContryCodes";
import PantoInput from "../../components/PantoInput";
import PantoButton from "../../components/PantoButton";
import {validation} from "../../components/Validations"
import Api from "../../../api";

class SignUpModal extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            is_sign_up: false,
            doValidate: false,
            alert_message: '',
            success_modal_visible: false,

            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: '',
            country_code: '+49',
            company: '',
            position: '',
            news_letters: false
        }


    }

    validate = {
        first_name: [
            ['required', true],
            ['min', 3]
        ],
        last_name: [
            ['required', true],
            ['min', 3]
        ],
        email: [
            ['email', true]
        ],
        password: [
            ['password', true]
        ],
        phone_number: [
            ['phone_number', true]
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


    $signUp = (response) => {
        this.setState({is_sign_up: false})

        let {ok, result, error, description, detail} = response;
        if (ok) {
            this.modal_dismiss()
            this.setState({
                alert_message: '',
                success_modal_visible: true
            })
        } else {
            this.setState({
                alert_message: description
            })
        }
    }


    handleSignUp = () => {
        let okay = true
        for (const field in this.validate) {
            if (!this.field_validation(field)) okay = false
        }
        if (okay) {
            const sign_up_fields = {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: [this.state.country_code, this.state.phone_number],
                news_letters: this.state.news_letters,
                company: this.state.company,
                position: this.state.position,
            }
            this.setState({is_sign_up: true, alert_message: ''})
            Api.signUp(sign_up_fields).then(this.$signUp)
        } else {
            this.setState({
                doValidate: true
            })
        }
    }


    modal_dismiss = () => {
        if (this.state.is_sign_up) return
        this.props.dismiss()
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: '',
            country_code: '+49',
            company: '',
            position: '',
            news_letters: false
        })
    }

    render() {

        return (

            <PantoModals>
                <Modal
                    visible={this.props.visible}
                    dismiss={this.modal_dismiss}
                    name={'sign_up'}
                    header={'Sign Up'}
                >

                    <div className="form-group">

                        <div className="input-row">

                            <PantoInput
                                type="text"
                                placeHolder="First name"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                value={this.state.first_name}
                                name={'first_name'}
                                disabled={this.state.is_sign_up}
                                onChange={this.handleChange}
                                roles={this.validate.first_name}
                                doValidate={this.state.doValidate}
                            />

                            <PantoInput
                                type="text"
                                placeHolder="Last name"
                                autocomplete="off"
                                autocorrect="off"
                                autocapitalize="off"
                                spellcheck="false"
                                value={this.state.last_name}
                                name={'last_name'}
                                disabled={this.state.is_sign_up}
                                onChange={this.handleChange}
                                roles={this.validate.last_name}
                                doValidate={this.state.doValidate}
                            />

                        </div>

                        <PantoInput
                            type="email"
                            placeHolder="Email address"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            value={this.state.email}
                            name={'email'}
                            disabled={this.state.is_sign_up}
                            onChange={this.handleChange}
                            roles={this.validate.email}
                            doValidate={this.state.doValidate}
                        />

                        <PantoInput
                            type="password"
                            placeHolder="Password"
                            value={this.state.password}
                            name={'password'}
                            disabled={this.state.is_sign_up}
                            onChange={this.handleChange}
                            roles={this.validate.password}
                            doValidate={this.state.doValidate}
                        />


                        <div className="input-row">

                            <PantoSelectOption
                                style={{flex: 0.15}}
                                items={CountryCodes}
                                value={this.state.country_code}
                                name={'country_code'}
                                disabled={this.state.is_sign_up}
                                onChange={this.handleChange}

                            />

                            <PantoInput
                                type={"tel"}
                                placeHolder={"Mobile phone number"}
                                containerStyle={{flex: 0.825}}
                                value={this.state.phone_number}
                                name={'phone_number'}
                                disabled={this.state.is_sign_up}
                                onChange={this.handleChange}
                                roles={this.validate.phone_number}
                                doValidate={this.state.doValidate}
                            />

                        </div>


                        <PantoInput
                            type={"text"}
                            placeHolder={"Company"}
                            value={this.state.company}
                            name={'company'}
                            disabled={this.state.is_sign_up}
                            onChange={this.handleChange}
                        />

                        <PantoInput
                            type={"text"}
                            placeHolder={"Position"}
                            value={this.state.position}
                            name={'position'}
                            disabled={this.state.is_sign_up}
                            onChange={this.handleChange}
                        />


                        <PantoCheckButton
                            label={'News letters?'}
                            value={this.state.news_letters}
                            name={'news_letters'}
                            disabled={this.state.is_sign_up}
                            onChange={this.handleChange}
                        />


                        <PantoButton
                            onClick={this.handleSignUp}
                            disabled={this.state.is_sign_up}
                            loading={this.state.is_sign_up}
                        >Register</PantoButton>
                        {!this.state.alert_message.length ? '' :
                            <div className="alert-message">
                                <span>{this.state.alert_message}</span>
                            </div>
                        }

                    </div>

                </Modal>


                <Modal
                    visible={this.state.success_modal_visible}
                    dismiss={() => {
                        this.setState({success_modal_visible: false})
                    }}
                    name={'sign_up_successfully'}
                    header={'Sign Up'}
                >

                    <div className={"form-group"}>

                    <span>Your account has been successfully created.<br/>
                        Once your information has been confirmed by the management,<br/>
                        you will be notified by email</span>

                        <PantoButton
                            onClick={() => {
                                this.setState({success_modal_visible: false})
                            }}
                        >Okay</PantoButton>
                    </div>

                </Modal>


            </PantoModals>

        )
    }

}

export default SignUpModal