import React from "react";
import {hideTooltip, showTooltip} from "../../../../components/PantoTooltip";


export class Helper extends React.Component {

    render() {

        return (<>
            <g fill="#5a5d63" stroke="#5a5d63">
                <path d="M15.812 15.204h15.005v273.855H15.812z"/>
                <path d="M29.111 23.745l.22-3.205 140.954 9.648-.22 3.206z" strokeWidth={9}/>
                <path d="M24.992 109.673L151.63 32.658l1.67 2.745-126.638 77.015z" strokeWidth={9}/>
            </g>


            </>
        )

    }
}


export class Pantograph extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Pantograph'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }

    render() {
        let objClass = ['mech-shape', 'mech-shape-pantograph']
        if (this.props.confirm) objClass.push('confirm')

        return (
            <image
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                transform="rotate(6.02 -1022.351 2167.86)"
                preserveAspectRatio="none"
                width={126}
                height={181}
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAAFrCAMAAAFapE+yAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAP7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v////7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v////7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v////7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v////7+/v////7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v////7+/v7+/v////7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v////7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v////7+/v7+/v7+/v7+/jE1phIAAAEAdFJOUwCvQBpbnAfdSInwyjV2t/hjpOWRItI9fg+/UCprrBftWJnaRYbHMnMEtB/1oeJNjs9g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"
            />
        );
    }

}


export class SteadyArm extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Steady Arm'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }

    render() {
        let objClass = ['mech-shape', 'mech-shape-steady-arm']
        if (this.props.confirm) objClass.push('confirm')

        return (
            <path
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                d="M169.988 117.357l-75.413-5.169V92.901h51.82V58.219h4.314v39h-51.82v10.942l71.4 4.893z"
                stroke="#00000000"
                strokeWidth="10"
            />
        )
    }

}


export class ContactWire extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Contact Wire'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }

    render() {
        let objClass = ['mech-shape', 'mech-shape-contact-wire']
        if (this.props.confirm) objClass.push('confirm')

        return (
            <rect
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                data-name="contact_wire"
                width="419.403"
                height="2.5"
                transform="matrix(0.929, -0.371, 0.371, 0.929, 0, 187.431)"
                stroke="#00000000"
                strokeWidth="10"
            />
        )
    }

}


export class MessengerWire extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Messenger Wire'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }

    render() {
        let objClass = ['mech-shape', 'mech-shape-messenger-wire']
        if (this.props.confirm) objClass.push('confirm')

        return (
            <path
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                d="M856.17,475.546h-.27V472.3a562.918,562.918,0,0,0,76.22-5.645c39.5-6.948,93.689-17.229,135.253-43.049l1.623,2.536c-41.757,25.942-97.484,37.991-136.876,43.537A592.59,592.59,0,0,1,856.17,475.546Z"
                transform="translate(-682.9 -421.606)"
                stroke="#00000000"
                strokeWidth="10"
            />
        )
    }

}


export class StitchWire extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Stitch Wire'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }

    render() {
        let objClass = ['mech-shape', 'mech-shape-stitch-wire']
        if (this.props.confirm) objClass.push('confirm')

        return (
            <rect
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                width="269.799"
                height="2.5"
                transform="translate(16 148.143) rotate(-22.706)"
                stroke="#00000000"
                strokeWidth="10"
            />
        )
    }

}


export class Dropper extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Dropper'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }


    render() {
        let objClass = ['mech-shape', 'mech-shape-dropper']
        if (this.props.confirm) objClass.push('confirm')

        return (

            <rect
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                width="3.0"
                height="28.896"
                transform="translate(326 28)"
                stroke="#00000000"
                strokeWidth="10"
            />

        )
    }

}


export class MessengerWireSupport extends React.Component {

    mouseMoveHandler = (e) => {
        let tooltip_title = 'Messenger Wire Support'
        showTooltip({x: e.clientX, y: e.clientY, text: tooltip_title})
    }

    mouseOutHandler = (e) => {
        hideTooltip()
    }

    render() {
        let objClass = ['mech-shape', 'mech-shape-messenger-wire-support']
        if (this.props.confirm) objClass.push('confirm')

        return (
            <g
                onMouseMove={this.mouseMoveHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={this.props.onClick}
                className={objClass.join(" ")}
                stroke="#00000000"
                strokeWidth="10"
            >
                <path d="M166.317 44.952h1.791v4.476h-1.791z"/>
                <path d="M159.155 40.064h16.115v1.791h-16.115z"/>
                <path d="M166.317 32.49h1.791v4.476h-1.791z"/>
                <path d="M159.155 36.277h16.115v1.791h-16.115z"/>
                <path d="M159.155 43.851h16.115v1.791h-16.115z"/>
                <path d="M166.317 44.952h1.791v4.476h-1.791z"/>
                <path d="M169.899 47.638z"/>

            </g>

        )
    }

}