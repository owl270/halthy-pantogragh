import * as React from "react";
import './style.scss';
import ReactDOM from "react-dom";
import Aux from "../_Aux";


export const PantoNotifyBar = ({children}) => {
    return ReactDOM.createPortal(
        children,
        document.getElementById('panto-notifications-bar')
    )
}


class NotifyBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            top: 0,


            isShow: true,
            progress: 0,

            emphasize: false,
            dismiss: false,
            rendered: true
        }
    }


    resize = () => {
        const n = document.getElementById("notify-bar-service")
        this.setState({left: n.offsetLeft, top: n.offsetTop})
    }


    componentDidMount() {
        this.resize()
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const {x, y, xs, ys, children, w, h, type} = this.props
        return <Aux>
            <div
                className={"notify-bar " + (type)}
                style={{
                    left: this.state.left,
                    width: Math.floor(w) + 1 + "px",
                    height: Math.floor(h) + 1 + "px",
                    transform: `translate(${(x + 10 - this.state.left - 5)}px , ${y - 5}px) scaleX(${xs}) scaleY(${ys})`
                }}>
                {children}
            </div>
        </Aux>
    }

}


export const PantoNotification = ({children}) => {
    return ReactDOM.createPortal(
        children,
        document.getElementById('panto-notifications')
    )
}


class Notify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: true,
            progress: 0,

            emphasize: false,
            dismiss: false,
            rendered: true,

            notifier: false,
            xx: 0,
            yy: 0,
            xs: 1,
            ys: 1,
            w: 0,
            h: 0
        }
    }

    _duration = this.props.duration || 10000
    interval = 100
    intervalID = 0


    componentDidMount() {
        setTimeout(() => {
            this.setState({rendered: false})
        }, 800)
        if (!this.props.no_dismiss) {
            setTimeout(() => {
                this.show()
            }, 800)
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.emphasize !== this.props.emphasize) {
            this.emphasize()
        }
        else if (prevProps.dismiss !== this.props.dismiss) {
            if(this.props.dismiss) this.dismiss()
        }
        else if (prevState.isShow !== this.state.isShow) {
            if(!this.state.isShow) {
                if(typeof this.props.on_dismiss === "function") this.props.on_dismiss()
            }
        }
    }



    show = () => {
        this.intervalID = setInterval(() => {
            this.setState({progress: this.state.progress + (this.interval / this._duration)})
            if (this.state.progress >= 1 && this.intervalID) {
                clearInterval(this.intervalID)
                setTimeout(() => {
                    this.dismiss()
                }, 500)
            }
        }, this.interval)
    }

    dismiss = () => {
        this.setState({dismiss: true}, () => {
            setTimeout(() => {
                this.setState({isShow: false})
            }, 800)
        })


        // const el = this.refs.notify
        //
        // this.setState({
        //     notifier: true,
        //     isShow: false,
        //     xx: el.offsetParent.offsetLeft,
        //     yy: el.offsetParent.offsetTop,
        //     xs: 1,
        //     ys: 1,
        //     w: el.offsetWidth,
        //     h: el.offsetHeight
        // })
    }

    emphasize = () => {
        if(this.intervalID) clearInterval(this.intervalID)

        let ff = {progress: 0, isShow: true, dismiss: false}
        if(!this.state.dismiss) ff.emphasize = true
        this.setState(ff,() => {
            setTimeout(() => {
                this.setState({
                    emphasize: false
                })
                this.show()
            }, 800)
        })
    }


    mouseOver = () => {
        if (this.intervalID) clearInterval(this.intervalID)
    }


    mouseOut = () => {
        if (!this.props.no_dismiss) {
            this.show()
        }
    }


    render() {


        const props = this.props


        let _class = ['panto-notification']
        _class.push(props.type || 'error')


        if (this.state.rendered) _class.push('rendered')
        if (this.state.dismiss) _class.push('dismiss')
        if (this.state.emphasize) _class.push('emphasize')


        let $dismiss = ''
        if (!props.no_dismiss) {
            $dismiss = <button
                type="button"
                aria-hidden="true"
                className="close"
                data-notify="dismiss"
                onClick={this.dismiss}>×</button>
        }

        const {xx, yy, xs, ys, w, h} = this.state


        return (<Aux>

            {!this.state.isShow ? null :
                <div
                    ref={"notify"}
                    key={props.id}
                    className={_class.join(" ")}
                    style={{"--percent-progress": ((this.state.progress) * 100) + "%"}}
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                >
                    {$dismiss}
                    {props.children}
                </div>
            }
            {/*{!this.state.notifier ? null :*/}
            {/*    <PantoNotifyBar>*/}
            {/*        <NotifyBar x={xx} y={yy} xs={xs} ys={ys} w={w} h={h} children={props.children} type={props.type}/>*/}
            {/*    </PantoNotifyBar>*/}
            {/*}*/}
        </Aux>)

    }


}


export const Notification = Notify







