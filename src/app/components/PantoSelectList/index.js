import * as React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import ClickOutHandler from "react-onclickout"
import './style.scss';

class Index extends React.Component {


    state = {
        search: ''
    }

    renderThumb({style, ...props}) {
        const thumbStyle = {
            backgroundColor: 'rgb(255 255 255 / 25%)',
            width: '4px',
            padding: 0,
            borderRadius: '5px',
            right: '0px'
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderView({style, ...props}) {
        const thumbStyle = {
            // "margin-right": "-30px",
            // "margin-bottom": "-30px",
            // "padding-right": "13px",
            // "padding-bottom": "13px",
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }

    renderThumbX({style, ...props}) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    onOpen = () => {
        if (!this.props.open)
            if (typeof this.props.onOpen === "function") this.props.onOpen()
    }

    onClose = () => {
        if (this.props.open) {
            this.setState({search: ''})
            if (typeof this.props.onClose === "function") {
                this.props.onClose()
            }
        }
    }

    onToggle = () => {
        if (this.props.open) this.onClose()
        else this.onOpen()
    }


    onChange = ($val) => {
        if (this.props.disabled) return
        let $v
        if (this.props.multiple) {
            $v = this.props.value

            if ($v.includes($val)) {
                const ee = $v.indexOf($val)
                $v.splice(ee, 1)
            } else {
                $v.push($val)
            }
        } else {
            $v = $val
            this.onClose()
        }

        if (this.props.name) this.props.onChange($v, this.props.name)
        else this.props.onChange($v)
    }

    onSearch = (e) => {
        const search = e.target.value.toLowerCase()
        this.setState({
            search
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.value!==this.props.value) {
            this.setState({
                search: ''
            })
        }

    }


    render() {

        let $classes = ['select-list']
        if (this.props.open && !this.props.disabled) $classes.push("open")
        if (this.props.multiple) $classes.push("multiple")

        if (this.props.disabled) {
            $classes.push("disabled")
            if ($classes.includes("open")) {
                $classes[$classes.indexOf("open")] = ''
            }
        }

        const _this = this


        const condition = new RegExp(this.state.search);
        const $items = this.props.items.filter(function (el) {
            return condition.test(el.name.toLowerCase())
        })


        let $values = {}


        const selected = this.props.value
        const isMultiple = this.props.multiple

        const $list = $items.map(function (item, i) {
            $values[item.value] = item.name
            let $props = {}

            if (isMultiple) {
                $props.className = (selected.includes(item.value) ? 'selected' : '')
            } else {
                $props.className = (selected === item.value ? 'selected' : '')
            }

            $props.onClick = () => {
                _this.onChange(item.value)
            }
            return <li key={i} {...$props}>{item.name}</li>
        })

        const _defaults = {
            noResult: (entered) => {
                return "No results matched \"" + entered + "\""
            },
            notFound: () => {
                return "Not found"
            }
        }

        const noResult = typeof this.props.no_result === "function" ? this.props.no_result : _defaults.noResult
        const notFound = typeof this.props.not_found === "function" ? this.props.not_found : _defaults.notFound


        if (!$list.length) {
            let $props = {}
            $props.className = 'disabled'
            const $text = this.state.search ? noResult(this.state.search) : notFound()
            $list.push(<li key={0} {...$props}>{$text}</li>)
        }




        let label_btn = this.props.placeholder

        if(selected){
            if(isMultiple){
                label_btn = selected.map((v, i) => {
                    return $values[v]
                })
                if(label_btn.length) label_btn = label_btn.join(", ")
                else label_btn = this.props.placeholder
            }
            else{
                label_btn = $values[selected] || this.props.placeholder
            }
        }


        const containerHeight = ($list.length * (this.props.height > 0 ? this.props.height : 32))

        return <ClickOutHandler
            onClickOut={this.onClose}>

            <div className={$classes.join(" ")}>

                <div className="select-list-container">

                    <div
                        className="select-list-button"
                        onClick={this.onToggle}
                    >
                        <label>{label_btn}</label>
                        <i className="panto-icon ph-list-caret"/>
                    </div>


                    <div className="list-container">

                        {this.props.live_search ?
                            <div className="select-list-search">
                                <input onChange={this.onSearch} value={this.state.search}/>
                                <i className="panto-icon ph-search"/>
                            </div>
                            : ""}


                        <div className="select-list-items hide-scrollbar"
                             style={{height: (containerHeight > 200 ? 200 : containerHeight) + "px"}}>

                            <Scrollbars
                                ref="scrollbars"
                                renderThumbVertical={this.renderThumb}
                                renderView={this.renderView}
                                renderThumbHorizontal={this.renderThumbX}
                                hideTracksWhenNotNeeded
                            >

                                <ul>
                                    {$list}
                                </ul>

                            </Scrollbars>

                        </div>

                    </div>

                </div>

            </div>


        </ClickOutHandler>
    }

}

export default Index