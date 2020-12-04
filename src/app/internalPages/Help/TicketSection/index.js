import React from "react";
import PantoCard from "../../../components/PantoCard";
import TicketList from "./TicketList/";
import Chat from "./Chat/";


class Index extends React.Component {
    render() {
        return (
            <PantoCard>

                <div className="panto-row">

                    <div className="panto-col ticket-list-col">
                        <TicketList/>
                    </div>

                    <div className="panto-col chat-col">
                        <Chat/>
                    </div>

                </div>
            </PantoCard>
        );
    }
}

export default Index;
