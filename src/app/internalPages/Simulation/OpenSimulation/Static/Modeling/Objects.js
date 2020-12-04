import * as React from "react";
import PantoInput from "../../../../../components/PantoInput";
import ReactDOM from "react-dom";


export class OutlineInputText extends React.Component {

    onChange = (val) => {
        this.props.onChange(val)
    }

    render() {
        const W = this.props.w || 50
        const H = this.props.h || 20
        const X = this.props.x || 0
        const Y = this.props.y || 0
        const UW = this.props.uw || 0
        const U = this.props.u || ''



        return <>

            <div
                className="--modeling-input-text"
                style={{
                    top: `${Y}px`,
                    left: `${X}px`
                }}>

                <PantoInput
                    className="modeling-outline-inputs--"
                    containerClass="modeling-outline-inputs-container--"
                    containerStyle={{
                        height: `${H}px`,
                        minWidth: `${W}px`,
                        maxWidth: `${W}px`,
                        "--unit": `'${U}'`,
                        "--unit-width": `${UW}px`
                    }}
                    style={{
                        width: `${W - UW}px`
                    }}

                    type="number"

                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                />

            </div>
        </>
    }
}


export class InputText extends React.Component {

    onChange = (val) => {
        this.props.onChange(val)
    }

    render() {
        const W = this.props.w || 30
        const H = this.props.h || 20
        const X = this.props.x || 0
        const Y = this.props.y || 0
        const unit = this.props.u || null
        const label = this.props.l || null
        const lw = this.props.lw || 0


        return <>


            <div
                className="--modeling-input-text"
                style={{
                    top: `${Y}px`,
                    left: `${X}px`
                }}>

                {label ? <span className={"modeling-label--" + (this.props.disabled ? " disabled" : "")}
                               style={{width: `${lw}px`}}>{label}</span> : null}


                <PantoInput
                    className={"modeling-inputs--"}
                    containerClass={"modeling-inputs-container--"}
                    containerStyle={{
                        height: `${H}px`,
                        minWidth: `${W}px`,
                        maxWidth: `${W}px`
                    }}

                    type="number"

                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                />


                {unit ? <span
                    className={"modeling-label--" + (this.props.disabled ? " disabled" : "")}>{unit}</span> : null}

            </div>
        </>


    }
}


export class Columns extends React.Component {
    render() {
        return (
            <rect
                width={this.props.w}
                height={this.props.h}
                x={this.props.x}
                y={this.props.y}
                fill="#505257"
            />
        )
    }
}

// Columns.propTypes = {
//     w: PropTypes.number.isRequired,
//     h: PropTypes.number.isRequired,
//     x: PropTypes.number.isRequired,
//     y: PropTypes.number.isRequired
// };


export class DashLine extends React.Component {
    render() {
        return (
            <line
                x2={this.props.w || 0}
                y2={this.props.h || 0}
                transform={"translate(" + this.props.x + " " + this.props.y + ")"}
                fill="none"
                stroke={this.props.c || "#4285f4"}
                strokeWidth="1"
                strokeDasharray={this.props.d || 2}
            />
        )
    }
}


export class MeasuringLine extends React.Component {

    render() {

        let X2 = this.props.h ? 0 : this.props.w
        let Y2 = this.props.h || 0
        let XX = this.props.x
        let YY = this.props.y

        let AX = this.props.x + X2
        let AY = this.props.y + Y2

        X2 = this.props.h ? X2 : X2 - 14
        XX = this.props.h ? XX : XX + 7


        return ([
            <Arrow
                x={AX}
                y={AY}
                d={this.props.h ? 'bottom' : 'right'}
            />,
            <line
                x2={X2}
                y2={Y2}
                transform={"translate(" + XX + " " + YY + ")"}
                fill="none"
                stroke={this.props.c || "#4285f4"}
                strokeWidth="1"
            />,
            <Arrow
                x={this.props.x}
                y={this.props.y}
                d={this.props.h ? 'top' : 'left'}
            />
        ])
    }
}


export class Arrow extends React.Component {
    render() {
        let DD = ''
        let XX = this.props.x
        let YY = this.props.y
        if (this.props.d) {
            // eslint-disable-next-line default-case
            switch (this.props.d) {
                case 'left':
                    DD = " rotate(-90)"
                    YY += 3
                    break;
                case 'right':
                    DD = " rotate(90)"
                    YY -= 3
                    break;
                case 'top':
                    DD = " rotate(0)"
                    XX -= 3
                    break;
                case 'bottom':
                    DD = " rotate(180)"
                    XX += 3
                    break;

            }
        }
        if (this.props.r) DD = " rotate(" + this.props.r + ")"
        return (
            <path
                d="M3,0,5.552,7.5H0Z"
                transform={"translate(" + XX + " " + YY + ")" + DD}
                fill="#4285f4"
            />
        )
    }
}




export class StitchWire extends React.Component {


    render() {

        const W = this.props.w
        const X = this.props.x
        const Y = this.props.y
        const d = this.props.dd


        return ([
            // <path
            //     d={d}
            //     transform={"translate(" + (this.props.gx) + " " + this.props.gy + ")"}
            //     fill="none"
            //     stroke="#505257"
            //     strokeWidth="1"
            // />,
            <line
                x2={W}
                transform={"translate(" + X + " " + Y + ")"}
                fill="none"
                stroke="#505257"
                strokeWidth="1"
            />,
            // <MeasuringLine
            //     x={X} y={Y - 50}
            //     w={W}
            // />,
            // <DashLine
            //     x={X} y={Y}
            //     h={-50}
            //     c={'#505257'}
            //     d={3}
            // />,
            // <DashLine
            //     x={X + W} y={Y}
            //     h={-50}
            //     c={'#505257'}
            //     d={3}
            // />
        ])
    }
}


