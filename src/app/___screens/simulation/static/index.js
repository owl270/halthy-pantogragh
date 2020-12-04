import React from "react";
import Aux from "../../../components/_Aux";
import MechanicalProperties from './MechanicalProperties';
import Modeling from "./Modeling";
import SimulationCalculator from "./SimulationCalculator"
import ControlMenu from "./ControlMenu"
import {Scrollbars} from "react-custom-scrollbars";
import * as XLSX from 'xlsx';
import update from "react-addons-update";
import * as actionTypes from "../../../../dataHandler/actions";
import {connect} from "react-redux";
import Api from "../../../../api";
import {addNotify, removeNotify} from "../../../components/PantoNotify";
import mechanical_errors from "./MechanicalProperties/errors";
import ErrorHandler from "./errorHandler";
import {Prompt} from 'react-router-dom';
import DataHandler, {modelingItem} from "./dataHandler";


class Index extends React.Component {


    SECTION_STATUS_COMPLETED = 1
    SECTION_STATUS_NOT_COMPLETED = 0


    constructor(props) {
        super(props);


        this.state = {
            active_modeling: 'span_1',
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
            have_error: false,
            error_list: [],



            is_calculating: false,
            is_data_valid: false,

            control_menu_subVisible: false,
            control_menu_subParent: null,
            control_menu_subContent: '',
            import_xls_from: null
        }


    }




    errorHandler = async (target, val, errors) => {
        if(!val) val = 0
        val = parseFloat(val)


        let hh = []
        let ghu = target.split(",")
        if(ghu.length===3) hh = errors[ghu[0]][ghu[1]][ghu[2]];
        else hh = errors[ghu[0]][ghu[1]];


        target = ghu.join("_")
        // val = parseFloat(val)
        if (hh) {
            //for(let ghi=hh.length;ghi>0;ghi--){
            if(hh[0]) {
                if (!hh[0].v(val)) {
                    await addNotify({
                        id: target + '_' + hh[0].y,
                        message: hh[0].t,
                        type: hh[0].y,
                        dismiss: {
                            dismissible: (hh[0].y === 'warning')
                        }
                    })
                    return false
                } else {
                    await removeNotify(target + '_' + hh[0].y)
                    return true
                }
            } else return true
        }
        else return true
    }



    validation = async (data) => {
        let is_valid = false
        let gh = ''
        let counts_field = 0

        for (const _collection of Object.keys(data)) {
            for (const _target of Object.keys(data[_collection])) {
                if (typeof data[_collection][_target] === "object") {
                    for (const _index of Object.keys(data[_collection][_target])) {
                        counts_field++
                    }
                }
                else{
                    if(_target!=='section_status') counts_field++
                }
            }
        }

        let counter = 0
        let counterOk = 0
        let normalize = {}
        function handler(_collection,_target,_index,_val,is_valid){

            counter++
            if(is_valid){
                if(normalize[_collection]){
                    if(_index){
                        if(normalize[_collection][_target]){
                            normalize[_collection][_target][_index] = {$set: _val}
                        }
                        else{
                            normalize[_collection][_target] = {}
                            normalize[_collection][_target][_index] = {$set: _val}
                        }
                    }
                    else normalize[_collection][_target] = {$set: _val}
                }
                else{
                    normalize[_collection] = {}
                    if(_index){
                        if(normalize[_collection][_target]){
                            normalize[_collection][_target][_index] = {$set: _val}
                        }
                        else{
                            normalize[_collection][_target] = {}
                            normalize[_collection][_target][_index] = {$set: _val}
                        }
                    }
                    else normalize[_collection][_target] = {$set: _val}
                }

                counterOk++
            }
            if(counter===counts_field) {
                if(counterOk===counts_field){
                    normalize[_collection].section_status = {$set: 1}
                    return {ok: true, normalize: {...normalize} }
                }
                else return {ok: false}
            }
            return false
        }


        for (const _collection of Object.keys(data)) {

            for (const _target of Object.keys(data[_collection])) {
                if(typeof data[_collection][_target] === "object") {
                    for (const _index of Object.keys(data[_collection][_target])) {
                        is_valid = await this.errorHandler(_collection + "," + _target + "," + _index, data[_collection][_target][_index], mechanical_errors({...this.state.mechanical_properties, ...{[_collection]: data[_collection]}}))
                        gh = handler(_collection,_target,_index,parseFloat(data[_collection][_target][_index]),is_valid)
                        if(gh) return gh
                    }
                }
                else{
                    is_valid = await this.errorHandler(_collection + "," + _target, data[_collection][_target], mechanical_errors({...this.state.mechanical_properties, ...{[_collection]: data[_collection]}}))
                    gh = handler(_collection,_target,null,typeof (data[_collection][_target]) === "string" ? parseFloat(data[_collection][_target]) : data[_collection][_target],is_valid)
                    if(gh) return gh
                }
            }

        }


    }





