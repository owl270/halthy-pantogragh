import React, {Component} from "react"
import {
    ContactWire,
    Dropper,
    Helper,
    MessengerWire,
    MessengerWireSupport,
    Pantograph,
    SteadyArm,
    StitchWire
} from "./svgObjects";

import MechanicalModal from "./mechanicalModals";
import update from "react-addons-update";
import {Spinner} from "react-bootstrap";

class MechanicalPropertiesContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mp_client: [0, 0],
            confirm: {
                contact_wire: false,
                messenger_wire: false,
                stitch_wire: true,
                dropper: false,
                messenger_wire_support: false,
                steady_arm: false,
                pantograph: false
            },
            modal_visibility: {
                contact_wire: false,
                messenger_wire: false,
                stitch_wire: false,
                dropper: false,
                messenger_wire_support: false,
                steady_arm: false,
                pantograph: false
            },


            modal_contact_wire_visible: false,
            modal_messenger_wire_visible: false,
            modal_stitch_wire_visible: false,
            modal_dropper_visible: false,
            modal_messenger_wire_support_visible: false,
            modal_steady_arm_visible: false,
            modal_pantograph_visible: false,


            draftsData: {
                messenger_wire_support: {
                    stiffness: 0,
                    damping: 0,
                    fix_status: false
                },
                messenger_wire: {
                    messenger_wire_counts: 0,
                    tension_per_wire: 0,
                    young_modules: 0,
                    mass_per_length: 0,
                    cross_section: 0
                },
                steady_arm: {
                    steady_arm_count: 0,
                    length: 0,
                    mass_per_length: 0,
                    clamp_mass: 0
                },
                stitch_wire: {
                    clamp_mass: 0,
                    young_modules: 0,
                    mass_per_length: 0,
                    cross_section: 0
                },
                dropper: {
                    tension_stiffness: 0,
                    compression_stiffness: 0,
                    messenger_wire_clamp: 0,
                    contact_wire_clamp: 0,
                    mass_per_length: 0
                },
                contact_wire: {
                    contact_wire_counts: 0,
                    tension_per_wire: 0,
                    young_modules: 0,
                    mass_per_length: 0,
                    cross_section: 0
                },
                pantograph: {
                    moving_load_activate: false,
                    moving_load: 0,
                    m1: 0, c1: 0, k1: 0,
                    m2: 0, c2: 0, k2: 0,
                    m3: 0, c3: 0, k3: 0,
                    uplift_force: 0
                }
            },
            classNameInputs: {
                messenger_wire_support: {
                    stiffness: [],
                    damping: []
                },
                messenger_wire: {
                    messenger_wire_counts: [],
                    tension_per_wire: [],
                    young_modules: [],
                    mass_per_length: [],
                    cross_section: []
                },
                steady_arm: {
                    steady_arm_count: [],
                    length: [],
                    mass_per_length: [],
                    clamp_mass: []
                },
                stitch_wire: {
                    clamp_mass: [],
                    young_modules: [],
                    mass_per_length: [],
                    cross_section: []
                },
                dropper: {
                    tension_stiffness: [],
                    compression_stiffness: [],
                    messenger_wire_clamp: [],
                    contact_wire_clamp: [],
                    mass_per_length: []
                },
                contact_wire: {
                    contact_wire_counts: [],
                    tension_per_wire: [],
                    young_modules: [],
                    mass_per_length: [],
                    cross_section: []
                },
                pantograph: {
                    moving_load: [],
                    m1: [], c1: [], k1: [],
                    m2: [], c2: [], k2: [],
                    m3: [], c3: [], k3: [],
                    uplift_force: []
                }
            },
        }
    }


    resize = () => {
        const client = document.getElementById("mechanical_properties");
        this.setState({
            mp_client: [client.clientWidth, client.clientHeight]
        })
    }



    modalVisibility = (e, t) => {

        this.setState({
            modal_visibility: update(this.state.modal_visibility, {
                [e]: {$set: t}
            })
        });
    }

    clickHandler = (e) => {
        this.modalVisibility(e, true)
    }




    componentDidMount() {
        this.resize();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const [W, H] = [this.state.mp_client[0], this.state.mp_client[1]]


        const gh = H + 2
        const gw = W
        const $viewBox = "0 0 " + gw + " " + (gh)

        return (
            <div className="mechanical-properties" id="mechanical_properties">


                <svg viewBox="0 0 391.318 312.503">
                    <Helper/>
                    <Pantograph
                        confirm={this.state.confirm.pantograph}
                        onClick={() => this.clickHandler('pantograph')}
                    />
                    <SteadyArm
                        confirm={this.state.confirm.steady_arm}
                        onClick={() => this.clickHandler('steady_arm')}
                    />
                    <ContactWire
                        confirm={this.state.confirm.contact_wire}
                        onClick={() => this.clickHandler('contact_wire')}
                    />
                    <MessengerWire
                        confirm={this.state.confirm.messenger_wire}
                        onClick={() => this.clickHandler('messenger_Wire')}
                    />
                    <StitchWire
                        confirm={this.state.confirm.stitch_wire}
                        onClick={() => this.clickHandler('stitch_wire')}
                    />
                    <Dropper
                        confirm={this.state.confirm.dropper}
                        onClick={() => this.clickHandler('dropper')}
                    />
                    <MessengerWireSupport
                        confirm={this.state.confirm.messenger_wire_support}
                        onClick={() => this.clickHandler('messenger_wire_support')}
                    />
                </svg>


                <MechanicalModal
                    visible={this.state.modal_visibility.pantograph}
                    name='pantograph'
                    okay={() => {this.modalVisibility('pantograph', false)}}
                    cancel={() => {this.modalVisibility('pantograph', false)}}
                />



            </div>
        )
    }


}


export default MechanicalPropertiesContent
