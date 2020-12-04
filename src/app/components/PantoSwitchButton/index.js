import * as React from "react";

import './style.scss';



export default class Index extends React.Component {

    changeChecked = () => {
        if(this.props.disabled) return
        if(this.props.name) this.props.onChange(!this.props.value, this.props.name)
        else this.props.onChange(!this.props.value)
    }


    render() {
        return <div className={'panto-switch-btn-area'} onClick={this.changeChecked}>
            <div className={'panto-switch-btn-container' + (this.props.value ? ' active' : '') + (this.props.disabled ? ' disabled' : '')}
                 >
                <div className={'panto-switch-toggle'}/>
            </div>
            {this.props.label ? this.props.label: ''}
        </div>;
    }

}