    calculation = () => {
        this.setState({is_calculating: true})

        let data = []
        for(let i=0; i<200; i++) data[i] = Array.from({ length: 30 }).fill(0)

        const modeling_data = this.state.modeling_data
        const mechanical_properties = this.state.mechanical_properties

        data[0][15] = mechanical_properties.messenger_wire.tension_per_wire
        data[3][14] = mechanical_properties.messenger_wire.young_modules
        data[0][16] = mechanical_properties.messenger_wire.mass_per_length
        data[0][7] = mechanical_properties.messenger_wire.cross_section

        data[0][11] = mechanical_properties.contact_wire.tension_per_wire
        data[1][14] = mechanical_properties.contact_wire.young_modules
        data[0][12] = mechanical_properties.contact_wire.mass_per_length
        data[0][13] = mechanical_properties.contact_wire.cross_section

        data[2][12] = mechanical_properties.stitch_wire.clamp_mass
        data[3][14] = mechanical_properties.stitch_wire.young_modules
        data[1][12] = mechanical_properties.stitch_wire.mass_per_length
        data[1][13] = mechanical_properties.stitch_wire.cross_section

        data[1][23] = mechanical_properties.steady_arm.length
        data[0][23] = mechanical_properties.steady_arm.mass_per_length
        data[3][23] = mechanical_properties.steady_arm.clamp_mass

        data[0][19] = mechanical_properties.dropper.tension_stiffness
        data[2][22] = mechanical_properties.dropper.messenger_wire_clamp
        data[3][22] = mechanical_properties.dropper.contact_wire_clamp
        data[1][22] = mechanical_properties.dropper.mass_per_length

        data[1][15] = mechanical_properties.messenger_wire_support.stiffness
        data[2][15] = mechanical_properties.messenger_wire_support.damping

        if(mechanical_properties.pantograph.moving_load_activate)
            data[9][7] = mechanical_properties.pantograph.moving_load

        data[0][6] = mechanical_properties.pantograph.m[0]
        data[0][7] = mechanical_properties.pantograph.k[0]
        data[0][8] = mechanical_properties.pantograph.c[0]

        data[1][6] = mechanical_properties.pantograph.m[1]
        data[1][7] = mechanical_properties.pantograph.k[1]
        data[1][8] = mechanical_properties.pantograph.c[1]

        data[2][6] = mechanical_properties.pantograph.m[2]
        data[2][7] = mechanical_properties.pantograph.k[2]
        data[2][8] = mechanical_properties.pantograph.c[2]

        data[10][0] = mechanical_properties.pantograph.uplift_force

        let span_data = {}
        let dropper_counter = 0
        let si = 0
        let span_counts = Object.keys(modeling_data).length
        let last_span = span_counts - 1
        for (const span_id in modeling_data){
            span_data = modeling_data[span_id]

            data[si][2] = span_data.span_length

            //first span
            if(si===0) {
                data[0][5] = span_data.left_mwh
                data[0][6] = span_data.left_cwh

                data[1][1] = span_data.left_mws
                data[0][1] = span_data.left_cws
            }

            data[si+1][5] = span_data.right_mwh
            data[si+1][6] = span_data.right_cwh
            data[(2*(si+1))+1][1] = span_data.right_mws
            data[(2*(si+1))][1] = span_data.right_cws


            if(si!==last_span) {
                data[si][3] = span_data.right_swl
                data[si + 1][11] = span_data.right_swt
            }

            for(let ii=0;ii<span_data.droppers_props.length;ii++){
                data[dropper_counter][18] = span_data.droppers_props[ii].distance
                data[dropper_counter][21] = span_data.droppers_props[ii].presag
                dropper_counter++
            }
            si++
        }


        data = data.map(function(d){
            return d.join();
        }).join('\n');


        Api.requestCalculate({
            data: data,
        }).then((response) => {

            let {ok, result, token, error, description, detail} = response;
            if(ok) {
                this.setState({is_calculating: false})
                // localStorage.setItem('auth_key', token);
                // this.setState({
                //     redirect_to: config.defaultPath
                // });
                alert('okay')
            }
            else {
                alert('nookay')
                this.setState({is_calculating: false})
                // if(error==='VALIDATION_ERROR'){
                //     this.setState({
                //         errors: detail[0].msg
                //     });
                // }
                // else if(error==='LOGIN_FAILED'){
                //     this.setState({
                //         errors: detail
                //     });
                // }
            }

        });

    }


