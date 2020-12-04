import React from "react";
import * as moment from "moment";


class DateTimePicker extends React.Component {

    start = this.props.start
    end = this.props.end
    state = {
        _s_y: parseInt(this.start.format("YYYY")),
        _s_m: parseInt(this.start.format("MM")),
        _s_d: parseInt(this.start.format("DD")),
        _s_h: parseInt(this.start.format("HH")),
        _s_mm: parseInt(this.start.format("mm")),

        _e_y: parseInt(this.end.format("YYYY")),
        _e_m: parseInt(this.end.format("MM")),
        _e_d: parseInt(this.end.format("DD")),
        _e_h: parseInt(this.end.format("HH")),
        _e_mm: parseInt(this.end.format("mm")),
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.open!==prevProps.open) {

            this.start = this.props.start
            this.end = this.props.end
            this.setState({
                _s_y: parseInt(this.start.format("YYYY")),
                _s_m: parseInt(this.start.format("MM")),
                _s_d: parseInt(this.start.format("DD")),
                _s_h: parseInt(this.start.format("HH")),
                _s_mm: parseInt(this.start.format("mm")),

                _e_y: parseInt(this.end.format("YYYY")),
                _e_m: parseInt(this.end.format("MM")),
                _e_d: parseInt(this.end.format("DD")),
                _e_h: parseInt(this.end.format("HH")),
                _e_mm: parseInt(this.end.format("mm")),
            })

        }

    }


    render() {


        let $years = [], $months = [], $days = [], $hours = [], $minutes = []

        for (let i = 2020; i <= 2020; i++) {
            $years.push(<option>{i}</option>)
        }
        for (let i = 1; i <= 12; i++) {
            $months.push(<option>{i}</option>)
        }
        for (let i = 1; i <= 31; i++) {
            $days.push(<option>{i}</option>)
        }
        for (let i = 0; i <= 23; i++) {
            $hours.push(<option>{i}</option>)
        }
        for (let i = 0; i <= 59; i++) {
            $minutes.push(<option>{i}</option>)
        }


        return <div className={"__picker" + (this.props.open ? " opened" : "")}>


            <div className="__picker_row">

                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_s_y: $val})
                    }}
                    value={this.state._s_y}
                >
                    {$years}
                </select>
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_s_m: $val})
                    }}
                    value={this.state._s_m}
                >
                    {$months}
                </select>
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_s_d: $val})
                    }}
                    value={this.state._s_d}
                >
                    {$days}
                </select>

                TIME:
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_s_h: $val})
                    }}
                    value={this.state._s_h}
                >
                    {$hours}
                </select>
                :
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_s_mm: $val})
                    }}
                    value={this.state._s_mm}
                >
                    {$minutes}
                </select>

            </div>


            <div className="__picker_row">

                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_e_y: $val})
                    }}
                    value={this.state._e_y}
                >
                    {$years}
                </select>
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_e_m: $val})
                    }}
                    value={this.state._e_m}
                >
                    {$months}
                </select>
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_e_d: $val})
                    }}
                    value={this.state._e_d}
                >
                    {$days}
                </select>

                TIME:
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_e_h: $val})
                    }}
                    value={this.state._e_h}
                >
                    {$hours}
                </select>
                :
                <select
                    onChange={(e) => {
                        const $val = e.target.value
                        this.setState({_e_mm: $val})
                    }}
                    value={this.state._e_mm}
                >
                    {$minutes}
                </select>

            </div>

            <div className="__picker_row">
                <button
                    onClick={()=>{
                        const {
                            _s_y, _s_m, _s_d, _s_h, _s_mm,
                            _e_y, _e_m, _e_d, _e_h, _e_mm
                        } = this.state

                        let val = [
                            moment(_s_m + "/" + _s_d + "/" + _s_y + " " + _s_h + ":" + _s_mm),
                            moment(_e_m + "/" + _e_d + "/" + _e_y + " " + _e_h + ":" + _e_mm)
                        ]
                        this.props.onChange(val)
                    }}
                >
                    Okay
                </button>


            </div>



        </div>


    }


}

export default DateTimePicker