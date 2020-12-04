import React from "react";
import Aux from "../_Aux";
import './style.scss';
import {Spinner} from "react-bootstrap";
import ReactDOM from "react-dom";
import PantoButton from "../PantoButton";


window.$('#panto-modals').bind("DOMSubtreeModified", ()=>{
    if(window.$('#panto-modals').children().length) window.$('#panto-overlay').addClass('rendered')
    else window.$('#panto-overlay').removeClass('rendered')
})


export class PantoModals extends React.Component {



    render() {
        const {children} = this.props

        return ReactDOM.createPortal(
            children,
            document.getElementById('panto-modals')
        );
    }

}





export class Modal extends React.Component {

    componentDidMount() {
        this.showing()
    }


    state = {
        render_animation: false,
        showing: false
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.showing()

        }
    }


    showing = () => {
        if (this.props.visible) {
            this.setState({
                showing: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        render_animation: true
                    })
                }, 100)
            })
        }
        else {
            this.setState({
                render_animation: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        showing: false
                    })
                }, 1000)
            })
        }
    }


    render() {

        const props = this.props


        return (<Aux>
            {!this.state.showing ? null :


                <div className={'panto-modal panto-modal-' + props.name}>

                    <div className={"panto-modal-content" + (this.state.render_animation ? " rendered" : "")}>


                        {props.loading ?
                            <div className={'loading-path'}>
                                <div className={'loading-overlay'}/>
                                <Spinner animation="grow" size="50"/>
                            </div>
                            : null
                        }


                        <div className={'panto-modal-header'}>

                            {typeof props.header === "string" ? <h4>{props.header}</h4> : props.header}


                            {typeof props.dismiss !== "function" ? null :
                                <div className={'panto-modal-dismiss'} onClick={() => {
                                    props.dismiss()
                                }}>
                                    <div className={'bg'}/>
                                </div>
                            }

                        </div>

                        <div className={'panto-modal-body'}>{props.children}</div>


                        <div className="panto-modal-footer">{props.footer}</div>

                    </div>


                </div>

            }

        </Aux>)

    }
}





