import * as React from "react";
import Aux from "../_Aux";
import './style.scss';
class Index extends React.Component {


    changeChecked = () => {
        if(this.props.disabled) return
        this.props.onChange(!this.props.value, this.props.name)
    }

    render() {
        return <div className={'input-group'}>
            <div className={'panto-check-btn-area'} onClick={this.changeChecked}>
                <div className={'panto-check-btn-container' + (this.props.value ? (this.props.value==='some' ? ' some' : ' active') : '')}
                     >
                    <div className={'panto-check-toggle-container'}>
                        <div className={'panto-check-toggle'}/>
                    </div>

                </div>
                {this.props.label ? <Aux onClick={this.changeChecked}>{this.props.label}</Aux> : ''}
            </div>
        </div>;
    }

}

export default Index