    toggle_control_menu = (objName, content) => {
        let _open_ = true;
        if (this.state.control_menu_subVisible) {
            if (this.state.control_menu_subParent === objName) {
                _open_ = false;
                objName = null;
                content = '';
            }
        }
        this.setState({
            control_menu_subVisible: _open_,
            control_menu_subParent: objName,
            control_menu_subContent: content
        });

    }


    importXlsFile = (event) => {



        console.log(event.target.files[0])

        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const b_str = evt.target.result;
            const wb = XLSX.read(b_str, {type: 'binary', cellStyles: true});
            let ws_name = null, ws = null, data = [], model_data = {}, model_items = {}, mechanicalProperties = {},
                property = '';

            if (this.state.import_xls_from === 'Modeling') {

                for (let ii = 0; ii < wb.SheetNames.length; ii++) {
                    ws_name = wb.SheetNames[ii];
                    ws = wb.Sheets[ws_name];
                    data = XLSX.utils.sheet_to_json(ws);

                    model_data['span_' + (ii + 1)] = {droppers_props: []}
                    model_items['span_' + (ii + 1)] = {id: 'span_' + (ii + 1), title: 'Span ' + (ii + 1), leftColumnActive: false};

                    for (let jr = 0; jr < data.length; jr++) {
                        if (data[jr]['Property']) {

                            // eslint-disable-next-line default-case
                            switch (data[jr]['Property']) {
                                case 'number of droppers':
                                    property = 'droppers_count'
                                    break;
                                case 'span length':
                                    property = 'between_columns'
                                    break;

                                case 'right messenger wire stager':
                                    property = 'rc_mws'
                                    break;
                                case 'right contact wire stager':
                                    property = 'rc_cws'
                                    break;
                                case 'right messenger wire height':
                                    property = 'rc_height'
                                    break;
                                case 'right contact wire height':
                                    property = 'rc_smheight'
                                    break;
                                case 'right stitch wire length':
                                    property = 'rc_width'
                                    break;

                                case 'left messenger wire stager':
                                    property = 'lc_mws'
                                    break;
                                case 'left contact wire stager':
                                    property = 'lc_cws'
                                    break;
                                case 'left messenger wire height':
                                    property = 'lc_height'
                                    break;
                                case 'left contact wire height':
                                    property = 'lc_smheight'
                                    break;
                                case 'left stitch wire length':
                                    property = 'lc_width'
                                    break;
                            }

                            model_data['span_' + (ii + 1)][property] = data[jr]['Value'];
                        }
                        if (data[jr]['Dropper number']) {
                            model_data['span_' + (ii + 1)]['droppers_props'].push({
                                distance: data[jr]['Distance (m)'],
                                presag: data[jr]['Presag (mm)']
                            });
                        }
                    }

                }

                model_items['span_1'].leftColumnActive = true

                console.log(model_data, model_items)
                this.setState({
                    modeling_items: model_items,
                    modeling_data: model_data
                })

            }
            else if (this.state.import_xls_from === 'MechanicalProperties') {

                for (let ii = 0; ii < wb.SheetNames.length; ii++) {
                    ws_name = wb.SheetNames[ii];
                    ws = wb.Sheets[ws_name];
                    data = XLSX.utils.sheet_to_json(ws);

                    // eslint-disable-next-line default-case
                    switch (ws_name) {

                        case "Contact wire":
                            mechanicalProperties['contact_wire'] = {}
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'number of contact wires':
                                        property = 'contact_wire_counts'
                                        break;
                                    case 'tension per wire':
                                        property = 'tension_per_wire'
                                        break;
                                    case 'young\'s modulus':
                                        property = 'young_modules'
                                        break;
                                    case 'mass per length':
                                        property = 'mass_per_length'
                                        break;
                                    case 'cross section':
                                        property = 'cross_section'
                                        break;
                                }
                                mechanicalProperties['contact_wire'][property] = data[jr]['Value']
                            }

                            if (!this.set_mechanical_properties_data({contact_wire: mechanicalProperties['contact_wire']})) {
                                return;
                            }

                            break;
                        case "Messenger wire":
                            mechanicalProperties['messenger_wire'] = {}
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'number of messenger wires':
                                        property = 'messenger_wire_counts'
                                        break;
                                    case 'tension per wire':
                                        property = 'tension_per_wire'
                                        break;
                                    case 'young\'s modulus':
                                        property = 'young_modules'
                                        break;
                                    case 'mass per length':
                                        property = 'mass_per_length'
                                        break;
                                    case 'cross section':
                                        property = 'cross_section'
                                        break;
                                }
                                mechanicalProperties['messenger_wire'][property] = data[jr]['Value']
                            }
                            if (!this.set_mechanical_properties_data({messenger_wire: mechanicalProperties['messenger_wire']})) {
                                return;
                            }
                            break;
                        case "Stitch wire":
                            mechanicalProperties['stitch_wire'] = {}
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'tension per wire':
                                        property = 'tension_per_wire'
                                        break;
                                    case 'young\'s modulus':
                                        property = 'young_modules'
                                        break;
                                    case 'mass per length':
                                        property = 'mass_per_length'
                                        break;
                                    case 'cross section':
                                        property = 'cross_section'
                                        break;
                                }
                                mechanicalProperties['stitch_wire'][property] = data[jr]['Value']
                            }
                            if (!this.set_mechanical_properties_data({stitch_wire: mechanicalProperties['stitch_wire']})) {
                                return;
                            }
                            break;
                        case "Dropper":
                            mechanicalProperties['dropper'] = {}
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'stiffness for tension':
                                        property = 'tension_stiffness'
                                        break;
                                    case 'stiffness for compression':
                                        property = 'compression_stiffness'
                                        break;
                                    case 'clamp on messenger wire':
                                        property = 'messenger_wire_clamp'
                                        break;
                                    case 'clamp on contact wire':
                                        property = 'contact_wire_clamp'
                                        break;
                                    case 'mass per length':
                                        property = 'mass_per_length'
                                        break;
                                }
                                mechanicalProperties['dropper'][property] = data[jr]['Value']
                            }
                            if (!this.set_mechanical_properties_data({dropper: mechanicalProperties['dropper']})) {
                                return;
                            }
                            break;
                        case "Messenger wire support":
                            mechanicalProperties['messenger_wire_support'] = {}
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'stiffness':
                                        property = 'stiffness'
                                        break;
                                    case 'damping':
                                        property = 'damping'
                                        break;
                                }
                                mechanicalProperties['messenger_wire_support'][property] = data[jr]['Value']
                            }
                            if (!this.set_mechanical_properties_data({messenger_wire_support: mechanicalProperties['messenger_wire_support']})) {
                                return;
                            }
                            break;
                        case "Steady arm":
                            mechanicalProperties['steady_arm'] = {}
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'number of steady arms per support':
                                        property = 'steady_arm_count'
                                        break;
                                    case 'length':
                                        property = 'length'
                                        break;
                                    case 'mass per length':
                                        property = 'mass_per_length'
                                        break;
                                    case 'mass of clamp':
                                        property = 'clamp_mass'
                                        break;
                                }
                                mechanicalProperties['steady_arm'][property] = data[jr]['Value']
                            }
                            if (!this.set_mechanical_properties_data({steady_arm: mechanicalProperties['steady_arm']})) {
                                return;
                            }
                            break;
                        case "Pantograph":
                            mechanicalProperties['pantograph'] = {}
                            mechanicalProperties['pantograph']['m'] = [];
                            mechanicalProperties['pantograph']['k'] = [];
                            mechanicalProperties['pantograph']['c'] = [];
                            for (let jr = 0; jr < data.length; jr++) {
                                // eslint-disable-next-line default-case
                                switch (data[jr]['Property']) {
                                    case 'dynamic mass (M1)':
                                        property = 'm'
                                        break;
                                    case 'dynamic mass (M2)':
                                        property = 'm'
                                        break;
                                    case 'dynamic mass (M3)':
                                        property = 'm'
                                        break;

                                    case 'stiffness (K1)':
                                        property = 'k'
                                        break;
                                    case 'stiffness (K2)':
                                        property = 'k'
                                        break;
                                    case 'stiffness (K3)':
                                        property = 'k'
                                        break;

                                    case 'damping (C1)':
                                        property = 'c'
                                        break;
                                    case 'damping (C2)':
                                        property = 'c'
                                        break;
                                    case 'damping (C3)':
                                        property = 'c'
                                        break;

                                }
                                mechanicalProperties['pantograph'][property].push(data[jr]['Value']);
                            }
                            if (!this.set_mechanical_properties_data({pantograph: mechanicalProperties['pantograph']})) {
                                return;
                            }
                            break;

                    }

                }


            }

        };

        reader.readAsBinaryString(event.target.files[0]);

    }


    exportXlsFile = (from) => {
        let wb = null, data = null, ws = null;
        if (from === 'Modeling') {
            const exported_data = this.state.modeling_data;
            const exported_items = this.state.modeling_items;

            wb = XLSX.utils.book_new();


            let keyM = Object.keys(exported_data);
            for (let ghf = 0; ghf < keyM.length; ghf++) {
                data = [
                    {
                        'Property': 'number of droppers',
                        'Value': exported_data[keyM[ghf]].droppers_count,
                        'Unit': "-"
                    },
                    {
                        'Property': 'span length',
                        'Value': exported_data[keyM[ghf]].between_columns,
                        'Unit': "m"
                    },
                    {
                        'Property': 'right messenger wire stager',
                        'Value': exported_data[keyM[ghf]].rc_mws,
                        'Unit': "m"
                    },
                    {
                        'Property': 'right contact wire stager',
                        'Value': exported_data[keyM[ghf]].rc_cws,
                        'Unit': "m"
                    },
                    {
                        'Property': 'right messenger wire height',
                        'Value': exported_data[keyM[ghf]].rc_height,
                        'Unit': "m"
                    },
                    {
                        'Property': 'right contact wire height',
                        'Value': exported_data[keyM[ghf]].rc_smheight,
                        'Unit': "m"
                    },
                    {
                        'Property': 'right stitch wire length',
                        'Value': exported_data[keyM[ghf]].rc_width,
                        'Unit': "m"
                    }
                ]

                if (exported_items[keyM[ghf]].leftColumnActive) {
                    data.push(
                        {
                            'Property': 'left messenger wire stager',
                            'Value': exported_data[keyM[ghf]].lc_mws,
                            'Unit': "m"
                        },
                        {
                            'Property': 'left contact wire stager',
                            'Value': exported_data[keyM[ghf]].lc_cws,
                            'Unit': "m"
                        },
                        {
                            'Property': 'left messenger wire height',
                            'Value': exported_data[keyM[ghf]].lc_height,
                            'Unit': "m"
                        },
                        {
                            'Property': 'left contact wire height',
                            'Value': exported_data[keyM[ghf]].lc_smheight,
                            'Unit': "m"
                        },
                        {
                            'Property': 'left stitch wire length',
                            'Value': exported_data[keyM[ghf]].lc_width,
                            'Unit': "m"
                        }
                    )
                }


                for (let tt = 0; tt < exported_data[keyM[ghf]].droppers_count; tt++) {
                    data[tt]['Dropper number'] = tt + 1
                    data[tt]['Distance (m)'] = exported_data[keyM[ghf]].droppers_props[tt].distance
                    data[tt]['Presag (mm)'] = exported_data[keyM[ghf]].droppers_props[tt].presag
                }


                ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit', '', 'Dropper number', 'Distance (m)', 'Presag (mm)']});
                XLSX.utils.book_append_sheet(wb, ws, exported_items[keyM[ghf]].title);
            }

            let now = new Date();
            let options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
            };
            let TT = new Intl.DateTimeFormat('default', options)
            const [{value: mo}, , {value: da}, , {value: ye}, , {value: ho}, , {value: mi}, , {value: se}] = TT.formatToParts(now)
            const TimeNow = ye + mo + da + "_" + ho + mi + se
            XLSX.writeFile(wb, "PantoHealth_ModelingExport_" + TimeNow + ".xlsx");

        } else if (from === 'MechanicalProperties') {
            const exported_data = this.state.mechanical_properties;
            wb = XLSX.utils.book_new();


            data = [
                {
                    'Property': 'number of contact wires',
                    'Value': exported_data.contact_wire.contact_wire_counts,
                    'Unit': "-"
                },
                {
                    'Property': 'tension per wire',
                    'Value': exported_data.contact_wire.tension_per_wire,
                    'Unit': "N"
                },
                {
                    'Property': 'young\'s modulus',
                    'Value': exported_data.contact_wire.young_modules,
                    'Unit': "kN/mm2"
                },
                {
                    'Property': 'mass per length',
                    'Value': exported_data.contact_wire.mass_per_length,
                    'Unit': "kg/m"
                },
                {
                    'Property': 'cross section',
                    'Value': exported_data.contact_wire.cross_section,
                    'Unit': "mm2"
                }
            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Contact wire");

            data = [
                {
                    'Property': 'number of messenger wires',
                    'Value': exported_data.messenger_wire.messenger_wire_counts,
                    'Unit': "-"
                },
                {
                    'Property': 'tension per wire',
                    'Value': exported_data.messenger_wire.tension_per_wire,
                    'Unit': "N"
                },
                {
                    'Property': 'young\'s modulus',
                    'Value': exported_data.messenger_wire.young_modules,
                    'Unit': "kN/mm2"
                },
                {
                    'Property': 'mass per length',
                    'Value': exported_data.messenger_wire.mass_per_length,
                    'Unit': "kg/m"
                },
                {
                    'Property': 'cross section',
                    'Value': exported_data.messenger_wire.cross_section,
                    'Unit': "mm2"
                }
            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Messenger wire");

            data = [
                {
                    'Property': 'tension per wire',
                    'Value': exported_data.stitch_wire.tension_per_wire,
                    'Unit': "N"
                },
                {
                    'Property': 'young\'s modulus',
                    'Value': exported_data.stitch_wire.young_modules,
                    'Unit': "kN/mm2"
                },
                {
                    'Property': 'mass per length',
                    'Value': exported_data.stitch_wire.mass_per_length,
                    'Unit': "kg/m"
                },
                {
                    'Property': 'cross section',
                    'Value': exported_data.stitch_wire.cross_section,
                    'Unit': "mm2"
                }
            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Stitch wire");

            data = [
                {
                    'Property': 'stiffness for tension',
                    'Value': exported_data.dropper.tension_stiffness,
                    'Unit': "N/m"
                },
                {
                    'Property': 'stiffness for compression',
                    'Value': exported_data.dropper.compression_stiffness,
                    'Unit': "N/m"
                },
                {
                    'Property': 'clamp on messenger wire',
                    'Value': exported_data.dropper.messenger_wire_clamp,
                    'Unit': "kg"
                },
                {
                    'Property': 'clamp on contact wire',
                    'Value': exported_data.dropper.contact_wire_clamp,
                    'Unit': "kg"
                },
                {
                    'Property': 'mass per length',
                    'Value': exported_data.dropper.mass_per_length,
                    'Unit': "kg/m"
                },
            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Dropper");

            data = [
                {
                    'Property': 'stiffness',
                    'Value': exported_data.messenger_wire_support.stiffness,
                    'Unit': "kN/m"
                },
                {
                    'Property': 'damping',
                    'Value': exported_data.messenger_wire_support.damping,
                    'Unit': "kN/m"
                }
            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Messenger wire support");

            data = [
                {
                    'Property': 'number of steady arms per support',
                    'Value': exported_data.steady_arm.steady_arm_count,
                    'Unit': "-"
                },
                {
                    'Property': 'length',
                    'Value': exported_data.steady_arm.length,
                    'Unit': "m"
                },
                {
                    'Property': 'mass per length',
                    'Value': exported_data.steady_arm.mass_per_length,
                    'Unit': "kg/m"
                },
                {
                    'Property': 'mass of clamp',
                    'Value': exported_data.steady_arm.clamp_mass,
                    'Unit': "kg"
                }
            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Steady arm");

            data = [

                {
                    'Property': 'dynamic mass (M1)',
                    'Value': exported_data.pantograph.m[0],
                    'Unit': "kg"
                },
                {
                    'Property': 'dynamic mass (M2)',
                    'Value': exported_data.pantograph.m[1],
                    'Unit': "kg"
                },
                {
                    'Property': 'dynamic mass (M3)',
                    'Value': exported_data.pantograph.m[2],
                    'Unit': "kg"
                },
                {
                    'Property': 'stiffness (K1)',
                    'Value': exported_data.pantograph.k[0],
                    'Unit': "N/m"
                },
                {
                    'Property': 'stiffness (K2)',
                    'Value': exported_data.pantograph.k[1],
                    'Unit': "N/m"
                },
                {
                    'Property': 'stiffness (K3)',
                    'Value': exported_data.pantograph.k[2],
                    'Unit': "N/m"
                },
                {
                    'Property': 'damping (C1)',
                    'Value': exported_data.pantograph.c[0],
                    'Unit': "Ns/m"
                },
                {
                    'Property': 'damping (C2)',
                    'Value': exported_data.pantograph.c[1],
                    'Unit': "Ns/m"
                },
                {
                    'Property': 'damping (C3)',
                    'Value': exported_data.pantograph.c[2],
                    'Unit': "Ns/m"
                }

            ]
            ws = XLSX.utils.json_to_sheet(data, {header: ['Property', 'Value', 'Unit']});
            XLSX.utils.book_append_sheet(wb, ws, "Pantograph");


            let now = new Date();
            let options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
            };
            let TT = new Intl.DateTimeFormat('default', options)
            const [{value: mo}, , {value: da}, , {value: ye}, , {value: ho}, , {value: mi}, , {value: se}] = TT.formatToParts(now)
            const TimeNow = ye + mo + da + "_" + ho + mi + se
            XLSX.writeFile(wb, "PantoHealth_MechanicalPropertiesExport_" + TimeNow + ".xlsx");

        }

    }


    save = () => {
        alert('save');
    }

    load = () => {
        const loadSubItems = [
            {
                title: 'Rasoul',
                onClick: () => {
                    alert('Modeling')
                }
            },
            {
                title: 'R707',
                onClick: () => {
                    alert('Mechanical Properties')
                }
            },
            {
                title: 'Rasfdhfoul',
                onClick: () => {
                    alert('Modeling')
                }
            },
            {
                title: 'Rfjfj707',
                onClick: () => {
                    alert('Mechanical Properties')
                }
            },
            {
                title: 'Rasfjfoul',
                onClick: () => {
                    alert('Modeling')
                }
            },
            {
                title: 'R7ttttt07',
                onClick: () => {
                    alert('Mechanical Properties')
                }
            }
        ]

        const loadSub = loadSubItems.map((item) => {
            return <li onClick={item.onClick}>{item.title}</li>
        })

        this.toggle_control_menu('export', [<h6>Load</h6>,
            <Scrollbars
                autoHide>
                <ul>{loadSub}</ul>
            </Scrollbars>
        ]);
    }

    import = () => {
        const importSubItems = [
            {
                title: 'Modeling',
                onClick: () => {
                    this.setState({import_xls_from: 'Modeling'})
                    this.refs.import_xls_file.click();
                }
            },
            {
                title: 'Mechanical Properties',
                onClick: () => {
                    this.setState({import_xls_from: 'MechanicalProperties'})
                    this.refs.import_xls_file.click();
                }
            }
        ]

        const importSub = importSubItems.map((item) => {
            return <li onClick={item.onClick}>{item.title}</li>
        })

        this.toggle_control_menu('import', [<h6>Import</h6>, <ul>{importSub}</ul>]);
    }

    export = () => {
        const exportSubItems = [
            {
                title: 'Modeling',
                onClick: () => {
                    this.exportXlsFile('Modeling')
                }
            },
            {
                title: 'Mechanical Properties',
                onClick: () => {
                    this.exportXlsFile('MechanicalProperties')
                }
            }
        ]

        const exportSub = exportSubItems.map((item) => {
            return <li onClick={item.onClick}>{item.title}</li>
        })

        this.toggle_control_menu('export', [<h6>Export</h6>, <ul>{exportSub}</ul>]);
    }

    savePdf = () => {
        alert('savePdf');
    }




    render() {




        return (

            <Aux>

                <DataHandler load={()=>{
                    //alert(modelingItem())
                }}/>

                <ErrorHandler
                    mi={this.state.modeling_items}
                    md={this.state.modeling_data}
                    mc={this.state.mechanical_properties}
                    set_error={(err_id)=>{
                        console.log(err_id)
                    }}
                    />
                {/*    set_error={(err_id)=>{*/}
                {/*        // if(!this.state.error_list.includes(err_id)) {*/}
                {/*        //     this.setState({*/}
                {/*        //         error_list: update(this.state.error_list, {$push: [err_id]}),*/}
                {/*        //         have_error: true*/}
                {/*        //     })*/}
                {/*        // }*/}
                {/*        // else{*/}
                {/*        //     this.setState({*/}
                {/*        //         error_list: this.state.error_list.Filter(function (value) {*/}
                {/*        //             return value !== err_id*/}
                {/*        //         })*/}
                {/*        //     }, ()=>{*/}
                {/*        //         if(!this.state.error_list){*/}
                {/*        //             this.setState({*/}
                {/*        //                 have_error: false*/}
                {/*        //             })*/}
                {/*        //         }*/}
                {/*        //     });*/}
                {/*        // }*/}
                {/*        //*/}
                {/*    }}*/}

                {/*/>*/}



                {/*<Prompt*/}
                {/*    when={true}*/}
                {/*    message={(location) => "Changes will disappear. Are you sure to leave?"}*/}
                {/*/>*/}


                {/*<input type="file" ref="import_xls_file" accept=".xls,.xlsx" style={{display: "none"}}*/}
                {/*       onChange={this.importXlsFile}/>*/}

                <div className={'panto-row'}>

                    <div className={'panto-col modeling'}>
                        <Modeling/>
                    </div>

                    <div className={'panto-col mechanical-properties'}>
                        <MechanicalProperties/>
                    </div>

                </div>

                <div className={'panto-row'}>

                    <div className={'panto-col simulation-calculator'}>

                        <SimulationCalculator
                            items={this.state.modeling_items}
                            data={this.state.modeling_data}
                            active_item={this.state.active_modeling}
                            calculation={this.calculation}
                            validating={this.state.is_data_valid}
                            calculating={this.state.is_calculating}
                        />

                    </div>

                    <div className={'panto-col control-menu'}>

                        <ControlMenu
                            items={[
                                {
                                    title: 'Save',
                                    onClick: this.save
                                },
                                {
                                    title: 'Load',
                                    hasSub: true,
                                    onClick: this.load
                                },
                                {
                                    title: 'Import',
                                    hasSub: true,
                                    onClick: this.import
                                },
                                {
                                    title: 'Export',
                                    hasSub: true,
                                    onClick: this.export
                                },
                                {
                                    title: 'Save PDF Report',
                                    onClick: this.savePdf
                                }
                            ]}
                            subVisible={this.state.control_menu_subVisible}
                            subContent={this.state.control_menu_subContent}
                        />


                        {/*<PantoModal*/}
                        {/*    visible={true}*/}
                        {/*    // dismiss={}*/}
                        {/*    name={'saving'}*/}
                        {/*    header={'Save?'}>*/}

                        {/*    <div className={'mechanical-properties-modal-body'}>*/}

                        {/*        <div className={'input-group'}>*/}
                        {/*            <label>Enter a name: </label>*/}
                        {/*            <input name={'save_name'}/>*/}
                        {/*        </div>*/}

                        {/*        <div className={'button-group'}>*/}
                        {/*            <button className={'cancel-btn'}>Cancel</button>*/}
                        {/*            <button>OK</button>*/}
                        {/*        </div>*/}

                        {/*    </div>*/}

                        {/*</PantoModal>*/}


                        {/*<PantoModal*/}
                        {/*    visible={true}*/}
                        {/*    // dismiss={}*/}
                        {/*    name={'load'}*/}
                        {/*    header={'Load ?'}>*/}

                        {/*    <div className={'mechanical-properties-modal-body'}>*/}

                        {/*        /!*<div className={'input-group'}>*!/*/}
                        {/*        /!*    <label>Enter a name: </label>*!/*/}
                        {/*        /!*    <input name={'save_name'}/>*!/*/}
                        {/*        /!*</div>*!/*/}

                        {/*        <div className={'button-group'}>*/}
                        {/*            <button className={'cancel-btn'}>No</button>*/}
                        {/*            <button>Yes</button>*/}
                        {/*        </div>*/}

                        {/*    </div>*/}

                        {/*</PantoModal>*/}


                    </div>

                </div>

            </Aux>
        )
    }

}


const mapStateToProps = state => {
    return {
        // notification: state.notification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onNotification: (notification) => dispatch({type: actionTypes.NOTIFICATION, notification: notification}),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);