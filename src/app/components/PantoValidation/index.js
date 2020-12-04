import React from "react";
import {Notification, PantoNotification} from "../PantoNotify";
import {functions} from "./fields"
import update from "react-addons-update";


export const PantoValidation = ({children}) => {
    return <>
        <PantoNotification>
            {children}
        </PantoNotification>
    </>
}


export class Validation extends React.Component {

    state = {
        has_notify: false,
        emphasize: false
    }

    check = () => {
        const {
            value,
            valid,
            error
        } = this.props


        if (typeof functions[valid[0]] === "function") {
            if (!functions[valid[0]](value, valid[1])) {
                this.setState({has_notify: true})
                if (error) {
                    this.props.hasError(true)
                    return null
                }
            }
        }
        this.setState({has_notify: false})
        this.props.hasError(false)
        return null
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.check()
        }
        else if(prevProps.checkValid!==this.props.checkValid) {
            this.check()
        }
    }


    render() {

        if (this.state.has_notify) {

            const {
                name,
                error,
                warning
            } = this.props

            let children = error, type = 'error', duration = 4000, no_dismiss = true
            if (warning) {
                children = warning
                type = 'warning'
                no_dismiss = false
            }

            return <>
                <Notification
                    id={name}
                    emphasize={this.state.emphasize}
                    no_dismiss={no_dismiss}
                    duration={duration}
                    type={type}
                    children={children}
                />
            </>
        }
        return null

    }


}


export class RenderValidation extends React.Component {

    state = {
        errors: []
    }

    setValid = (name, err) => {
        if (err && !this.state.errors.includes(name)) {
            this.setState({errors: update(this.state.errors, {$push: [name]})})
        }
        else if (!err && this.state.errors.includes(name)) {
            const ind = this.state.errors.indexOf(name)
            this.setState({errors: update(this.state.errors, {$splice: [[ind, 1]]})})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.errors!==prevState.errors) {
            if(this.state.errors.length > 0) this.props.setValid(false)
            else this.props.setValid(true)
        }
    }






    render() {

        const $validation = this.props.rules.map((v, i) => {
            return <>
                <Validation
                    {...v}
                    value={this.props.data[v.name]}
                    hasError={(e) => {
                        this.setValid(v.name, e)
                    }}
                    checkValid={this.props.checkValid}
                />
            </>
        })

        return <>
            <PantoValidation>
                {$validation}
            </PantoValidation>
        </>

    }

}







