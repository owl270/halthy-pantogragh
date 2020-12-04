import * as React from "react";
import PantoInput from "../../../../components/PantoInput";



export class OutlineInputText extends React.Component {

    onChange = (e) => {
        const val = e.target.value

        // setModelingData(update(modelingData(), {'span_1': {'right_mwh': {$set: 26}}}));
    }

    render() {
        const W = this.props.w || 40
        const H = this.props.h || 40
        const X = this.props.x || 15
        const Y = this.props.y || 15
        return (
                <PantoInput
                    style={{
                        width: W + 'px',
                        height: H + 'px',
                        background: 'rgb(64, 67, 74)',
                        border: '1.2px solid #4467A5',
                        borderRadius: '4px',
                        fontSize: '10px',
                        textAlign: 'center',
                        color: '#fff',
                        padding: '0 2px',
                        position: 'absolute',
                        top: Y + 'px',
                        left: X + 'px'
                    }}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                />
        )
    }
}



export class InputText extends React.Component {

    onChange = (e) => {
        const val = e.target.value
        // this.props.onChange(val)
    }

    render() {
        const W = this.props.w || 40
        const H = this.props.h || 40
        const X = this.props.x || 15
        const Y = this.props.y || 15
        return (

            <PantoInput
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
                disabled={this.props.disabled}
                containerStyle={{
                    width: W + 'px',
                    height: H + 'px',
                    position: 'absolute',
                    top: Y + 'px',
                    left: X + 'px',
                    margin: 0
                }}
                style={{
                    fontSize: '10px',
                    textAlign: 'center',
                    color: '#fff',
                    padding: '0 2px',
                }}
            />
        )
    }
}

