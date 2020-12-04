import React, {Component} from "react"
import Index from "../../../../components/PantoCard";


class ControlMenu extends Component {



    render() {

        const control_menu_items = this.props.items.map(item => {
            return <li onClick={item.onClick}>
                {item.title}
                {item.hasSub ? <i className={'panto-icon ph-menu-arrow-down ph-icon-ltr ph-icon-sm'}/> : null}
            </li>;
        });


        return (
            <Index id={'simulation_control_menu'}>
                <header>
                    <h6>Control Menu</h6>
                </header>

                <ul className={'control-menu'}>
                    {control_menu_items}
                </ul>

                <div className={('control-menu-sub' + (this.props.subVisible ? ' open' : ''))}>
                    <div className={'control-menu-sub-body show'}>
                        {this.props.subContent}
                    </div>
                </div>

            </Index>
        )

    }


}


export default ControlMenu