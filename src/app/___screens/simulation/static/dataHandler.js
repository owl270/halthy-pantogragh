import * as React from "react";
import update from "react-addons-update";


export function modelingItem(span_id) {
    if(span_id) return this.state.modeling_items[span_id]
    return this.state.modeling_items
}
export function setModelingItem($query) {
    return this.setState({
        modeling_items: $query
    })
}


export function modelingData(span_id) {
    if(span_id) return this.state.modeling_data[span_id]
    return this.state.modeling_data
}
export function setModelingData($query,callback) {
    return this.setState({
        modeling_data: $query
    },callback)
}
export function updateModelingDate(span_id, $query, callback) {

    let key = Object.keys($query)[0]
    let finalQuery = {[span_id]: $query}
    if (key.startsWith('right_') && modelingItem()[span_id].type !== 'END_SPAN') {
        let next_span_id = 'span_' + (parseInt(span_id.replace("span_", "")) + 1)
        if (modelingItem()[next_span_id] && modelingData()[next_span_id]) {
            finalQuery[next_span_id] = {['left_' + key.substring(6)]: {$set: $query[key].$set}}
        }
    }
    setModelingData(update(modelingData(), finalQuery), callback);

}




export function activeSpan() {
    return this.state.active_span_modeling
}
export function navigateSpan(_id) {
    return this.setState({
        active_span_modeling: _id
    })
}

export function mechanicalProperties() {
    return this.state.mechanical_properties
}
export function setMechanicalProperties() {
    return true
}


class DataHandler extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active_span_modeling: 'span_1',
            modeling_items: {
                span_1: {
                    id: "span_1",
                    title: "Span 1",
                    type: 'FIRST_SPAN'
                }
            },
            modeling_data: {
                span_1: {
                    right_mws: 0.65,
                    right_cws: 0.65,
                    right_mwh: 6.88,
                    right_cwh: 5.08,

                    right_swl: 18,
                    right_swt: 3500,

                    left_mws: 1,
                    left_cws: 1,
                    left_mwh: 7,
                    left_cwh: 6.35,

                    left_swt: 0,
                    left_swl: 0,

                    span_length: 60,
                    droppers_props: []
                }
            },
            mechanical_properties: {
                messenger_wire_support: {
                    stiffness: 500000,
                    damping: 1000,
                    fix_status: false,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                },
                messenger_wire: {
                    messenger_wire_counts: 1,
                    tension_per_wire: 21000,
                    young_modules: 110,
                    mass_per_length: 1.06,
                    cross_section: 117,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                },
                steady_arm: {
                    steady_arm_count: 1,
                    length: 1.15,
                    mass_per_length: 0.78,
                    clamp_mass: 0.46,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                },
                stitch_wire: {
                    clamp_mass: 0.38,
                    young_modules: 110,
                    mass_per_length: 1.06,
                    cross_section: 35,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                },
                dropper: {
                    tension_stiffness: 100000,
                    compression_stiffness: 0,
                    messenger_wire_clamp: 0.155,
                    contact_wire_clamp: 0.140,
                    mass_per_length: 0.089,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                },
                contact_wire: {
                    contact_wire_counts: 1,
                    tension_per_wire: 21000,
                    young_modules: 110,
                    mass_per_length: 1.06,
                    cross_section: 120,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                },
                pantograph: {
                    m1: 7.5,
                    c1: 45,
                    k1: 7000,
                    m2: 9,
                    c2: 0.1,
                    k2: 15500,
                    m3: 6,
                    c3: 100,
                    k3: 160,
                    uplift_force: 120,
                    moving_load_activate: false,
                    moving_load: 120,
                    section_status: this.SECTION_STATUS_NOT_COMPLETED
                }
            },
        }


        modelingItem = modelingItem.bind(this)
        modelingData = modelingData.bind(this)
        mechanicalProperties = mechanicalProperties.bind(this)
        activeSpan = activeSpan.bind(this)
        navigateSpan = navigateSpan.bind(this)
        setModelingItem = setModelingItem.bind(this)
        setModelingData = setModelingData.bind(this)
        setMechanicalProperties = setMechanicalProperties.bind(this)
        updateModelingDate = updateModelingDate.bind(this)
    }


    componentDidMount() {
        this.props.load()
    }

    render() {
        return null
    }

}

export default DataHandler