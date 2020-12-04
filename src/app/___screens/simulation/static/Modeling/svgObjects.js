import * as React from "react";
import {InputText, OutlineInputText} from "./inputText";



export class Inputs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {}
        }
    }



    render() {

        return Object.keys(this.props.inputs).map((name) => {

            let input = this.props.inputs[name]

            if(input.type==='outline') {
                return <OutlineInputText
                    w={input.w} h={input.h}
                    x={input.x} y={input.y}
                    name={input.name}
                    value={(typeof input.data==="object" ? input.data[name] : input.value)}
                    onChange={input.onChange}
                    disabled={input.disabled}
                />
            }
            else {
                return <InputText
                    w={input.w} h={input.h}
                    x={input.x} y={input.y}
                    name={input.name}
                    value={(typeof input.data==="object" ? input.data[name] : input.value)}
                    onChange={input.onChange}
                    disabled={input.disabled}
                />
            }
        })

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


export class Cable extends React.Component {
    render() {
        const B = this.props.b
        const T = this.props.t
        const S = this.props.s
        const W = this.props.w + B

        const d = "M" +
            B + " " + S +
            "C" +
            (B + B) + " " + T + "," +
            (W - B) + " " + T + "," +
            W + " " + S

        return ([
            <path
                d={d}
                transform={"translate(" + (this.props.x - B) + " " + this.props.y + ")"}
                fill="none"
                stroke="#505257"
                strokeWidth="1"
                id={this.props.id}
            />

        ])
    }
}


export class StitchWire extends React.Component {


    render() {

        const W = this.props.w
        const X = this.props.x
        const Y = this.props.y
        const d = this.props.dd


        return ([
            <path
                d={d}
                transform={"translate(" + (this.props.gx) + " " + this.props.gy + ")"}
                fill="none"
                stroke="#505257"
                strokeWidth="1"
            />,
            <line
                x2={W}
                transform={"translate(" + X + " " + Y + ")"}
                fill="none"
                stroke="#505257"
                strokeWidth="1"
            />,
            <MeasuringLine
                x={X} y={Y - 50}
                w={W}
                input={this.props.d+'_swl'}
            />,
            <DashLine
                x={X} y={Y}
                h={-50}
                c={'#505257'}
                d={3}
            />,
            <DashLine
                x={X + W} y={Y}
                h={-50}
                c={'#505257'}
                d={3}
            />
        ])
    }
}





export class InputLabel extends React.Component {


    render() {

        return(
            <text
                x={this.props.x} y={this.props.y}
                fill="#fff"
                fontSize="11"
                fontFamily="SegoeUI, Segoe UI"
                opacity="0.6"
            >{this.props.text}</text>

        )

    }

}




export class AddDropper extends React.Component {


    render() {

        const X = this.props.x
        const Y = this.props.y

        return(
            <g
                className="add_dropper_btn"
                transform={"translate(" + X + " " + Y + ")"}
                onClick={this.props.onClick}
            >
                <rect
                    width={this.props.w}
                    height={this.props.h}
                />

                <text
                    fill="#fff"
                    fontSize={9}
                    fontFamily="SegoeUI, Segoe UI"
                    fontWeight={'100'}
                    x={this.props.w / 2}
                    y={this.props.h / 2}
                    dominantBaseline="middle"
                    textAnchor="middle"
                >Add Dropper</text>


            </g>
        )

    }

}



export class Dropper extends React.Component {

    state = {
        launch: false
    }

    remove_dropper = (index) => {
        this.props.remove(index)
    }
    componentDidMount() {
        this.setState({
            launch: true
        })
    }

    render() {

        const {distance, presag, span_length, right_swl, left_swl, mw_cable, cw_cable, leftColumn, rightColumn, index, counts, left_sw, right_sw} = this.props
        const between_stitch_wires_length = span_length - (left_swl/2 + right_swl/2)


        const start = mw_cable.x
        const between = mw_cable.w
        const end = start + between

        const betweenColumns = rightColumn.x - (leftColumn.x + leftColumn.w)
        let betweenDroppers = 20

        let X = start
        let Y = mw_cable.y

        const dropperWidth = 4


        let $stitch = 0, dd = 0
        if(!distance || parseFloat(distance)<=0) {
            dd=0
            if(left_swl > 0) $stitch = left_sw.y
        }
        else if(distance <= (left_swl/2)) {
            $stitch = left_sw.y

            let gg = distance / (left_swl/2)

            let gs = leftColumn.x + leftColumn.w
            let ge = left_sw.x + left_sw.w
            let gb = ge - gs

            dd = gg*gb + 2
        }
        else if(distance <= ((left_swl/2)+between_stitch_wires_length)) {

            let gg = (distance - (left_swl/2)) / between_stitch_wires_length
            let gs,ge;
            if(left_swl > 0) gs = left_sw.x + left_sw.w
            else gs = leftColumn.x + leftColumn.w
            if(right_swl > 0) ge = right_sw.x
            else ge = rightColumn.x
            let gb = ge - gs
            dd = (gg*gb) + 2

            if(left_swl) dd+=((left_sw.x + left_sw.w) - (leftColumn.x + leftColumn.w))
        }
        else if(distance <= span_length) {
            $stitch = right_sw.y

            let gg = (distance - ((left_swl/2) + between_stitch_wires_length)) / (right_swl/2)

            let gs = right_sw.x
            let ge = rightColumn.x
            let gb = ge - gs

            dd = (right_sw.x - (leftColumn.x + leftColumn.w)) + (gg*gb) + 2

        }




        let $mw_cable = document.getElementById("messenger_wire")
        let $cw_cable = document.getElementById("contact_wire")
        let $mcp, $ccp, $centralPoint;
        let $pos = {x: 0, y: 0, h: 0}
        let measuringLine = {x: 0, y: 0, h: 0, w: 0}
        let dashLine = {x: 0, y: 0, h: 0, w: 0}
        let dashLineAfterColumn = {x: 0, y: 0, h: 0, w: 0}
        let dashLineSecondAfterColumn = {x: 0, y: 0, h: 0, w: 0}
        if ($mw_cable && $cw_cable) {
            $mcp = $mw_cable.getPointAtLength(dd)
            $ccp = $cw_cable.getPointAtLength(dd)
            $centralPoint = $cw_cable.getPointAtLength((span_length/2) * betweenColumns / (span_length - 1))
            $pos = {
                x: X + $mcp.x - mw_cable.b,
                y: $stitch || Y + $mcp.y,
                h: cw_cable.y - mw_cable.y - ($ccp.y) - ($stitch ? ($stitch - (Y + $mcp.y)) : 0)
            }
            measuringLine = {
                w: ($mcp.x - mw_cable.b),
                h: 0,
                x: leftColumn.x + leftColumn.w,
                y: cw_cable.y + $centralPoint.y + 10 + index*betweenDroppers
            }

            dashLine = {
                w: 0,
                h: (cw_cable.y + $ccp.y)-measuringLine.y,
                x: X + $mcp.x - mw_cable.b + (dropperWidth/2) -1,
                y: measuringLine.y,
                c: '#707070',
                d: 3
            }

            dashLineAfterColumn = {
                w: -20,
                h: 0,
                x: leftColumn.x - 2,
                y: measuringLine.y,
            }

            dashLineSecondAfterColumn = {
                w: -20,
                h: 0,
                x: leftColumn.x - 60,
                y: measuringLine.y,
                c: '#707070',
            }
        }




        return ([
            <rect
                width="2"
                height={$pos.h}
                transform={"translate(" + $pos.x + " " + $pos.y + ")"}
                fill="#fff"
                className="dropper"
                strokeWidth={dropperWidth}
                stroke="#ffffff00"
                onClick={() => {
                    this.remove_dropper(index)
                }}
            />,
            <MeasuringLine {...measuringLine}/>,
            <DashLine {...dashLine}/>,
            <DashLine {...dashLineAfterColumn}/>,
            <DashLine {...dashLineSecondAfterColumn}/>,


        ])

    }
}