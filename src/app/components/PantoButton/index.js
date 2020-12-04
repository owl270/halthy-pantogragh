import * as React from "react";
import {Spinner} from "react-bootstrap";
import './style.scss';

class Index extends React.Component {

    render() {
        return <button
            className={"panto-button" + (this.props.className ? " " + this.props.className : "")}
            onClick={this.props.onClick}
            disabled={this.props.disabled || this.props.loading}

        >
            {this.props.loading ? <Spinner animation="border" size={'sm'} variant={'light'}/> : this.props.children}
        </button>;
    }

}



export default Index