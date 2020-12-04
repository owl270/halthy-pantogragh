import React from "react";
import {ADD_FIGURE,} from "./_actions";
import {connect} from "react-redux";
import Api from "../../../../api";
import * as actionTypes from "../_DataHandler/_actions";
import Aux from "../../../components/_Aux";
import PopUpLogin from "../../PopUpLogin";



class Index extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            blobUrl: '',
            fileType: '',
            fileName: '',
            login_popup: false,
            lastApi: null
        }

        serverCallback = serverCallback.bind(this)
        getSignalData = getSignalData.bind(this)
        getVideo = getVideo.bind(this)
        getFigure = getFigure.bind(this)
        requestVideo = requestVideo.bind(this)

    }


    componentDidMount() {

        const prps = {
            train: this.props.train_id,
            device: this.props.device_id,
            duration: this.props.duration,
        }
        getSignalData(prps)

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.showing_number !== this.props.showing_number) {
            getVideo({
                train: this.props.train_id,
                device: this.props.device_id
            })
        }
        else if (prevProps.figure_properties !== this.props.figure_properties) {
            if(this.props.figure_properties) {
                getFigure({
                    ...this.props.figure_properties,
                    train: this.props.train_id,
                    device: this.props.device_id,
                    duration: this.props.duration
                })
            }
        }

        else if (prevProps.request_video !== this.props.request_video) {
            if (this.props.request_video !== null) {
                // requestVideo()
            }
        }
    }


    render() {
        return <Aux>

            <a
                ref={(downloader) => {
                    this.downloader = downloader;
                }}
                href={this.state.blobUrl}
                download={this.state.fileName}
                type={this.state.fileType}
            />

            {!this.state.login_popup ? null :
                <PopUpLogin
                    visible={this.state.login_popup}
                    setUnVisible={() => {
                        this.setState({login_popup: false})
                    }}
                    onLogin={()=>{
                        this.runLastApi()
                        this.props.addNotification({
                            type: 'success',
                            children: <b>You're logged in successfully</b>,
                        }, 'login-success')
                    }}
                />
            }

        </Aux>
    }
}


const stt2prp = (state) => {
    return {
        /*
        duration: state.duration,
        device_id: state.device_id,
        train_id: state.train_id,
        */
        showing_number: state.showing_number,
        figure_properties: state.figure_properties,
        videos: state.videos,
        interval_time: state.interval_time,
        request_video: state.request_video



    }
}

const dispatch2prp = (dispatch) => {
    return {
        set: (state, value) => dispatch({type: actionTypes.SET, state, value}),
        addFigure: (figure) => dispatch({type: ADD_FIGURE, figure}),
    }
}

export default connect(stt2prp, dispatch2prp)(Index)


export async function serverCallback(w, response, etc) {
    const $set = this.props.set

    if (!response.ok) {
        const {status, error, description} = response
        $set('loading', false);
        this.setState({lastApi: {w, etc}})

        // this.props.addNotification({
        //     type: 'error',
        //     children: <Aux>
        //         {description || error}
        //     </Aux>
        // })

        if (status === 401) {
            this.setState({login_popup: true})
        }
    }
    else {
        const {result} = response
        switch (w) {
            /****** signal_data ******/
            case 'signal_data':
                $set('videos', result.videos)
                $set('map_points', result.points)
                $set('device_acceleration', result.device_acc)
                $set('loading', false)

                getVideo({
                    train: this.props.train_id,
                    device: this.props.device_id
                })

                this.props.set('figure_properties', {
                    figure_type: 'acceleration-1',
                    figure_option: 'z',

                    threshold: false,
                    threshold_type: 'default',
                    threshold_manually_values: ['', '', ''],

                    signal_filter: false,
                    signal_filter_type: 'window-rms',
                    window_length: 1,
                    overlap: 0.1
                })

                break


            case 'figure':
                $set('figure_properties', null)
                this.props.addFigure(result.figure)
                break

            case 'video':
                const blob = await response.blob()
                if(blob.type==="application/octet-stream"){
                    const blobUrl = URL.createObjectURL(blob);
                    $set('video_blob', blobUrl);
                }
                else{
                    $set('video_blob', '');
                }
                $set('loading_video', false)
                break

            case 'request_video':
                $set('request_video', null)

                break
        }
    }

}


export function getSignalData(prps) {
    this.props.set('loading', true)
    this.props.set('loading_label', 'Getting Information...')

    Api.getSignalData({
        ...prps,
        map_window: this.props.interval_time
    }).then((response) => {
        serverCallback('signal_data', response)
    })
}


export function getVideo(prp) {

    const {
        showing_number,
        videos
    } = this.props
    
    
    if(videos[showing_number] && videos[showing_number].exists) {
        this.props.set('loading_video', true)
        Api.video(videos[showing_number].path, prp).then(async (response) => {
            serverCallback('video', response)
        })
    }
}


export function getFigure(figure_properties) {

    let {
        showing_number
    } = this.props


    figure_properties.duration = [
        figure_properties.duration[0].clone().add(showing_number, 'minutes'),
        figure_properties.duration[0].clone().add(showing_number + 1, 'minutes').subtract(1, 'millisecond'),
    ]

    this.props.set('loading_signal', true)

    Api.getFigure(figure_properties).then((response) => {
        this.props.set('loading_signal', false)
        serverCallback('figure', response)
    })



}



export function requestVideo() {

    const u = this.props.request_video - this.props.showing_number;

    let duration = [
        this.props.duration[0].clone().add(u, 'minutes'),
        this.props.duration[0].clone().add(u+1, 'minutes')
    ]


    let data = {
        train: this.props.train_id,
        device: this.props.device_id,
        duration
    }
    Api.requestVideo(data)
        .then((response) => {
            serverCallback('request_video', response, {duration: data.duration})
        })
}