import React from "react";
import {addNotify, removeNotify} from "../../../components/PantoNotify";
import update from "react-addons-update";

export default class errorHandler extends React.Component {

    modeling_limitation = {
        FIRST_SPAN: {
            left_mwh: [
                {
                    v: (val, $id) => {
                        return (val > parseFloat(this.props.md[$id].left_cwh))
                    },
                    t: <span>The messenger wire height can not be less than contact wire height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 6.2 && val <= 8.8)
                    },
                    t: <span>The catenary encumbrance is 6.2-8.8 normally</span>,
                    y: 'warning'
                }
            ],
            left_cwh: [
                {
                    v: (val, $id) => {
                        return (val > 0 && val < parseFloat(this.props.md[$id].left_mwh))
                    },
                    t:
                        <span>The contact wire height can not be negative or zero or more than messenger cable height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 5 && val <= 6.5)
                    },
                    t: <span>consider the recommendation of EN  15273-2-2013</span>,
                    y: 'warning'
                }
            ],
            right_mwh: [
                {
                    v: (val, $id) => {
                        return (val > parseFloat(this.props.md[$id].right_cwh))
                    },
                    t: <span>The messenger wire height can not be less than contact wire height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 6.2 && val <= 8.8)
                    },
                    t: <span>The catenary encumbrance is 6.2-8.8 normally</span>,
                    y: 'warning'
                }
            ],
            right_cwh: [
                {
                    v: (val, $id) => {
                        return (val > 0 && val < parseFloat(this.props.md[$id].right_mwh))
                    },
                    t:
                        <span>The contact wire height can not be negative or zero or more than messenger cable height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 5 && val <= 6.5)
                    },
                    t: <span>consider the recommendation of EN  15273-2-2013</span>,
                    y: 'warning'
                }
            ],
            span_length: [
                {
                    v: (val, $id) => {
                        return (val > 0)
                    },
                    t: <span>The length of span could not be negative or zero</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 27 && val <= 63)
                    },
                    t: <span>Length of span is normally 27-63m</span>,
                    y: 'warning'
                }
            ],
            left_mws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            left_cws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            right_mws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            right_cws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            right_swl: [
                {
                    v: (val, $id) => {
                        let $span_length = parseFloat(this.props.md[$id].span_length)
                        let i = parseInt($id.replace("span_", ""))
                        let next_span = this.props.md['span_' + (i + 1)]
                        if (next_span) {
                            if ($span_length > parseFloat(next_span.span_length)) $span_length = parseFloat(next_span.span_length)
                        }

                        return (val > 0 && val < $span_length)
                    },
                    t: <span>The length of stitch wire can not be zero or more than the length of span</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 12 && val <= 25)
                    },
                    t: <span>normally 2 droppers locate in stitch wire</span>,
                    y: 'warning'
                }
            ],
            right_swt: [
                {
                    v: (val, $id) => {
                        let g16 = parseFloat(this.props.mc.messenger_wire.tension_per_wire)
                        return (val > 0 && val <= g16)
                    },
                    t:
                        <span>The tension of stitch wire can not be zero or more than the tension of messenger cable</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        let g16 = parseFloat(this.props.mc.messenger_wire.tension_per_wire)
                        return (val >= (0.1 * g16) && val <= (0.2 * g16))
                    },
                    t: <span>The tension of stitch wire is normally 10-20% of the tension of messenger cable</span>,
                    y: 'warning'
                }
            ],
            dropper_distance: [
                {
                    v: (val, $id, $dpi) => {
                        let d1 = ($dpi > 0) ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].distance) : 0
                        return (val > d1 && val < parseFloat(this.props.md[$id].span_length))
                    },
                    t: <span>The dropper can not locate before previous dropper or after support</span>,
                    y: 'error'
                },
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].distance) : 0
                        return (val > d1 + 3 && val < parseFloat(this.props.md[$id].span_length) + 3)
                    },
                    t: <span>The dropper is too close to previous dropper or support</span>,
                    y: 'warning'
                }
            ],
            dropper_presag: [
                {
                    v: (val) => {
                        return (val > -300 && val < 300)
                    },
                    t: <span>The value for pre sag must be -300 to 300</span>,
                    y: 'error'
                },
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].presag) : 0
                        return (val > d1 - 50 && val < d1 + 50)
                    },
                    t: <span>The dropper is too close to previous dropper or support</span>,
                    y: 'warning'
                }
            ]
        },
        SPAN: {
            right_mwh: [
                {
                    v: (val, $id) => {
                        return (val > parseFloat(this.props.md[$id].right_cwh))
                    },
                    t: <span>The messenger wire height can not be less than contact wire height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 6.2 && val <= 8.8)
                    },
                    t: <span>consider the recommendation of EN  15273-2-2013</span>,
                    y: 'warning'
                }
            ],
            right_cwh: [
                {
                    v: (val, $id) => {
                        return (val > 0 && val < parseFloat(this.props.md[$id].right_mwh))
                    },
                    t:
                        <span>The contact wire height can not be negative or zero or more than messenger cable height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 5 && val <= 6.5)
                    },
                    t: <span>consider the recommendation of EN  15273-2-2013</span>,
                    y: 'warning'
                }
            ],
            span_length: [
                {
                    v: (val, $id) => {
                        return (val > 0)
                    },
                    t: <span>The length of span could not be negative or zero</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 27 && val <= 63)
                    },
                    t: <span>Length of span is normally 27-63m</span>,
                    y: 'warning'
                }
            ],
            right_mws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            right_cws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            right_swl: [
                {
                    v: (val, $id) => {
                        let $span_length = parseFloat(this.props.md[$id].span_length)
                        let i = parseInt($id.replace("span_", ""))
                        let next_span = this.props.md['span_' + (i + 1)]
                        if (next_span) {
                            if ($span_length > parseFloat(next_span.span_length)) $span_length = parseFloat(next_span.span_length)
                        }
                        return (val > 0 && val < $span_length)
                    },
                    t: <span>The length of stitch wire can not be zero or more than the length of span</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 12 && val <= 25)
                    },
                    t: <span>normally 2 droppers locate in stitch wire</span>,
                    y: 'warning'
                }
            ],
            right_swt: [
                {
                    v: (val, $id) => {
                        let g16 = parseFloat(this.props.mc.messenger_wire.tension_per_wire)
                        return (val > 0 && val <= g16)
                    },
                    t:
                        <span>The tension of stitch wire can not be zero or more than the tension of messenger cable</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        let g16 = parseFloat(this.props.mc.messenger_wire.tension_per_wire)
                        return (val >= (0.1 * g16) && val <= (0.2 * g16))
                    },
                    t: <span>The tension of stitch wire is normally 10-20% of the tension of messenger cable</span>,
                    y: 'warning'
                }
            ],
            dropper_distance: [
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].distance) : 0
                        return (val > d1 && val < parseFloat(this.props.md[$id].span_length))
                    },
                    t: <span>The dropper can not locate before previous dropper or after support</span>,
                    y: 'error'
                },
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].distance) : 0
                        return (val > d1 + 3 && val < parseFloat(this.props.md[$id].span_length) + 3)
                    },
                    t: <span>The dropper is too close to previous dropper or support</span>,
                    y: 'warning'
                }
            ],
            dropper_presag: [
                {
                    v: (val) => {
                        return (val > -300 && val < 300)
                    },
                    t: <span>The value for pre sag must be -300 to 300</span>,
                    y: 'error'
                },
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].presag) : 0
                        return (val > d1 - 50 && val < d1 + 50)
                    },
                    t: <span>The dropper is too close to previous dropper or support</span>,
                    y: 'warning'
                }
            ]
        },
        END_SPAN: {
            right_mwh: [
                {
                    v: (val, $id) => {
                        return (val > parseFloat(this.props.md[$id].right_cwh))
                    },
                    t: <span>The messenger wire height can not be less than contact wire height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 6.2 && val <= 8.8)
                    },
                    t: <span>consider the recommendation of EN  15273-2-2013</span>,
                    y: 'warning'
                }
            ],
            right_cwh: [
                {
                    v: (val, $id) => {
                        return (val > 0 && val < parseFloat(this.props.md[$id].right_mwh))
                    },
                    t:
                        <span>The contact wire height can not be negative or zero or more than messenger cable height</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 5 && val <= 6.5)
                    },
                    t: <span>consider the recommendation of EN  15273-2-2013</span>,
                    y: 'warning'
                }
            ],
            span_length: [
                {
                    v: (val, $id) => {
                        return (val > 0)
                    },
                    t: <span>The length of span could not be negative or zero</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val >= 27 && val <= 63)
                    },
                    t: <span>Length of span is normally 27-63m</span>,
                    y: 'warning'
                }
            ],
            right_mws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            right_cws: [
                {
                    v: (val, $id) => {
                        const $span_length = parseFloat(this.props.md[$id].span_length)
                        return (val > -0.5 * $span_length && val < +0.5 * $span_length)
                    },
                    t: <span>The stager can not be more than span length</span>,
                    y: 'error'
                },
                {
                    v: (val, $id) => {
                        return (val > -1 && val < 1)
                    },
                    t: <span>The stager is ±30 cm normally</span>,
                    y: 'warning'
                }
            ],
            dropper_distance: [
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? this.props.md[$id].droppers_props[$dpi - 1].distance : 0
                        return (val > d1 && val < parseFloat(this.props.md[$id].span_length))
                    },
                    t: <span>The dropper can not locate before previous dropper or after support</span>,
                    y: 'error'
                },
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].distance) : 0
                        return (val > d1 + 3 && val < parseFloat(this.props.md[$id].span_length) + 3)
                    },
                    t: <span>The dropper is too close to previous dropper or support</span>,
                    y: 'warning'
                }
            ],
            dropper_presag: [
                {
                    v: (val) => {
                        return (val > -300 && val < 300)
                    },
                    t: <span>The value for pre sag must be -300 to 300</span>,
                    y: 'error'
                },
                {
                    v: (val, $id, $dpi) => {
                        let d1 = $dpi > 0 ? parseFloat(this.props.md[$id].droppers_props[$dpi - 1].presag) : 0
                        return (val > d1 - 50 && val < d1 + 50)
                    },
                    t: <span>The dropper is too close to previous dropper or support</span>,
                    y: 'warning'
                }
            ]
        },
    }
    mechanical_limitation = {
        messenger_wire: {
            messenger_wire_counts: [
                {
                    v: (val) => {
                        return (val === 1)
                    },
                    t: <span>The number of messenger wire can only be 1</span>,
                    y: 'error'
                }
            ],
            tension_per_wire: [
                {
                    v: (val) => {
                        return (val >= 800 && val <= 50000)
                    },
                    t: <span>This linear analytical simulation is not suitable for extremely high tension or supper low tension cables</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 13000 && val <= 24000)
                    },
                    t: <span>The tension in messenger wire is 13-24kN normally</span>,
                    y: 'warning'
                }
            ],
            young_modules: [
                {
                    v: (val) => {
                        return (val >= 50 && val <= 300)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 90 && val <= 120)
                    },
                    t: <span>The Youngs module in messenger wire is 90-120 kN/mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {
                        return (val >= 0.4 && val <= 3)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.8 && val <= 1.1)
                    },
                    t: <span>The mass per unit length of this cable is 0.8-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            cross_section: [
                {
                    v: (val) => {
                        return (val >= 50 && val <= 250)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 80 && val <= 120)
                    },
                    t: <span>The cross section of this cable is 80-120 mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
        },
        contact_wire: {
            contact_wire_counts: [
                {
                    v: (val) => {
                        return (val === 1)
                    },
                    t: <span>The number of contact wire can only be 1</span>,
                    y: 'error'
                }
            ],
            tension_per_wire: [
                {
                    v: (val) => {
                        return (val >= 800 && val <= 50000)
                    },
                    t: <span>This linear analytical simulation is not suitable for extremely high tension or supper low tension cables</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 13000 && val <= 24000)
                    },
                    t: <span>the tension in contact wire is 13-24kN normally</span>,
                    y: 'warning'
                }
            ],
            young_modules: [
                {
                    v: (val) => {
                        return (val >= 50 && val <= 300)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 90 && val <= 120)
                    },
                    t: <span>The Youngs module in contact wire is 90-120 kN/mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {
                        return (val >= 0.4 && val <= 3)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.8 && val <= 1.1)
                    },
                    t: <span>The mass per unit length of this cable is 0.8-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            cross_section: [
                {
                    v: (val) => {
                        return (val >= 50 && val <= 250)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 80 && val <= 130)
                    },
                    t: <span>The cross section of this cable is 80-130 mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
        },
        stitch_wire: {
            clamp_mass: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 5)
                    },
                    t: <span>The weight of clamp can not be less than zero or more that 5kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.2 && val <= 0.5)
                    },
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
            young_modules: [
                {
                    v: (val) => {
                        return (val >= 50 && val <= 300)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 90 && val <= 120)
                    },
                    t: <span>The Youngs module in stitch wire is 90-120 kN/mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {
                        return (val >= 0.4 && val <= 3)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.8 && val <= 1.1)
                    },
                    t: <span>The mass per unit length of this cable is 0.8-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            cross_section: [
                {
                    v: (val) => {
                        return (val >= 10 && val <= 100)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 30 && val <= 40)
                    },
                    t: <span>The cross section of this cable is 30-40 mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
        },
        steady_arm: {
            steady_arm_count: [
                {
                    v: (val) => {
                        return (val === 1)
                    },
                    t: <span>The number of steady arms can only be 1</span>,
                    y: 'error'
                }
            ],
            length: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 10)
                    },
                    t: <span>The length of steady arm can not be less than zero or more that 10m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.8 && val <= 1.5)
                    },
                    t: <span>The steady arm is so short or too long, check the technical data</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 5)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.6 && val <= 1.1)
                    },
                    t: <span>the mass per unit length of steady arm is 0.6-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            clamp_mass: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 5)
                    },
                    t: <span>The weight of clamp can not be less than zero or more that 5kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.2 && val <= 0.6)
                    },
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
        },
        dropper: {
            tension_stiffness: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 500000)
                    },
                    t: <span>The dropper stiffness in tension can not be less than zero or more than 500kN/m  </span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 10000 && val <= 500000)
                    },
                    t: <span>The dropper stiffness is normally 100kN/m in tension, check the technical data</span>,
                    y: 'warning'
                }
            ],
            messenger_wire_clamp: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 3)
                    },
                    t: <span>The weight of clamp can not be less than zero or more that 3kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.1 && val <= 0.2)
                    },
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
            contact_wire_clamp: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 3)
                    },
                    t: <span>The weight of clamp can not be less than zero or more that 3kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.1 && val <= 0.2)
                    },
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {
                        return (val >= 0 && val <= 3)
                    },
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (val >= 0.07 && val <= 0.2)
                    },
                    t: <span>The mass per unit length of dropper is 0.07-0.2 kg/m normally</span>,
                    y: 'warning'
                }
            ],
        },
        messenger_wire_support: {
            stiffness: [
                {
                    v: (val) => {
                        return (this.props.mc.messenger_wire_support.fix_status || (val >= 0 && val <= 1000000))
                    },
                    t: <span>The stiffness of the support can not be less than 0 or more than 1000000, if the support is rigid, please check the bottom above</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (this.props.mc.messenger_wire_support.fix_status || (val >= 10000 && val <= 800000))
                    },
                    t: <span>The stiffness of the support is either low or high</span>,
                    y: 'warning'
                }
            ],
            damping: [
                {
                    v: (val) => {
                        return (this.props.mc.messenger_wire_support.fix_status || (val >= 0 && val <= 10000))
                    },
                    t: <span>The damping of the support can not be less than 0 or more than 10000, if the support is rigid, please check the bottom above</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (this.props.mc.messenger_wire_support.fix_status || (val >= 10 && val <= 5000))
                    },
                    t: <span>The damping of the support is either low or high</span>,
                    y: 'warning'
                }
            ]
        },
        pantograph: {
            moving_load: [
                {
                    v: (val) => {
                        return (!this.props.mc.pantograph.moving_load_activate || (val >= -1000 && val <= 1000))
                    },
                    t: <span>The value of the load should be within -1000 to 1000 N</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return (!this.props.mc.pantograph.moving_load_activate || (val >= 10 && val <= 200))
                    },
                    t: <span>the value of the moving load is either so low or too high</span>,
                    y: 'warning'
                }
            ],
            m1: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 50)
                    },
                    t: <span>The mass of collector head can not be less than zero or more than 50kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 3 && val <= 20)
                    },
                    t: <span>The collector head is either so heavy or light, check the technical data</span>,
                    y: 'warning'
                }
            ],
            m2: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 50)
                    },
                    t: <span>The mass of intermediate mass can not be less than zero or more than 50kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 3 && val <= 20)
                    },
                    t: <span>The intermediate mass is either so heavy or light, check the technical data</span>,
                    y: 'warning'
                }
            ],
            m3: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 50)
                    },
                    t: <span>The mass of lower mass can not be less than zero or more than 50kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 3 && val <= 20)
                    },
                    t: <span>The lower mass is either so heavy or light, check the technical data</span>,
                    y: 'warning'
                }
            ],
            c1: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 100)
                    },
                    t: <span>The damping of collector head can not be less than zero or more than 100 Ns/m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 10 && val <= 60)
                    },
                    t: <span>The damping of the collector head is out of normal range (10-60 Ns/m)</span>,
                    y: 'warning'
                }
            ],
            c2: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 10)
                    },
                    t: <span>The damping of intermediate mass can not be less than zero or more than 10 Ns/m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 1)
                    },
                    t: <span>The damping of the intermediate mass is out of normal range (0-1 Ns/m)</span>,
                    y: 'warning'
                }
            ],
            c3: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 1000)
                    },
                    t: <span>The damping of lower mass can not be less than zero or more than 1000 Ns/m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return !this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 300)
                    },
                    t: <span>The damping of the lower mass is out of normal range (0-300 Ns/m)</span>,
                    y: 'warning'
                }
            ],
            k1: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 100000)
                    },
                    t:
                        <span>The stiffness of collector head can not be less than zero or more than 100000 N/m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 1000 && val <= 10000)
                    },
                    t: <span>The stiffness of the collector head is out of normal range (1000-10000 N/m)</span>,
                    y: 'warning'
                }
            ],
            k2: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 100000)
                    },
                    t:
                        <span>The stiffness of intermediate mass can not be less than zero or more than 100000 N/m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 5000 && val <= 20000)
                    },
                    t: <span>The stiffness of the intermediate mass is out of normal range (5000-20000 N/m)</span>,
                    y: 'warning'
                }
            ],
            k3: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 1000)
                    },
                    t: <span>The stiffness of lower mass can not be less than zero or more than 1000 N/m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0.5 && val <= 300)
                    },
                    t: <span>The stiffness of the lower mass is out of normal range (0.5-300 N/m)</span>,
                    y: 'warning'
                }
            ],
            uplift_force: [
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 0 && val <= 1000)
                    },
                    t: <span>The uplift force can not be less than zero or more than 1000 N</span>,
                    y: 'error'
                },
                {
                    v: (val) => {
                        return this.props.mc.pantograph.moving_load_activate || (val >= 80 && val <= 120)
                    },
                    t: <span>The Uplift force is normally 80-120 N</span>,
                    y: 'warning'
                }
            ],
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            ignore_warnings: [],
        }
    }

    componentDidMount() {

        this.errors();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.errors();

    }

    errors = async () => {


        //modeling
        let span_item = {}
        for (const span in this.props.mi) {
            span_item = this.props.mi[span]
            for (const field in this.modeling_limitation[span_item.type]) {

                if (field !== 'dropper_distance' && field !== 'dropper_presag') {

                    for (let ii = 0; ii < this.modeling_limitation[span_item.type][field].length; ii++) {
                        if (!this.modeling_limitation[span_item.type][field][ii].v(parseFloat(this.props.md[span][field]), span)) {
                            if (this.modeling_limitation[span_item.type][field][ii].y === 'warning') {
                                if (!this.state.ignore_warnings.includes(field)) {
                                    await addNotify({
                                        id: 'simulation_static_modeling_' + span + "_" + field + "_" + ii,
                                        message:
                                            <span><b>{span_item.title}: </b>{this.modeling_limitation[span_item.type][field][ii].t}</span>,
                                        type: this.modeling_limitation[span_item.type][field][ii].y,
                                        dismiss: {
                                            dismissible: true,
                                            duration: 6000,
                                        }
                                    })
                                    this.setState({
                                        ignore_warnings: update(this.state.ignore_warnings, {$push: [field]})
                                    })
                                }
                            } else {
                                await addNotify({
                                    id: 'simulation_static_modeling_' + span + "_" + field + "_" + ii,
                                    message:
                                        <span><b>{span_item.title}: </b>{this.modeling_limitation[span_item.type][field][ii].t}</span>,
                                    type: this.modeling_limitation[span_item.type][field][ii].y,
                                    dismiss: {
                                        dismissible: false,
                                        duration: 0,
                                    }
                                })
                                this.props.set_error('simulation_static_modeling_' + span + "_" + field + "_" + ii)
                            }
                        }
                        else {
                            await removeNotify('simulation_static_modeling_' + span + "_" + field + "_" + ii)
                            if (this.modeling_limitation[span_item.type][field][ii].y !== 'warning') this.props.set_error('simulation_static_modeling_' + span + "_" + field + "_" + ii)
                        }
                    }

                }
                else {
                    for (let jj = 0; jj < this.props.md[span].droppers_props.length; jj++) {

                        let fields = ['dropper_distance', 'dropper_presag']
                        let value_fields = ['distance', 'presag']
                        let field = ''
                        for (let ff = 0; ff < 2; ff++) {
                            field = fields[ff]
                            for (let ii = 0; ii < this.modeling_limitation[span_item.type][field].length; ii++) {

                                if (!this.modeling_limitation[span_item.type][field][ii].v(parseFloat(this.props.md[span]['droppers_props'][jj][value_fields[ff]]), span, jj)) {

                                    if (this.modeling_limitation[span_item.type][field][ii].y === 'warning') {
                                        if (!this.state.ignore_warnings.includes(field)) {
                                            await addNotify({
                                                id: 'simulation_static_modeling_' + span + "_" + field + "_" + jj + "_" + ii,
                                                message:
                                                    <span><b>{span_item.title}: </b><i>D{jj + 1} </i>{this.modeling_limitation[span_item.type][field][ii].t}</span>,
                                                type: this.modeling_limitation[span_item.type][field][ii].y,
                                                dismiss: {
                                                    dismissible: true,
                                                    duration: 6000,
                                                }
                                            })
                                            this.setState({
                                                ignore_warnings: update(this.state.ignore_warnings, {$push: [field]})
                                            })
                                        }
                                    } else {
                                        await addNotify({
                                            id: 'simulation_static_modeling_' + span + "_" + field + "_" + jj + "_" + ii,
                                            message:
                                                <span><b>{span_item.title}: </b><i>D{jj + 1} </i>{this.modeling_limitation[span_item.type][field][ii].t}</span>,
                                            type: this.modeling_limitation[span_item.type][field][ii].y,
                                            dismiss: {
                                                dismissible: false,
                                                duration: 0,
                                            }
                                        })
                                        this.props.set_error('simulation_static_modeling_' + span + "_" + field + "_" + jj + "_" + ii)
                                    }
                                } else {
                                    await removeNotify('simulation_static_modeling_' + span + "_" + field + "_" + jj + "_" + ii)
                                    if (this.modeling_limitation[span_item.type][field][ii].y !== 'warning') this.props.set_error('simulation_static_modeling_' + span + "_" + field + "_" + jj + "_" + ii)
                                }

                            }
                        }

                    }
                }

            }
        }


        //mechanical properties
        for (const field in this.mechanical_limitation) {

            for (const target in this.mechanical_limitation[field]) {

                for (let ii = 0; ii < this.mechanical_limitation[field][target].length; ii++) {

                    if (!this.mechanical_limitation[field][target][ii].v(parseFloat(this.props.mc[field][target]))) {

                        if (this.mechanical_limitation[field][target][ii].y === 'warning') {
                            if (!this.state.ignore_warnings.includes(field + "_" + target)) {
                                await addNotify({
                                    id: 'simulation_static_mechanicalProperties_' + field + "_" + target + "_" + ii,
                                    message: <span>{this.mechanical_limitation[field][target][ii].t}</span>,
                                    type: this.mechanical_limitation[field][target][ii].y,
                                    dismiss: {
                                        dismissible: true,
                                        duration: 6000,
                                    }
                                })
                                this.setState({
                                    ignore_warnings: update(this.state.ignore_warnings, {$push: [field + "_" + target]})
                                })
                            }
                        }
                        else {
                            await addNotify({
                                id: 'simulation_static_mechanicalProperties_' + field + "_" + target + "_" + ii,
                                message: <span>{this.mechanical_limitation[field][target][ii].t}</span>,
                                type: this.mechanical_limitation[field][target][ii].y,
                                dismiss: {
                                    dismissible: false,
                                    duration: 0,
                                }
                            })
                        }
                    }
                    else {
                        await removeNotify('simulation_static_mechanicalProperties_' + field + "_" + target + "_" + ii)
                    }


                }
            }


        }


    }


    render() {
        return null
    }


}