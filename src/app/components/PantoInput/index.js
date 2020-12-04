import React from "react";
import {validation, texts} from "../Validations";
import './style.scss';
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            has_error: false,
            has_warn: false,
            focused: false,
            value: '',
            error: ''
        }

        this.inputProps = {}
        for(let ii=0;ii<Object.keys(this.props).length;ii++) {
            let key = Object.keys(this.props)[ii]
            if(key!=='value' && key!=='onChange' && key!=='onFocus' && key!=='onBlur' && key!=='containerClass'){
                this.inputProps[key] = this.props[key]
            }
        }
    }





    InputChange = (e) => {
        const value = e.target.value
        let name = e.target.attributes.getNamedItem('name')
        if(name) this.props.onChange(value, name.value)
        else this.props.onChange(value)
    }

    InputFocus = () => {
        this.setState({
            focused: true
        })
        if (typeof this.props.onFocus === "function") this.props.onFocus()
    }

    InputBlur = () => {
        this.setState({
            focused: false
        })
        if (typeof this.props.onBlur === "function") this.props.onBlur()
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.value!==prevProps.value || this.state.focused!==prevState.focused) {
            // if(typeof this.props.validref === "function") {
            //     this.props.validref({
            //         value: () => this.props.value,
            //         isFocused: () => this.state.focused
            //     })
            // }
        }

        if((this.props.roles && this.props.roles.length) && (this.props.value!==prevProps.value || (this.props.doValidate && !prevProps.doValidate)) ){
            let okay = true
            let valid = []
            for(let i=0; i < this.props.roles.length; i++) {
                valid = this.props.roles[i]
                if(!validation[valid[0]](valid[1], this.props.value)) {
                    okay = false
                }
            }
            if(okay) {
                this.setState({
                    error: '',
                    has_error: false
                })
            }
            else{
                this.setState({
                    error: texts[valid[0]](valid[1]),
                    has_error: true
                })
            }
        }
    }



    componentDidMount() {
        // if(typeof this.props.validref === "function") {
        //     this.props.validref({
        //         value: () => this.props.value,
        //         isFocused: () => this.state.focused
        //     })
        // }
    }





    render() {

        let containerClass = ['input-group']

        if (this.state.focused) {
            if(!containerClass.includes("focused")) {
                containerClass.push('focused')
            }
        }
        else {
            if (containerClass.includes("focused")) {
                let index = containerClass.indexOf("focused");
                containerClass.splice(index, 1)
            }
        }

        if (this.state.has_error) {
            if(!containerClass.includes("has-error")) {
                containerClass.push('has-error')
            }
        }
        else {
            if (containerClass.includes("has-error")) {
                let index = containerClass.indexOf("has-error");
                containerClass.splice(index, 1)
            }
        }

        if (this.state.has_warn) {
            if(!containerClass.includes("has-warning")) {
                containerClass.push('has-warning')
            }
        }
        else {
            if (containerClass.includes("has-warning")) {
                let index = containerClass.indexOf("has-warning");
                containerClass.splice(index, 1)
            }
        }

        if(this.props.disabled) containerClass.push('disabled')
        if(this.props.readOnly) containerClass.push('read-only')


        return (
            <div className={containerClass.join(" ") + (this.props.containerClass ? " " + this.props.containerClass : "")} style={this.props.containerStyle}>


                <div className={'input-line'}>

                    <input
                        {...this.props}
                        onChange={this.InputChange}
                        onFocus={this.InputFocus}
                        onBlur={this.InputBlur}
                        value={this.props.value}
                    />

                </div>

                {this.props.rightIcon}
                {this.state.error ? <label className="input-helper">{this.state.error}</label> : ''}
            </div>
        )

    }
}

export default Index;