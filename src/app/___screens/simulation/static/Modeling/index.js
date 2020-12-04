import Index from "../../../../components/PantoTabNav";
import React, {Component} from "react";
import ModelingShape from "./content";
import update from 'react-addons-update';
import ClickOutHandler from "react-onclickout"
import {addNotify, removeGroupNotify} from "../../../../components/PantoNotify";
import DataHandler, {
    modelingItem,
    modelingData,
    activeSpan,
    navigateSpan,
    setModelingItem,
    setModelingData
} from "../dataHandler";


class Modeling extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            can_add_new_span: true,
            new_span_add_menu_visible: false
        }
    }


    create_new_span = (type) => {

        let allow_create = true
        for (const _id of Object.keys(modelingItem())) {
            if (modelingItem(_id).type === 'END_SPAN') {
                allow_create = false
                return addNotify({
                    id: "simulation_static_modeling_cantAddTwoEndSpan",
                    message: "Can not add two end span",
                    type: 'error',
                    dismiss: {
                        dismissible: true,
                        duration: 3000,
                    }
                })
            }
        }

        if (!allow_create) return false

        let _length = Object.keys(modelingItem()).length + 1;

        const last_span_data = modelingData("span_" + (_length - 1))

        let span_data = {
            right_mws: Math.pow(-1, _length) * 0.25,
            right_cws: Math.pow(-1, _length) * 0.25,
            right_mwh: 6.85,
            right_cwh: 5.08,

            right_swl: 18,
            right_swt: 3500,

            left_mws: last_span_data.right_mws,
            left_cws: last_span_data.right_cws,
            left_mwh: last_span_data.right_mwh,
            left_cwh: last_span_data.right_cwh,

            left_swt: last_span_data.right_swt,
            left_swl: last_span_data.right_swl,

            span_length: 60,
            droppers_props: []
        }

        if (type === 'END_SPAN') {
            span_data.right_mws = 0.65
            span_data.right_cws = 0.65
            span_data.right_mwh = 7
            span_data.right_cwh = 6.35
            span_data.right_swl = 0
            span_data.right_swt = 0
        }

        let span_obj = {
            id: "span_" + _length,
            title: "Span " + _length,
            type: type
        };

        setModelingItem(update(modelingItem(), {[span_obj.id]: {$set: span_obj}}))
        setModelingData(update(modelingData(), {[span_obj.id]: {$set: span_data}}))
        this.navigate_span(span_obj.id)

        this.setState({new_span_add_menu_visible: false, can_add_new_span: (type !== 'END_SPAN')})
    }

    remove_span = (_id) => {
        let number_id = _id.replace("span_", "")
        let before = number_id - 1

        if (Object.keys(modelingItem()).length === 1) {
            addNotify({
                id: 'simulation_static_modeling_cantDeleteSpan',
                message: "Can not be deleted",
                type: 'error',
                dismiss: {
                    dismissible: true,
                    duration: 3000,
                }
            })
        }
        else if (modelingItem(_id).type === 'FIRST_SPAN') {
            addNotify({
                id: "simulation_static_modeling_cantDeleteFirstSpan",
                message: "Can not be deleted first span",
                type: 'error',
                dismiss: {
                    dismissible: true,
                    duration: 3000,
                }
            })
        }
        else {
            if (before) this.navigate_span("span_" + before)
            else this.navigate_span("span_" + number_id)

            let gh = modelingItem();
            let dgh = modelingData();

            let thhid = '', thhval = {}, thvaldata = {}
            for (let span_id in gh) {
                thhid = span_id.replace("span_", "")
                if (thhid > number_id) {
                    thhval = gh[span_id]
                    thvaldata = dgh[span_id]
                    thhval.id = "span_" + (thhid - 1)
                    thhval.title = "Span " + (thhid - 1)
                    gh["span_" + (thhid - 1)] = thhval
                    dgh["span_" + (thhid - 1)] = thvaldata;
                }
            }
            delete gh["span_" + (thhid)]
            delete dgh["span_" + (thhid)]
            //errors
            removeGroupNotify(['simulation', 'static', 'modeling', 'span', number_id])

            this.setState({can_add_new_span: true})
        }

    }

    navigate_span = (active_id) => {
        navigateSpan(active_id)
        let _index = parseInt(active_id.replace("span_",""))
        let to = (_index-3) * 93
        document.querySelector("#panto_tab_modeling_navigations ul ._scrollbar-container").scroll({left: to, behavior: 'smooth'})
    }


    render() {

        this.items = [];

        if (!this.state.loading) {
            for (const _id of Object.keys(modelingItem())) {
                let item = modelingItem(_id);
                this.items.push({
                    id: _id,
                    title: item.title,
                    content: <ModelingShape
                        id={_id}
                        type={item.type}
                        name={item.title}
                    />
                });
            }

            if (this.state.can_add_new_span && Object.keys(modelingItem()).length < 15 && modelingItem()[Object.keys(modelingItem())[Object.keys(modelingItem()).length - 1]].type !== 'END_SPAN') {

                let __tab = <li className={'add_span' + (this.state.new_span_add_menu_visible ? ' expand' : '')}>
                    <ul>
                        <ClickOutHandler
                            onClickOut={() => {
                                this.setState({new_span_add_menu_visible: false})
                            }}>
                            <li className={'plus'}
                                onClick={() => {
                                    if (Object.keys(modelingItem()).length >= 14) {
                                        this.create_new_span('END_SPAN')
                                    } else {
                                        this.setState({new_span_add_menu_visible: !this.state.new_span_add_menu_visible})
                                        let gg = document.querySelector("#panto_tab_modeling_navigations ul ._scrollbar-container").scrollWidth
                                        document.querySelector("#panto_tab_modeling_navigations ul ._scrollbar-container").scroll({
                                            left: gg,
                                            behavior: 'smooth'
                                        })
                                    }
                                }}
                            >+
                            </li>
                        </ClickOutHandler>
                        <li onClick={() => {
                            this.create_new_span('SPAN')
                        }}>new span
                        </li>
                        <li onClick={() => {
                            this.create_new_span('END_SPAN')
                        }}>end span
                        </li>
                    </ul>
                </li>

                this.items.push({
                    id: 'add_span',
                    custom: true,
                    tab: __tab,
                });


            }
        }


        return ([

            <Index
                id={'modeling'}
                loading={this.state.loading}
                items={this.items}
                active_tab={activeSpan()}
                navigate_tab={this.navigate_span}
                close_tabs={true}
                dismiss={this.remove_span}
            />,

            <DataHandler load={() => {
                this.setState({
                    loading: false
                })
            }}/>
        ])
    }

}


export default Modeling;
