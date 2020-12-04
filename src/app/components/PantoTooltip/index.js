import React from 'react';


export function showTooltip(tooltip){
    tooltip.show = true
    this.setState({...tooltip})
}

export function hideTooltip(){
    let tooltip = {show: false}
    this.setState({...tooltip})
}


export default class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            x: 0,
            y: 0,
            text: 'Test'
        }
        // eslint-disable-next-line no-func-assign
        showTooltip = showTooltip.bind(this); hideTooltip = hideTooltip.bind(this)
    }



    render() {

        if(this.state.show){
            return <div
                style={{
                    "border": "1px #4467A5 solid",
                    "position": "fixed",
                    "padding": "3px 11px",
                    "font-size": "12px",
                    "background": "#40434A",
                    "border-radius": "4px",
                    "color": "#FFFFFF",
                    "z-index": "3",
                    "box-shadow": "#00000014 0 7px 9px",
                    "top": (this.state.y + (-20)) + "px",
                    "left": (this.state.x + (10)) + "px",
                }}>
                {this.state.text}
            </div>;
        }
        else{
            return '';
        }

    };
}
