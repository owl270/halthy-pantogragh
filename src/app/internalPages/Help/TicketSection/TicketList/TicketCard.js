import React from "react";
import {Link} from "react-router-dom";
import * as moment from "moment";
import PantoButton from "../../../../components/PantoButton"
class Index extends React.Component {

    render() {

        return <li className={this.props.status === "close" ? "closed" : ""}>
            <Link className="ticket" to={"/help/" + this.props.token}>
                <div className="ticket-card-content">
                    <div className="ticket-info">
                        <h5>{this.props.title}</h5>
                        <div className="ticket-duration">
                            <span>opened at {moment(this.props.open_date).format("DD MMM YYYY")}</span>
                            {
                                this.props.status === "close"
                                    ?
                                    <span>closed at {moment(this.props.close_date).format("DD MMM YYYY")}</span>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    {this.props.status === "close" ? null :
                        <div className="ticket-tools">
                            <PantoButton className="close-ticket-button">close ticket</PantoButton>
                        </div>
                    }
                </div>
            </Link>
        </li>

    }


}

export default Index