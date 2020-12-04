import React from "react";


export default function errors($data){

    const data = $data['mechanical_properties']
    return {
        messenger_wire: {
            messenger_wire_counts: [
                {
                    v: (val) => {return (val===1)},
                    t: <span>The number of messenger wire can only be 1</span>,
                    y: 'error'
                }
            ],
            tension_per_wire: [
                {
                    v: (val) => {return (val >= 800 && val <= 50000)},
                    t: <span>This linear analytical simulation is not suitable for extremely high tension or supper low tension cables</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 13000 && val <= 24000)},
                    t: <span>The tension in messenger wire is 13-24kN normally</span>,
                    y: 'warning'
                }
            ],
            young_modules: [
                {
                    v: (val) => {return (val >= 50 && val <= 300)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 90 && val <= 120)},
                    t: <span>The Youngs module in messenger wire is 90-120 kN/mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {return (val >= 0.4 && val <= 3)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.8 && val <= 1.1)},
                    t: <span>The mass per unit length of this cable is 0.8-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            cross_section: [
                {
                    v: (val) => {return (val >= 50 && val <= 250)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 80 && val <= 120)},
                    t: <span>The cross section of this cable is 80-120 mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
        },
        contact_wire: {
            contact_wire_counts: [
                {
                    v: (val) => {return (val === 1)},
                    t: <span>The number of contact wire can only be 1</span>,
                    y: 'error'
                }
            ],
            tension_per_wire: [
                {
                    v: (val) => {return (val >= 800 && val <= 50000)},
                    t: <span>This linear analytical simulation is not suitable for extremely high tension or supper low tension cables</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 13000 && val <= 24000)},
                    t: <span>the tension in contact wire is 13-24kN normally</span>,
                    y: 'warning'
                }
            ],
            young_modules: [
                {
                    v: (val) => {return (val >= 50 && val <= 300)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 90 && val <= 120)},
                    t: <span>The Youngs module in contact wire is 90-120 kN/mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {return (val >= 0.4 && val <= 3)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.8 && val <= 1.1)},
                    t: <span>The mass per unit length of this cable is 0.8-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            cross_section: [
                {
                    v: (val) => {return (val >= 50 && val <= 250)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >=80 && val <= 130)},
                    t: <span>The cross section of this cable is 80-130 mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
        },
        stitch_wire: {
            clamp_mass: [
                {
                    v: (val) => {return (val >= 0 && val <= 5)},
                    t: <span>The weight of clamp can not be less than zero or more that 5kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.2 && val <= 0.5)},
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
            young_modules: [
                {
                    v: (val) => {return (val >= 50 && val <= 300)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 90 && val <= 120)},
                    t: <span>The Youngs module in stitch wire is 90-120 kN/mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {return (val >= 0.4 && val <= 3)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.8 && val <= 1.1)},
                    t: <span>The mass per unit length of this cable is 0.8-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            cross_section: [
                {
                    v: (val) => {return (val >= 10 && val <= 100)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 30 && val <= 40)},
                    t: <span>The cross section of this cable is 30-40 mm<sup>2</sup> normally</span>,
                    y: 'warning'
                }
            ],
        },
        steady_arm: {
            steady_arm_count: [
                {
                    v: (val) => {return (val === 1)},
                    t: <span>The number of steady arms can only be 1</span>,
                    y: 'error'
                }
            ],
            length: [
                {
                    v: (val) => {return (val >= 0 && val <= 10)},
                    t: <span>The length of steady arm can not be less than zero or more that 10m</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.8 && val <= 1.5)},
                    t: <span>The steady arm is so short or too long, check the technical data</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {return (val >= 0 && val <= 5)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.6 && val <= 1.1)},
                    t: <span>the mass per unit length of steady arm is 0.6-1.1 kg/m normally</span>,
                    y: 'warning'
                }
            ],
            clamp_mass: [
                {
                    v: (val) => {return (val >= 0 && val <= 5)},
                    t: <span>The weight of clamp can not be less than zero or more that 5kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.2 && val <= 0.6)},
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
        },
        dropper: {
            tension_stiffness: [
                {
                    v: (val) => {return (val >= 0 && val <= 500000)},
                    t: <span>The dropper stiffness in tension can not be less than zero or more than 500kN/m  </span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 10000 && val <= 500000)},
                    t: <span>The dropper stiffness is normally 100kN/m in tension, check the technical data</span>,
                    y: 'warning'
                }
            ],
            // compression_stiffness: [],
            messenger_wire_clamp: [
                {
                    v: (val) => {return (val >= 0 && val <= 3)},
                    t: <span>The weight of clamp can not be less than zero or more that 3kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.1 && val <= 0.2)},
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
            contact_wire_clamp: [
                {
                    v: (val) => {return (val >= 0 && val <= 3)},
                    t: <span>The weight of clamp can not be less than zero or more that 3kg</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.1 && val <= 0.2)},
                    t: <span>The clamp is so light or too heavy, check the technical data</span>,
                    y: 'warning'
                }
            ],
            mass_per_length: [
                {
                    v: (val) => {return (val >= 0 && val <= 3)},
                    t: <span>The value is not valid, check the technical data of the cable</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (val >= 0.07 && val <= 0.2)},
                    t: <span>The mass per unit length of dropper is 0.07-0.2 kg/m normally</span>,
                    y: 'warning'
                }
            ],
        },
        messenger_wire_support: {
            stiffness: [
                {
                    v: (val) => {return (data.messenger_wire_support.fix_status || (val >= 0 && val <= 1000000))},
                    t: <span>The stiffness of the support can not be less than 0 or more than 1000000, if the support is rigid, please check the bottom above</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (data.messenger_wire_support.fix_status || (val >= 10000 && val <= 800000))},
                    t: <span>The stiffness of the support is either low or high</span>,
                    y: 'warning'
                }
            ],
            damping: [
                {
                    v: (val) => {return (data.messenger_wire_support.fix_status || (val >= 0 && val <= 10000))},
                    t: <span>The damping of the support can not be less than 0 or more than 10000, if the support is rigid, please check the bottom above</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (data.messenger_wire_support.fix_status || (val >= 10 && val <= 5000))},
                    t: <span>The damping of the support is either low or high</span>,
                    y: 'warning'
                }
            ]
        },
        pantograph: {
            moving_load: [
                {
                    v: (val) => {return (!data.pantograph.moving_load_activate || (val >= -1000 && val <= 1000))},
                    t: <span>The value of the load should be within -1000 to 1000 N</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return (!data.pantograph.moving_load_activate || (val >= 10 && val <= 200))},
                    t: <span>the value of the moving load is either so low or too high</span>,
                    y: 'warning'
                }
            ],
            m: [
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 50)},
                        t: <span>The mass of collector head can not be less than zero or more than 50kg</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 3 && val <= 20)},
                        t: <span>The collector head is either so heavy or light, check the technical data</span>,
                        y: 'warning'
                    }
                ],
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 50)},
                        t: <span>The mass of intermediate mass can not be less than zero or more than 50kg</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 3 && val <= 20)},
                        t: <span>The intermediate mass is either so heavy or light, check the technical data</span>,
                        y: 'warning'
                    }
                ],
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 50)},
                        t: <span>The mass of lower mass can not be less than zero or more than 50kg</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 3 && val <= 20)},
                        t: <span>The lower mass is either so heavy or light, check the technical data</span>,
                        y: 'warning'
                    }
                ]
            ],
            c: [
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 100)},
                        t: <span>The damping of collector head can not be less than zero or more than 100 Ns/m</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 10 && val <= 60)},
                        t: <span>The damping of the collector head is out of normal range (10-60 Ns/m)</span>,
                        y: 'warning'
                    }
                ],
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 10)},
                        t: <span>The damping of intermediate mass can not be less than zero or more than 10 Ns/m</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 1)},
                        t: <span>The damping of the intermediate mass is out of normal range (0-1 Ns/m)</span>,
                        y: 'warning'
                    }
                ],
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 1000)},
                        t: <span>The damping of lower mass can not be less than zero or more than 1000 Ns/m</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return !data.pantograph.moving_load_activate || (val >= 0 && val <= 300)},
                        t: <span>The damping of the lower mass is out of normal range (0-300 Ns/m)</span>,
                        y: 'warning'
                    }
                ]
            ],
            k: [
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 100000)},
                        t: <span>The stiffness of collector head can not be less than zero or more than 100000 N/m</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 1000 && val <= 10000)},
                        t: <span>The stiffness of the collector head is out of normal range (1000-10000 N/m)</span>,
                        y: 'warning'
                    }
                ],
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 100000)},
                        t: <span>The stiffness of intermediate mass can not be less than zero or more than 100000 N/m</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 5000 && val <= 20000)},
                        t: <span>The stiffness of the intermediate mass is out of normal range (5000-20000 N/m)</span>,
                        y: 'warning'
                    }
                ],
                [
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 1000)},
                        t: <span>The stiffness of lower mass can not be less than zero or more than 1000 N/m</span>,
                        y: 'error'
                    },
                    {
                        v: (val) => {return data.pantograph.moving_load_activate || (val >= 0.5 && val <= 300)},
                        t: <span>The stiffness of the lower mass is out of normal range (0.5-300 N/m)</span>,
                        y: 'warning'
                    }
                ]
            ],
            uplift_force: [
                {
                    v: (val) => {return data.pantograph.moving_load_activate || (val >= 0 && val <= 1000)},
                    t: <span>The uplift force can not be less than zero or more than 1000 N</span>,
                    y: 'error'
                },
                {
                    v: (val) => {return data.pantograph.moving_load_activate || (val >= 80 && val <= 120)},
                    t: <span>The Uplift force is normally 80-120 N</span>,
                    y: 'warning'
                }
            ],
        },
    }

}
