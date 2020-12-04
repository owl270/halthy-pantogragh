import * as React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import ClickOutHandler from "react-onclickout"
import './style.scss';
class Index extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            show_list: false
        }
    }


    renderView({style, ...props}) {
        const thumbStyle = {
            'display': 'flex',
            'flex-direction': 'column',
            'overflow-x': 'hidden',
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



    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.disabled && !this.props.disabled) {
            this.setState({
                show_list: false
            })
        }
    }



    changeSelect = (item)=>{
        this.setState({
            show_list: false
        })
        this.props.onChange(item, this.props.name)
    }

    render() {
        let $items = []
        for (const index in this.props.items) {
            let item = this.props.items[index]
            let props = this.props.value === index ? {className: 'selected'} : {}
            props['onClick'] = () => {
                this.changeSelect(index)
            }
            $items.push(<li {...props}>{item.name}</li>)
        }





        return <ClickOutHandler
            onClickOut={() => {
                this.setState({
                    show_list: false
                })
            }}>
            <div className={'panto-select-option-area' + (this.state.show_list ? ' active' : '')} style={this.props.style}>
                <div className={'panto-select-option-btn-container'}
                     onClick={() => {
                         if(!this.props.disabled) {
                             this.setState({
                                 show_list: !this.state.show_list
                             })
                         }
                     }}>
                    <label>{this.props.items[this.props.value] ? this.props.items[this.props.value].short : 'select'}</label>
                    <span className="bs-caret">
                    <span className="caret"/>
                </span>
                </div>

                <div className={'panto-select-option-list'}>

                    <ul>
                        <Scrollbars
                            ref="scrollbars"
                            renderThumbHorizontal={this.renderThumb}
                            autoHide
                            autoHeight
                            autoHeightMin={0}
                            autoHeightMax={200}
                        >
                            {$items}
                        </Scrollbars>
                    </ul>

                </div>
            </div>
        </ClickOutHandler>
    }

}

export default Index