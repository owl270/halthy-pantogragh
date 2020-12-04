import React from "react";
import Aux from "../../components/_Aux";
import {Notification, PantoNotification} from "../../components/PantoNotify";

import PopUpLogin from "../PopUpLogin"
import {Modal, PantoModals} from "../../components/PantoModal";

class Index extends React.Component {


    state = {
        header1: 'Name1111',
        header2: 'Name2222',
        visible1: 'false',
        visible2: false,
    }


    render() {
        return (
            <Aux>

                <div onClick={() => {
                    this.setState({visible2: [true]})
                }}>
                    Home
                </div>





                <PantoNotification>
                    <Notification
                        id={1}
                        emphasize={this.state.visible2}
                        no_dismiss={false}
                        duration={6000}
                    >
                        Hello world!
                    </Notification>

                </PantoNotification>


            </Aux>
        )
    }

}

export default Index;