import * as React from "react"
import {Component} from "react"
import {
    AddDropper,
    Cable,
    Columns,
    DashLine,
    Dropper,
    InputLabel,
    Inputs,
    MeasuringLine,
    StitchWire
} from "./svgObjects";
import {addNotify} from "../../../../components/PantoNotify";
import {modelingData, setModelingData, updateModelingDate} from "../dataHandler";
import update from "react-addons-update";


class Simulation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modeling_client: [0, 0]
        }

    }


    add_dropper = () => {

        let dropper_count = modelingData(this.props.id).droppers_props.length
        let span_length = parseFloat(modelingData(this.props.id).span_length)
        if (dropper_count >= 14) {
            return addNotify({
                id: "simulation_static_modeling_"+this.props.id+"_maxDroppersNumber",
                message: <span><b>{this.props.name}: </b>Can not add more than 14 droppers</span>,
                type: 'error',
                dismiss: {
                    dismissible: true,
                    duration: 3000,
                }
            })
        }
        if (!span_length) {
            return addNotify({
                id: "simulation_static_modeling_"+this.props.id+"_spanLengthInvalid",
                message: <span><b>{this.props.name}: </b>Please enter span length at first</span>,
                type: 'error',
                dismiss: {
                    dismissible: true,
                    duration: 3000,
                }
            })
        }

        let dropper_distance = 7
        let last_dropper = dropper_count ? modelingData(this.props.id).droppers_props[dropper_count - 1] : null
        if (last_dropper) {
            dropper_distance += parseFloat(last_dropper.distance)
        }

        if (dropper_distance > span_length) {
            dropper_distance = (parseFloat(last_dropper.distance) + span_length) / 2
        }

        updateModelingDate(this.props.id, {droppers_props: {
                $push: [
                    {
                        distance: dropper_distance,
                        presag: 0
                    }
                ]
            }})
    }


    remove_dropper = (dropper_index) => {
        updateModelingDate(this.props.id, {droppers_props: {$splice: [[dropper_index, 1]]}})
    }

    resize = () => {
        const client = document.getElementById("modeling_"+this.props.id);
        this.setState({
            modeling_client: [client.clientWidth, client.clientHeight]
        })
    }

    componentDidMount() {
        this.resize();
        //window.addEventListener('resize', this.resize)
    }


    componentWillUnmount() {
        //window.removeEventListener('resize', this.resize)
    }


    render() {

        let $$canAddDropper = (modelingData(this.props.id).droppers_props.length < 14)
        let $$hasLeftStitchWire = (this.props.type!=='FIRST_SPAN')
        let $$hasRightStitchWire = (this.props.type!=='END_SPAN')
        let $$leftSideDisabled = (this.props.type!=='FIRST_SPAN')

        const [W, H] = [this.state.modeling_client[0], this.state.modeling_client[1]]
        let _inputs = {}
        let $mcw = []


        const leftColumn = {
            w: 11,
            h: 0.75 * H,
            x: 0.3 * W,
            y: 0.25 * H
        }
        const leftMessengerWireHeight = {
            w: 0,
            h: leftColumn.h,
            x: leftColumn.x - 0.25*W,
            y: leftColumn.y,
            input: 'left_mwh'
        }
        const leftColumnDashLine = {
            w: leftMessengerWireHeight.x - leftColumn.x - 8,
            h: 0,
            x: leftColumn.x,
            y: leftColumn.y + leftColumn.h,
        }
        const leftMessengerWireDashLine = {
            w: leftColumnDashLine.w,
            h: 0,
            x: leftColumn.x,
            y: leftColumn.y,
            d: 3
        }
        const leftContactWireHeight = {
            w: 0,
            h: 0.6 * H,
            x: leftMessengerWireHeight.x + 0.045*W,
            y: 0.4 * H,
            input: 'left_cwh'
        }
        const leftContactWireDashLine = {
            w: leftContactWireHeight.x - leftColumn.x - 8,
            h: 0,
            x: leftColumn.x,
            y: leftContactWireHeight.y
        }
        const leftStitchWire = {
            w: 140,
            h: 0,
            x: leftColumn.x - 70 + (leftColumn.w/2) + 15,
            y: leftMessengerWireHeight.y + 31,
            d: 'left',
            dd: 'M' +
                '0 5' +
                'C' +
                '-20 33,' +
                '-70 33,' +
                '-75 33',
            gx: leftColumn.x,
            gy: leftColumn.y,
        }

        const $leftSide = [
            <Columns {...leftColumn}/>,

            <DashLine {...leftColumnDashLine}/>,
            <DashLine {...leftMessengerWireDashLine}/>,
            <MeasuringLine {...leftMessengerWireHeight}/>,

            <DashLine {...leftContactWireDashLine}/>,
            <MeasuringLine {...leftContactWireHeight}/>,

            ($$hasLeftStitchWire ? <StitchWire {...leftStitchWire}/> : '')
        ]


        const rightColumn = {
            w: 11,
            h: 0.75 * H,
            x: 0.88 * W,
            y: 0.25 * H
        }
        const rightMessengerWireHeight = {
            w: 0,
            h: rightColumn.h,
            x: rightColumn.x + 0.09*W,
            y: rightColumn.y,
            input: 'right_mwh'
        }
        const rightColumnDashLine = {
            w: rightMessengerWireHeight.x - (rightColumn.x + rightColumn.w) + 8,
            h: 0,
            x: rightColumn.x + rightColumn.w,
            y: rightColumn.y + rightColumn.h,
        }
        const rightMessengerWireDashLine = {
            w: rightColumnDashLine.w,
            h: 0,
            x: rightColumn.x + rightColumn.w,
            y: rightColumn.y,
            d: 3
        }
        const rightContactWireHeight = {
            w: 0,
            h: 0.6 * H,
            x: rightColumn.x + 0.050*W,
            y: 0.4 * H,
            input: 'right_cwh'
        }
        const rightContactWireDashLine = {
            w: rightContactWireHeight.x - (rightColumn.x + rightColumn.w) + 8,
            h: 0,
            x: rightColumn.x + rightColumn.w,
            y: rightContactWireHeight.y
        }
        const rightStitchWire = {
            w: 140,
            h: 0,
            x: rightColumn.x - 70 + (rightColumn.w/2) - 15,
            y: rightMessengerWireHeight.y + 31,
            d: 'right',
            dd: 'M' +
                '0 5' +
                'C' +
                '20 33,' +
                '70 33,' +
                '75 33',
            gx: rightColumn.x + rightColumn.w,
            gy: rightColumn.y
        }

        const $rightSide = [
            <Columns {...rightColumn}/>,

            <DashLine {...rightColumnDashLine}/>,
            <DashLine {...rightMessengerWireDashLine}/>,
            <MeasuringLine {...rightMessengerWireHeight}/>,

            <DashLine {...rightContactWireDashLine}/>,
            <MeasuringLine {...rightContactWireHeight}/>,

            ($$hasRightStitchWire ? <StitchWire {...rightStitchWire}/> : '')
        ]


        const betweenMeasuringLine = {
            w: rightColumn.x - leftColumn.x - leftColumn.w,
            h: 0,
            x: leftColumn.x + leftColumn.w,
            y: H - 10,
            input: 'span_length'
        }
        const messengerWireCable = {
            x: leftColumn.x + leftColumn.w,
            y: leftColumn.y + 7,
            w: rightColumn.x - leftColumn.x - leftColumn.w,
            t: 45, s: 0, b: 75,
            id: 'messenger_wire'
        }
        const contactWireCable = {
            x: leftColumn.x + leftColumn.w,
            y: 0.4*H,
            w: rightColumn.x - leftColumn.x - leftColumn.w,
            t: 25, s: 0, b: 75,
            id: 'contact_wire'
        }

        const $between = [
            <MeasuringLine {...betweenMeasuringLine}/>,
            <Cable {...messengerWireCable}/>,
            <Cable {...contactWireCable}/>,
        ]


        const $droppers = []
        const droppersCount = modelingData(this.props.id).droppers_props.length
        const between_droppers = 20
        let dropper = {
            span_length: modelingData(this.props.id).span_length,
            right_swl: modelingData(this.props.id).right_swl,
            left_swl: modelingData(this.props.id).left_swl,
            mw_cable: messengerWireCable,
            cw_cable: contactWireCable,
            rightColumn,
            leftColumn,
            right_sw: rightStitchWire,
            left_sw: leftStitchWire,
            counts: droppersCount,
            remove: this.remove_dropper
        }

        for (let i=0;i<droppersCount;i++) {
            dropper.distance = modelingData(this.props.id).droppers_props[i].distance;
            dropper.presag = modelingData(this.props.id).droppers_props[i].presag;
            dropper.index = i
            $droppers.push(<Dropper {...dropper}/>)
            _inputs['droppers_distance_'+i] = {
                type: 'normal',
                x: leftColumn.x - 47.5,
                y: contactWireCable.y + (i+1)*(between_droppers-.55) - 5,
                w: 30, h: between_droppers,
                name: 'droppers_distance_'+i,
                value: modelingData(this.props.id)['droppers_props'][i]['distance'],
                onChange: (val) => {
                    updateModelingDate(this.props.id, {droppers_props: {[i]: {distance: {$set: val}}}})
                }
            }
            _inputs['droppers_presag_'+i] = {
                type: 'normal',
                x: leftColumn.x - 47.5 - 57.5,
                y: contactWireCable.y + (i+1)*(between_droppers-.55) - 5,
                w: 30, h: between_droppers,
                name: 'droppers_presag_'+i,
                value: modelingData(this.props.id)['droppers_props'][i]['presag'],
                onChange: (val) => {
                    //alert(val)
                    //updateModelingDate(this.props.id, {droppers_props: {[i]: {presag: {$set: val}}}})
                }
            }
        }


        const $droppersAddBtn = <AddDropper
            x={leftContactWireHeight.x + ((leftColumn.x - leftContactWireHeight.x) / 2) - 35}
            y={contactWireCable.y + 25 + droppersCount*between_droppers}
            w={70} h={20}
            onClick={this.add_dropper}
            />



        let $inputs = {
            left_mws: {
                type: 'normal',
                x: 0.5*W - 200, y: 20,
                w: 30, h: 20,
                lw: 120,
                text: 'Messenger wire stager',
                disabled: $$leftSideDisabled
            },
            left_cws: {
                type: 'normal',
                x: 0.5*W - 185, y: 45,
                w: 30, h: 20,
                lw: 105,
                text: 'Contact wire stager',
                disabled: $$leftSideDisabled
            },
            right_mws: {
                type: 'normal',
                x: 0.5*W + 200, y: 20,
                w: 30, h: 20,
                lw: 105,
                text: 'Messenger wire stager'
            },
            right_cws: {
                type: 'normal',
                x: 0.5*W + 215, y: 45,
                w: 30, h: 20,
                lw: 90,
                text: 'Contact wire stager'
            },
            span_length: {
                type: 'outline',
                x: betweenMeasuringLine.x + (betweenMeasuringLine.w - 15)/2, y: betweenMeasuringLine.y - 15,
                w: 60, h: 20
            },
            right_mwh: {
                type: 'outline',
                x: rightMessengerWireHeight.x - 50, y: rightMessengerWireHeight.y + 50,
                w: 60, h: 20
            },
            right_cwh: {
                type: 'outline',
                x: rightContactWireHeight.x - 50, y: rightContactWireHeight.y + 50,
                w: 60, h: 20
            },
            left_mwh: {
                type: 'outline',
                x: leftMessengerWireHeight.x - 10, y: leftMessengerWireHeight.y + 50,
                w: 60, h: 20,
                disabled: $$leftSideDisabled
            },

            left_cwh: {
                type: 'outline',
                x: leftContactWireHeight.x - 10, y: leftContactWireHeight.y + 50,
                w: 60, h: 20,
                disabled: $$leftSideDisabled
            }
        }

        if($$hasLeftStitchWire) {
            $inputs['left_swl'] = {
                type: 'outline',
                x: leftStitchWire.x + 50, y: leftStitchWire.y - 50,
                w: 60, h: 20,
                disabled: $$leftSideDisabled
            }
            $inputs['left_swt'] = {
                type: 'normal',
                x: leftStitchWire.x + 25, y: leftStitchWire.y - 70,
                w: 30, h: 20,
                lw: 65,
                text: 'Tension (m)',
                disabled: $$leftSideDisabled
            }
        }
        if($$hasRightStitchWire) {
            $inputs['right_swl'] = {
                type: 'outline',
                x: rightStitchWire.x + 30,
                y: rightStitchWire.y - 50,
                w: 60, h: 20
            }
            $inputs['right_swt'] = {
                type: 'normal',
                x: rightStitchWire.x + 25, y: rightStitchWire.y - 70,
                w: 30, h: 20,
                lw: 50,
                text: 'Tension (m)'
            }
        }



        for(const $input in $inputs) {
            const $$inp = $inputs[$input]
            const X = $$inp.x + ($$inp.text ? $$inp.lw : 0)
            const Y = $$inp.y - ($$inp.text ? 5 : 0)
            _inputs[$input] = {
                type: $$inp.type,
                x: X, y: Y,
                w: $$inp.w, h: $$inp.h,
                name: $input,
                disabled: $$inp.disabled,
                data: modelingData(this.props.id),
                onChange: (val)=>{
                    //setModelingData(update(modelingData(), finalQuery), callback);
                    //updateModelingDate(this.props.id, {[$input]: {$set: val}})
                    // updateModelingDate('span_1', {right_cws: {
                    //         $set: 45
                    //     }}, alert('hello'))


                }
            }

            if($$inp.text) {
                $mcw.push(<InputLabel
                    {...$$inp}
                />)
            }
        }


        const $content = [
            $mcw,
            $rightSide,
            $leftSide,
            $between,
            $droppers,
            ($$canAddDropper ? $droppersAddBtn : '')
        ]

        const gh = H+2
        const gw = W
        const $viewBox = "0 0 " + gw + " " + (gh)
        return (
            <div className={'modeling-body'} id={"modeling_"+this.props.id}>

                <svg height="100%" width="100%" viewBox={$viewBox}>{$content}</svg>
                <Inputs inputs={_inputs}/>
                <div style={{position: 'absolute',overflowWrap: 'break-word',top: 0, width: '300px'}}>
                    {JSON.stringify(modelingData(this.props.id))}
                </div>
            </div>
        )

    }

}


export default (Simulation)
