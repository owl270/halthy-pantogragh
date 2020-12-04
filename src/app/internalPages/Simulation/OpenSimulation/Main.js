import * as React from "react";
import {Notification, PantoNotification} from "../../../components/PantoNotify";
import {connect} from "react-redux";
import {$API} from "../../../../api/server";
import {Redirect} from "react-router";
import * as actions from "./_DataHandler/_actions";
import config from "../../../../config";
import PantoTabNav from "../../../components/PantoTabNav";

import Static from "./Static";
import Dynamic from "./Dynamic";
import ControlMenu from "./ControlMenu";
import PantoTooltip from "../../../components/_PantoTooltip";


class Index extends React.Component {


    state = {
        redirect_simulation: false
    }

    componentDidMount() {
        const token = this.props.token
        const data = this.props.data

        let props = {token}
        if (data.w) props.data = {w: data.w}
        if (data.r) props.data = {r: data.r}


        $API.getSimulationProject(props, (response) => {
            const {ok, result} = response
            if (ok) {
                const {new_permission, project} = result

                this.props.setProject(project)

                if (new_permission) {
                    this.props.addNotification({
                        id: "updated-permission",
                        type: "info",
                        duration: 3000,
                        children: <>
                            Your permissions to <b>{project.name}</b> has been updated: <b><u>{new_permission}</u></b>
                        </>
                    })
                }
            } else {
                this.setState({
                    redirect_simulation: true
                })
            }
        })
    }


    componentWillUnmount() {
        this.props.setProject(null)
    }



    main_tabs = [
        {
            id: 'static',
            tab: <span>Static</span>,
            content: <Static/>
        },
        {
            id: 'dynamic',
            tab: <span>Dynamic</span>,
            content: <Dynamic/>
        },
        {
            id: 'control-menu',
            tab: <ControlMenu/>,
            content: null
        }
    ]

    navigate_tab = (tab) => {
        this.props.setActiveTab(tab)
    }


    render() {

        const {notifications, project} = this.props

        const $notify = notifications.map((value, index) => {
            return <Notification
                {...value}
                key={index}
            />
        })
        let $project = null
        if (project) {
            document.title = project.name + ' | ' + config.defaultTitle;
            $project = <>
                <div className="panto-row">
                    <div className="panto-col simulation-open">
                        <PantoTabNav
                            id="simulation-tab-main"
                            items={this.main_tabs}
                            active_tab={this.props.active_tab}
                            navigate_tab={this.navigate_tab}
                        />
                    </div>
                </div>
            </>
        }

        return <>
            <PantoNotification>
                {$notify}
            </PantoNotification>
            {!this.state.redirect_simulation ? null : <Redirect to="/empowerment/simulation"/>}
            {$project}
        </>

    }

}

const stt2prp = (state) => {
    return {
        notifications: state.notifications,
        project: state.project,
        active_tab: state.active_tab
    };
};

const dispatch2prp = (dispatch) => {
    return {
        addNotification: (notify) => actions.addNotification(dispatch, notify),
        setProject: (project) => actions.setProject(dispatch, project),
        setActiveTab: (tab) => actions.setActiveTab(dispatch, tab)
    };
};

export default connect(stt2prp, dispatch2prp)(Index);