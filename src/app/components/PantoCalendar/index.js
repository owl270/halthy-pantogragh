import React from "react";
import "./style.scss"
import moment from "moment";

class Index extends React.Component {


    state = {
        showing_date: moment().local(true).startOf('month'),
        first_range: null,
        last_range: null,
        mouse_hover_day: null
    }

    componentDidMount() {
        this.setCalendarRangeInitial()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.calendar_range!==this.props.calendar_range) {
            this.setCalendarRangeInitial()
        }
    }

    setCalendarRangeInitial() {
        if(this.props.calendar_range[0] && this.props.calendar_range[1]){
            this.setState({
                showing_date: moment(this.props.calendar_range[1]).clone().local(true).startOf('month'),
                first_range: moment(this.props.calendar_range[0]).clone().local(true),
                last_range: moment(this.props.calendar_range[1]).clone().local(true),
            })
        }
        else{
            this.setState({
                showing_date: moment().local(true).startOf('month'),
                first_range: null,
                last_range: null
            })
        }
    }


    render() {

        const limitation_duration = 7

        const $header = this.state.showing_date.format('MMM YYYY')

        const next_month = () => {
            this.setState({
                showing_date: this.state.showing_date.add(1, 'month')
            })
        }

        const prev_month = () => {
            if(this.state.first_range && !this.state.last_range){
                this.setState({
                    first_range: null,
                    last_range: null
                })
            }
            this.setState({
                showing_date: this.state.showing_date.subtract(1, 'month'),
            })
        }

        const onChange = (date) => {

            if (!this.state.first_range || (this.state.first_range && this.state.last_range) || (date < this.state.first_range)) {
                this.setState({
                    first_range: date,
                    last_range: null
                })
            }
            else {
                if (date > this.state.first_range) {
                    if (date.diff(this.state.first_range, 'days') <= limitation_duration) {
                        this.setState({
                            last_range: date
                        }, () => {
                            this.props.setCalendarRange([this.state.first_range, this.state.last_range])
                        })
                    }
                    else{
                        this.setState({
                            first_range: date,
                            last_range: null
                        })
                    }
                }
            }

        }

        let calendar = [];
        const startDay = this.state.showing_date.clone().local(true).startOf('month').startOf('week');
        const endDay = this.state.showing_date.clone().local(true).endOf('month').endOf('week');

        let date = startDay.clone().subtract(1, 'day');

        while (date.isBefore(endDay, 'day')) {
            calendar.push(Array(7).fill(0).map(() => date.add(1, 'day').clone()))
        }


        const $days_render = calendar.map((val, i) => {
            return <div key={i} className="calendar-days">
                {
                    val.map((v, ii) => {
                        let classArray = []

                        if (this.state.first_range && !this.state.last_range) {
                            let cmpFirst = this.state.first_range.diff(v, 'days')
                            if (cmpFirst === 0) classArray.push('in-range selected first-day')
                            if(this.state.mouse_hover_day) {
                                let cmpLast = this.state.mouse_hover_day.diff(v, 'days')
                                if (cmpFirst < 0 && cmpLast >= 0) {
                                    if (cmpLast === 0) classArray.push('in-range selected last-day hover')
                                    else if (cmpFirst < 0 && cmpLast > 0) classArray.push('in-range hover')
                                }
                            }
                        }
                        else if (this.state.first_range && this.state.last_range) {
                            let cmpFirst = this.state.first_range.diff(v, 'days')
                            let cmpLast = this.state.last_range.diff(v, 'days')
                            if (cmpFirst === 0) classArray.push('in-range selected first-day')
                            else if (cmpLast === 0) classArray.push('in-range selected last-day')
                            else if (cmpFirst < 0 && cmpLast > 0) classArray.push('in-range')
                            if(this.state.mouse_hover_day) {
                                let cmpLast = this.state.mouse_hover_day.diff(v, 'days')
                                if (cmpLast === 0) classArray.push('in-range selected')
                            }
                        }
                        else {
                            if(this.state.mouse_hover_day) {
                                let cmp = this.state.mouse_hover_day.diff(v, 'days')
                                if (cmp === 0) {
                                    classArray.push('in-range selected first-day')
                                }
                            }
                        }
                        let props = {}
                        if (classArray.length > 0) props.className = classArray.join(" ")
                        props.onClick = () => {
                            onChange(v)
                        }
                        props.onMouseOver = () => {
                            if (this.state.first_range && !this.state.last_range){
                                let gg = v
                                if(v.diff(this.state.first_range, 'days') > limitation_duration){
                                    gg = this.state.first_range.clone().add(limitation_duration, 'days')
                                }
                                this.setState({
                                    mouse_hover_day: gg
                                })
                            }
                            else if(!this.state.first_range && !this.state.last_range){
                                this.setState({
                                    mouse_hover_day: v
                                })
                            }
                            else{
                                this.setState({
                                    mouse_hover_day: v
                                })
                            }
                        }
                        props.onMouseLeave = () => {
                            this.setState({
                                mouse_hover_day: null
                            })
                        }
                        return <span key={ii} {...props}>{v.format('D')}</span>
                    })
                }
            </div>
        })


        return (
            <div className="calendar">


                <div className="calendar-day-view">
                    <div className="calendar-header">

                        <div className="next-prev-control" onClick={prev_month}>
                            <i className="panto-icon ph-left-arrow"/>
                        </div>
                        <span className="calendar-month-year">{$header}</span>
                        <div className="next-prev-control" onClick={next_month}>
                            <i className="panto-icon ph-right-arrow"/>
                        </div>

                    </div>

                    <div className="calendar-body">


                        <div className="calendar-this-month">
                            <div className="calendar-days-rows">

                                <div className="calendar-weeks-name">
                                    <span>S</span>
                                    <span>M</span>
                                    <span>T</span>
                                    <span>W</span>
                                    <span>T</span>
                                    <span>F</span>
                                    <span>S</span>
                                </div>


                                {$days_render}


                            </div>
                        </div>


                    </div>

                </div>

                <div className="calendar-month-view">


                </div>

                <div className="calendar-year-view">

                </div>

            </div>
        )
    }


}


export default Index