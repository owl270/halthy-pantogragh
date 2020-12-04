import ReactDOM from "react-dom";
import React from "react";




class PantoTooltip extends React.Component {


    render() {

        let {x, y, text} = this.props
        if(!x) x = 0
        if(!y) y = 0
        if(!text) text = "Tooltip text"

        const $tooltip = <div
            style={{
                "border": "1px #4467A5 solid",
                "position": "absolute",
                "padding": "3px 11px",
                "fontSize": "12px",
                "background": "#40434A",
                "borderRadius": "4px",
                "color": "#FFFFFF",
                "zIndex": "9999999999",
                "boxShadow": "#00000014 0 7px 9px",
                "top": `${x}px`,
                "left": `${y}px`,
            }}
            children={text}
        />

        return null/*ReactDOM.createPortal(
            $tooltip,
            document.getElementsByClassName("dashboard-main")[0]
        )*/


    }


}


export default PantoTooltip
