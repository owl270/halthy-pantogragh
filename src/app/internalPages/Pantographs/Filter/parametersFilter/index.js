import React from "react";
import PantoCheckButton from "../../../../components/PantoCheckButton";
import ClickOutHandler from "react-onclickout";
import FilterProperties from "./FilterProperties";

class Index extends React.Component {


    state = {
        open: false
    }


    render() {

        const $type = this.props.type
        const $pFilter = this.props.data

        const $filter_properties = FilterProperties($type);
        const Icon = $filter_properties.icon
        const Title = $filter_properties.title
        const Content = $filter_properties.content
        const disabled = $filter_properties.disabled


        const isActive = $pFilter.active


        let $classes = []

        const onCollapse = () => {
            if(disabled) return;
            this.setState({
                open: true
            })
            if(!isActive) this.props.activeFilter($type);
        }

        const onExpand = () => {
            if(disabled) return;
            this.setState({
                open: false
            })
        }

        const onToggle = () => {
            if (this.state.open) onExpand()
            else onCollapse()
        }

        const onChange = () => {
            if(disabled) return;
            this.props.activeFilter($type);
        }


        if(this.state.open) $classes.push('collapse')


        return <ClickOutHandler
            onClickOut={onExpand}>
            <li className={$classes.join(" ")}>

                <div className="parameters-filter-header">

                    <PantoCheckButton
                        value={isActive}
                        onChange={onChange}
                        disabled={disabled}
                    />

                    <div className="parameters-filter-label" onClick={onToggle}>
                        <label><Icon/>{Title}</label>
                        <i className="panto-icon ph-list-caret"/>
                    </div>

                </div>

                <div className="parameter-content">
                    {Content}
                </div>
            </li>
        </ClickOutHandler>

    }


}




export default Index