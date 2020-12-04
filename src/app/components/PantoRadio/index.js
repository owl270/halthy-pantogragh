import * as React from "react";
import './style.scss';
class Index extends React.Component {


    render() {

        const onChange = ($val) => {
            if(this.props.disabled) return
            if(this.props.name) this.props.onChange($val, this.props.name)
            else this.props.onChange($val)
        }


        const $value = this.props.value
        const _this = this
        return this.props.items.map(function (item, i) {
            return <div key={i} className={'input-group' + (_this.props.disabled ? " disabled" : "")}>
                <div
                    className="panto-radio-container"
                    onClick={() => {
                        onChange(item.value)
                    }}
                >
                    <div className={"panto-radio-button" + ($value === item.value ? " active" : "")}/>
                    <div className="panto-radio-label">
                        {item.label}
                    </div>
                </div>
            </div>
        })


    }

}

export default Index