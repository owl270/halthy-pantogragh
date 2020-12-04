import * as React from "react";
import PantoTabNav from "../../../../../components/PantoTabNav";
import * as actions from "../../_DataHandler/_actions";
import {connect} from "react-redux";
import PantoCard from "../../../../../components/PantoCard";
import {AddSpan, TabSpan} from "./Tab";
import ModelingContent from "./ModelingContent";


class Index extends React.Component {


    constructor(props) {
        super(props);

        this.navigate_tab = this.navigate_tab.bind(this)
        this.delete_span = this.delete_span.bind(this)
        this.add_span = this.add_span.bind(this)
    }

    componentDidMount() {
        console.log(this.props.project)
        this.add_span('normal')
    }


    navigate_tab(tab) {
        this.props.setActiveStaticModelingTab(tab)
    }

    delete_span(id) {
        if (id === 0) {
            this.props.addNotification({
                id: 'cant-delete-span',
                children: "You can not delete :(",
                type: "error",
                duration: 3000
            })
            return;
        }
        this.props.removeProjectStaticModelingSpan(id)
    }

    add_span(type) {
        // if(this.props.project.static_modeling.length > 14)
        this.props.addProjectStaticModelingSpan({
            type,

            // span geometry
            ecbr_mc: 7,
            ecbr_cw: 6.5,
            spans: 80,
            n_dropper_span: 9,
            zig_zag: 40,
            zig_zag_messenger: 40,
            l_st: 18,
            t_st: 3.5,

            // messenger cable
            t_mc: 21,
            e_mc: 110,
            roa_mc: 1.06,
            a_mc: 117,

            // contact wire
            t_cw: 21,
            e_cw: 110,
            roa_cw: 1.06,
            a_cw: 120,

            // stitch wire
            mass_clamp_st18: 0.38,
            e_st: 110,
            roa_st: 1.06,
            a_st: 35,

            // steady arm
            length_stager: 1.15,
            mass_stager: 0.78,
            mass_clamp_stager: 0.46,

            // dropper




            pp: this.props.project.static_modeling.length
        })
    }

    render() {

        const $active_tab = this.props.static_modeling_active_tab
        const modeling = this.props.project.static_modeling

        let items = []
        let modelingClosed = false
        for (let i = 0; i < modeling.length; i++) {
            items.push({
                id: i,
                tab: <TabSpan
                    name={"Span " + (i + 1)}
                    dismiss={
                        $active_tab === i
                            ? () => {
                                this.delete_span(i)
                            }
                            : null
                    }
                />,
                content: <>
                    <ModelingContent
                        id={i}
                        data={modeling[i]}
                        set={(label, value) => {
                            this.props.setProjectStaticModelingValues(i, label, value)
                        }}
                    />
                </>
            })
            if (modeling[i].type === 'end') modelingClosed = true
        }

        if (items.length > 0 && !modelingClosed) {
            items.push({
                id: 'add-span',
                tab: <AddSpan adder={this.add_span}/>,
                content: null
            })
        }

        if (items.length > 0) {
            return <>
                <PantoTabNav
                    id="simulation-modeling-tab"
                    items={items}
                    active_tab={$active_tab}
                    navigate_tab={this.navigate_tab}
                />
            </>
        }
        else {
            return <PantoCard>
                We have a problem in loading data :(
            </PantoCard>
        }

    }

}

const stt2prp = (state) => {
    return {
        project: state.project,
        static_modeling_active_tab: state.static_modeling_active_tab,
    }
}

const dispatch2prp = (dispatch) => {
    return {
        addNotification: (notify) => actions.addNotification(dispatch, notify),

        setActiveStaticModelingTab: (tab) => actions.setActiveStaticModelingTab(dispatch, tab),

        setProjectStaticModelingValues: (id, label, value) => actions.setProjectStaticModelingValues(dispatch, id, label, value),
        addProjectStaticModelingSpan: (data) => actions.addProjectStaticModelingSpan(dispatch, data),
        removeProjectStaticModelingSpan: (id) => actions.removeProjectStaticModelingSpan(dispatch, id),
    }
}

export default connect(stt2prp, dispatch2prp)(Index);