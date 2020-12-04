import React from "react";
import Aux from "../_Aux";
import {Scrollbars} from "react-custom-scrollbars";
import {Spinner} from "react-bootstrap";
import './style.scss';

class Index extends React.Component {


    renderView({style, ...props}) {
        const thumbStyle = {
            'display': 'flex',
            'overflow-y': 'hidden',
            "overscroll-behavior": "contain",
            "margin": "0"
        };
        return (
            <div
                className="_scrollbar-container"
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    renderThumb({style, ...props}) {
        const thumbStyle = {
            display: 'none'
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    render() {

        let $tabs = [], $content = null

        this.props.items.map((item, index) => {

            let class_name = [];

            if (this.props.active_tab===item.id) {
                class_name.push('active');
                $content = item.content
            }

            $tabs.push(<>
                <li className={class_name.join(' ')}
                    onClick={() => {
                        if(!item.content) return;
                        this.props.navigate_tab(item.id)
                    }}

                >
                    {item.tab}
                </li>
            </>)

        });




        return (
            <Aux>
                <div className={'panto-tab-nav ' + this.props.id}>

                    <div className='tab-navigations'>
                        <ul>
                            {$tabs}

                            {/*<Scrollbars
                                    ref="scrollbars"
                                    renderView={this.renderView}
                                    renderThumbHorizontal={this.renderThumb}
                                    onWheel={(e) => {
                                        const currentScrollDelta = this.refs.scrollbars.getScrollLeft();
                                        this.refs.scrollbars.scrollLeft(currentScrollDelta + e.deltaY);
                                        //this.refs.scrollbars.scrollTop(10)
                                        e.preventDefault()
                                        return false
                                    }}
                                    autoHide
                                    autoHeight
                                    autoHeightMin={0}
                                    autoHeightMax={35}
                                >*/}

                            {/*</Scrollbars>*/}
                        </ul>
                    </div>

                    <div className='tab-contents'>
                        {$content}
                    </div>

                </div>
            </Aux>
        )
    }
}

export default Index;