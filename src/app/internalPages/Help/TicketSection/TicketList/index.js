import React from "react";
import Aux from "../../../../components/_Aux";
import TicketCard from "./TicketCard";
import {Scrollbars} from "react-custom-scrollbars";


const _tickets = [
    {
        token: "dgddyerIrfhc4",
        title: "Ticket title 1",
        status: "open",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: null
    },
    {
        token: "dgddyerIrfhc4dss",
        title: "Ticket title 2",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-10T11:34:49.474Z"
    },
    {
        token: "xxxxdyerIrfhc4sa",
        title: "Ticket title 3",
        status: "open",
        open_date: "2020-10-20T11:34:49.474Z",
        close_date: null
    },
    {
        token: "dgttttIrfhc4",
        title: "Ticket title 4",
        status: "open",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: null
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    },
    {
        token: "mnmgfhc4",
        title: "Ticket title 5",
        status: "close",
        open_date: "2020-10-09T11:34:49.474Z",
        close_date: "2020-10-13T11:34:49.474Z"
    }
]


class Index extends React.Component {


    renderThumbY({style, ...props}) {
        const thumbStyle = {
            backgroundColor: '#4467A5',
            width: '4px',
            padding: 0,
            borderRadius: '5px'
        }
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderTrackY({style, ...props}) {
        const thumbStyle = {
            position: "absolute",
            width: "4px",
            right: "0px",
            bottom: "0px",
            top: "0px",
            borderRadius: "5px",
            backgroundColor: "#2B2C2E"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    render() {

        let open_tickets = []
        let close_tickets = []


        _tickets.map((v, i) => {
            if (v.status === "open") {
                open_tickets.push(<TicketCard {...v}/>)
            } else if (v.status === "close") {
                close_tickets.push(<TicketCard {...v}/>)
            }
            return null
        })

        return <Aux>

            <h6 className="ticket-list-header">Open ticket</h6>
            <div className="ticket-list open-tickets hide-scrollbar">
                <Scrollbars
                    ref="scrollbars"
                    renderThumbVertical={this.renderThumbY}
                    renderTrackVertical={this.renderTrackY}
                    hideTracksWhenNotNeeded
                >
                    <ul>
                        {open_tickets}
                    </ul>
                </Scrollbars>
            </div>
            <hr/>


            <h6 className="ticket-list-header">Archive Ticket</h6>
            <div className="ticket-list close-tickets hide-scrollbar">
                <Scrollbars
                    ref="scrollbars"
                    renderThumbVertical={this.renderThumbY}
                    renderTrackVertical={this.renderTrackY}
                    hideTracksWhenNotNeeded
                >
                    <ul>
                        {close_tickets}
                    </ul>
                </Scrollbars>
            </div>
        </Aux>

    }

}

export default Index