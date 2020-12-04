import React, {Component} from "react"
import Index from "../../../../components/PantoCard";
import {Spinner} from "react-bootstrap";


class SimulationCalculator extends Component {

    constructor(props) {
        super(props);


    }


    render() {

        let results = {
            header: '',
            length: '',
            elasticity: ''
        };
        //
        // results.header = Object.keys(this.props.data[this.props.active_item].droppers_props).map((i) => {
        //     console.log(i)
        //     return [
        //         <span>{parseInt(i) + 1}</span>
        //     ]
        // });
        //
        // results.length = Object.keys(this.props.data[this.props.active_item].droppers_props).map((i) => {
        //     console.log(i)
        //     return [
        //         <span>{this.props.data[this.props.active_item].droppers_props[i].length || "-"}</span>
        //     ]
        // });
        //
        // results.elasticity = Object.keys(this.props.data[this.props.active_item].droppers_props).map((i) => {
        //     console.log(i)
        //     return [
        //         <span>{this.props.data[this.props.active_item].droppers_props[i].elasticity || "-"}</span>
        //     ]
        // });


        return (

            <Index id={'simulation_calculation'}>

                <header>
                    <div className={'align-left'}>
                        <h6>Simulation Result</h6>
                    </div>
                    <div className={'align-right'}>
                        <span className={'span_name'}>{this.props.items[this.props.active_item].title}</span>
                        <button className={'btn-calculate'} disabled={this.props.validating || this.props.calculating} onClick={this.props.calculation}>{this.props.calculating ? [<Spinner animation="grow" size={'sm'} />,"Calculating"]: "Calculate"}</button>
                    </div>
                </header>

                <div className={'simulation-Result-table'}>

                    <div className={'labels'}>
                        <div className={'head-style'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="34" width="160"
                                 viewBox="0 0 158.947 33.425">
                                <g id="polygon" transform="translate(158.358 0.5) rotate(90)">
                                    <path id="Path_909" data-name="Path 909"
                                          d="M32.426,157.858H0V10.082L16.372,0,32.426,10.082V157.858Z"
                                          fill="none" stroke="#4285f4" strokeWidth="1"/>
                                </g>
                            </svg>
                            <label>Dropper Number</label>
                        </div>
                        <div className={'data-style'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="56" width="160"
                                 viewBox="0 0 159.858 55.026">
                                <g id="polygon" transform="translate(159.858) rotate(90)" opacity="0.58">
                                    <path id="Path_909" data-name="Path 909"
                                          d="M55.026,159.858H0V10.21L27.783,0,55.026,10.21V159.858Z"
                                          fill="#4467a5"/>
                                </g>
                            </svg>
                            <label>Dropper Length (cm)</label>
                        </div>
                        <div className={'data-style'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="56" width="160"
                                 viewBox="0 0 159.858 55.026">
                                <g id="polygon" transform="translate(159.858) rotate(90)" opacity="0.58">
                                    <path id="Path_909" data-name="Path 909"
                                          d="M55.026,159.858H0V10.21L27.783,0,55.026,10.21V159.858Z"
                                          fill="#4467a5"/>
                                </g>
                            </svg>
                            <label>Elasticity (mm/N)</label>
                        </div>
                    </div>

                    <div className={'results'}>


                        <div className={'head-style'}>{results.header}</div>
                        <div className={'data-style first-style'}>{results.length}</div>
                        <div className={'data-style second-style'}>{results.elasticity}</div>


                    </div>

                </div>


            </Index>

        )

    }

}


export default SimulationCalculator