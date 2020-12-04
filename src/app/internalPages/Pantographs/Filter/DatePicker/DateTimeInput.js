import React from "react";
import TimeIcon from "./Time";
import Index from "../../../../components/PantoInput";
import ClickOutHandler from "react-onclickout";

class DateTimeInput extends React.Component {


    render() {

        const $date = this.props.value
        const $showing_date = $date.format("YYYY") + "/" + $date.format("MMM") + "/" + $date.format("DD")
        const $hour = $date.format("HH")
        const $min = $date.format("mm")


        return <div className="date-time-input">

            <div className="date-time-input-content">

                <div className="date-input">
                    <Index
                        value={$showing_date}
                        readOnly={true}
                        disabled={this.props.disabled}
                    />
                </div>


                <div className="time-input">
                    <TimeIcon/>
                    <Index
                        value={$hour}
                        readOnly={true}
                        disabled={this.props.disabled}
                    />
                    <b>:</b>
                    <Index
                        value={$min}
                        readOnly={true}
                        disabled={this.props.disabled}
                    />
                </div>

            </div>

        </div>


    }

}

export default DateTimeInput