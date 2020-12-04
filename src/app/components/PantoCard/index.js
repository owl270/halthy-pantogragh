import React from "react";
import Aux from "../_Aux";
import './style.scss';
import {Spinner} from "react-bootstrap";

class Index extends React.Component {

    render() {
        return (
            <Aux>
                <div className={'panto-card'} id={this.props.id}>
                    <div className={'panto-card-body'}>
                        {this.props.children}

                        {this.props.loading ?
                            <div className={'loading-path'}>
                                <div className={'loading-overlay'}/>
                                {this.props.loading_label ? <div className={'loading-text'}>{this.props.loading_label}</div> : ''}
                                <Spinner animation="grow" size="50"/>
                            </div>
                            : null}

                    </div>
                </div>
            </Aux>
        )
    }
}

export default Index;