import React from "react";
import PantoCheckButton from "../../../../components/PantoCheckButton";
import DataProps from "./DataProps";
import PantoButton from "../../../../components/PantoButton";
import moment from "moment";

import {Link, useLocation} from "react-router-dom";


const GoSuperVision = (props) => {
    let location = useLocation();
    return (
        <Link
            to={{
                pathname: `/supervision/${props.train_id}/${props.device_id}/${props.start}/${props.end}`,
                state: {background: location}
            }}
        >
            {props.children}
        </Link>
    )
}



class Data extends React.Component {


    render() {

        const {
            device,
            properties,
            start_date,
            distance,
            duration,
            index,
            openTool,
            selection,
            end_date,

        } = this.props

        let classes = []

        if (openTool.isOpen(index)) classes.push('open-tools')


        return (


            <li className={classes.join(" ")} key={index}>
                <div
                    className={"data-content"}
                >

                    <PantoCheckButton
                        value={selection.isSelect(index)}
                        onChange={(value) => {
                            selection.select(index, value)
                        }}
                    />


                    <div
                        className="data-container"
                        onClick={() => {
                            openTool.open(index)
                        }}
                    >

                        <div className="data-info">

                            <span className="identify">Device: {device}</span>

                            <span className="date-time">
                                {moment(start_date).format('DD/MMM/YYYY')}
                                <span>{moment(start_date).format('HH:mm') + " to " + moment(end_date).format('HH:mm')}</span>
                            </span>

                            <span className="section-span">
                                Distance: {distance} km   Duration: {moment.utc(duration * 1000).format("m'ss\"")}
                            </span>

                        </div>

                        <div className="data-properties">
                            <DataProps
                                {...properties}
                            />
                        </div>

                    </div>
                </div>

                <div
                    className="tools-content"
                >

                    <PantoButton
                        className="outline"
                        onClick={() => {
                            this.props.tools.downloadSignal.process(index)
                        }}
                        disabled={this.props.tools.downloadSignal.processing(index)}
                        //loading={this.props.tools.downloadSignal.processing(index)}
                    >
                        {this.props.tools.downloadSignal.processing(index) ? "In queue..." : "Download Signal"}
                    </PantoButton>

                    <PantoButton
                        className="outline"
                        onClick={() => {
                            this.props.tools.requestVideo.process(index)
                        }}
                        loading={this.props.tools.requestVideo.processing(index)}
                        disabled={this.props.tools.requestVideo.requested(index) || this.props.tools.requestVideo.uploaded(index)}
                    >
                        {this.props.tools.requestVideo.requested(index) ? "Requested" : this.props.tools.requestVideo.uploaded(index) ? "Uploaded" : "Request Video"}
                    </PantoButton>


                    <PantoButton className="outline">
                        <GoSuperVision
                            train_id={this.props.train_id}
                            device_id={this.props.device_id}
                            start={moment(start_date).format("X")}
                            end={moment(end_date).format("X")}
                        >
                            More Detail
                        </GoSuperVision>
                    </PantoButton>


                    <div
                        className="close-tools"
                        onClick={() => {
                            openTool.close(index)
                        }}
                    >×
                    </div>
                </div>


            </li>

        )

    }

}

export default Data