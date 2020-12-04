import React from "react";


import {connect} from "react-redux";
import Api from "../../../../api";
import * as moment from "moment";
import * as actionTypes from "../DataHandler/_actions";
import Aux from "../../../components/_Aux";
import PopUpLogin from "../../PopUpLogin";

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blobUrl: '',
            fileType: '',
            fileName: '',
            login_popup: false,
            lastApi: null,

        }

        serverCallback = serverCallback.bind(this)

        getLastTrip = getLastTrip.bind(this)
        getWaysData = getWaysData.bind(this)
        getTrainDevices = getTrainDevices.bind(this)
        getMyDevicesTrips = getMyDevicesTrips.bind(this)
        getSignalMaps = getSignalMaps.bind(this)
        downloadSignal = downloadSignal.bind(this)
        requestVideo = requestVideo.bind(this)
    }


    runLastApi = () => {
        const {w, etc} = this.state.lastApi
        // eslint-disable-next-line default-case
        switch (w) {
            case 'last_trip':
                getLastTrip()
                break
            case 'ways_data':
                getWaysData()
                break
            case 'train_devices':
                getTrainDevices()
                break
            case 'devices_trips':
                getMyDevicesTrips()
                break
            case 'download_signal':
                downloadSignal(etc.queue)
                break
            case 'request_video':
                requestVideo()
                break
            case 'signal_maps':
                getSignalMaps(etc.signals)
                break
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


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.user_changes !== this.props.user_changes || prevProps.focused_item !== this.props.focused_item) {
            if (this.props.user_changes.length > 0) {
                const $changes = this.props.user_changes
                const $last_changes = $changes[$changes.length - 1]
                if ($last_changes === 'train') {
                    this.props.set('user_changes', [])
                    getTrainDevices()
                } else if ($last_changes === 'device') {
                    this.props.set('user_changes', [])
                    this.props.set('duration', [null, null])
                    this.props.set('focused_item', 'customize_time_modal')
                } else {
                    const $eq = this.props.focused_item === 'section_time' || this.props.focused_item === 'section_distance'
                    if (!this.props.focused_item || $eq) {
                        this.timeout_id = setTimeout(() => {
                            this.props.set('user_changes', [])
                            getWaysData()
                        }, 1500)
                    } else {
                        if (this.timeout_id) clearTimeout(this.timeout_id)
                    }
                }
            }
        } else if (prevProps.calendar_range !== this.props.calendar_range) {
            getMyDevicesTrips()
        } else if (prevProps.download_queue !== this.props.download_queue) {
            if (prevProps.download_queue.length === 0) {
                this.props.setDownloadingNumber(0)
            } else {
                if (prevProps.download_queue.length === this.props.downloading_number) {
                    const $queue = this.props.download_queue
                    if (this.props.downloading_number !== null && $queue[this.props.downloading_number]) {
                        downloadSignal($queue[this.props.downloading_number])
                    }
                }
            }
        } else if (prevProps.downloading_number !== this.props.downloading_number) {
            const $queue = this.props.download_queue
            if (this.props.downloading_number !== null && $queue[this.props.downloading_number]) {
                downloadSignal($queue[this.props.downloading_number])
            }
        } else if (prevProps.request_video !== this.props.request_video) {
            if (this.props.request_video !== null) {
                requestVideo()
            }
        } else if (prevProps.signals_selected.length !== this.props.signals_selected.length) {
            if (prevProps.signals_selected.length < this.props.signals_selected.length) {
                let sigID = []
                const $pr = prevProps.signals_selected
                const $no = this.props.signals_selected

                for (let i = 0; i < $no.length; i++) {
                    if (!$pr.includes($no[i]) && !this.props.maps_loaded.includes($no[i])) sigID.push($no[i])
                }
                if (sigID.length > 0) getSignalMaps(sigID)
            }
            // else {
            //     const $pr = prevProps.signals_selected
            //     const $no = this.props.signals_selected
            //     let sigID = []
            //     for (let i = 0; i < $pr.length; i++) {
            //         if (!$no.includes($pr[i])) sigID.push($pr[i])
            //     }
            // }
        } else if (prevProps.open_tools !== this.props.open_tools) {
            if (this.props.open_tools !== null) {
                getSignalMaps([this.props.open_tools])
            }
        }

    }


}


const stt2prp = (state) => {
    return {
        user_changes: state.user_changes,
        last_ways_data: state.last_ways_data,
        focused_item: state.focused_item,
        sorting: state.sorting,

        maps_loaded: state.maps_loaded,


        loading: state.loading,

        server_response: state.server_response,
        get_last_trip: state.get_last_trip,

        is_first_lunch: state.is_first_lunch,

        download_queue: state.download_queue,
        in_queue: state.in_queue,
        downloading_number: state.downloading_number,
        request_video: state.request_video,

        open_tools: state.open_tools,
        signals_selected: state.signals_selected,

        allow_send: state.allow_send,


        train_id: state.train_id,
        train_list: state.train_list,
        device_id: state.device_id,
        device_list: state.device_list,

        section: state.section,

        duration: state.duration,
        calendar_range: state.calendar_range,
        customize_time_open_modal: state.customize_time_open_modal,
        utc_offset: state.utc_offset,


        signal_list: state.signal_list,
        map_central_point: state.map_central_point,
        map_points: state.map_points,

        notifications: state.notifications
    }
}
const dispatch2prp = (dispatch) => {
    return {

        set: (state, value) => dispatch({type: actionTypes.SET, state, value}),
        pushArray: (state, value) => dispatch({type: actionTypes.PUSH_ARRAY, state, value}),



        changeMapPoints: (id, points) => dispatch({type: actionTypes.CHANGE_MAP_POINTS, id, points}),
        setFocused: (item) => dispatch({type: actionTypes.SET_FOCUSED, item}),
        setBlurred: (item) => dispatch({type: actionTypes.SET_BLURRED, item}),


        addDownloadQueue: (queue) => dispatch({type: actionTypes.ADD_DOWNLOAD_QUEUE, queue}),
        downloadCompleted: (queue) => dispatch({type: actionTypes.DOWNLOAD_COMPLETED, queue}),
        setRequestVideo: (value) => dispatch({type: actionTypes.SET, state: 'request_video', value}),
        setDeviceTrips: (value) => dispatch({type: actionTypes.SET, state: 'device_trips', value}),
        setDownloadingNumber: (value) => dispatch({type: actionTypes.SET, state: 'downloading_number', value}),

        addNotification: (notification, id=null) => dispatch({type: actionTypes.ADD_NOTIFICATION, notification, id}),
        removeNotification: (id) => dispatch({type: actionTypes.REMOVE_NOTIFICATION, id}),
        setNotification: (id, element, value) => dispatch({type: actionTypes.SET_NOTIFICATION, element, value, id}),


    }
}

export default connect(stt2prp, dispatch2prp)(Index)


export function serverCallback(w, response, etc) {
    const $set = this.props.set

    $set('user_change', false)

    if (!response.ok) {
        const {status, error, description} = response
        $set('loading', false);
        this.setState({lastApi: {w, etc}})

        this.props.addNotification({
            type: 'error',
            children: <Aux>
                {description || error}
            </Aux>
        })

        if (status === 401) {
            this.setState({login_popup: true})
        }
    }
    else {
        const {result} = response
        switch (w) {
            /****** last_trip ******/
            case 'last_trip':
            case 'ways_data':

                this.props.set('loading_label', 'Processing data...')

                const {
                    train,
                    train_list,
                    device,
                    device_list,
                    duration,
                    section,
                    parameters,
                    sorting,
                    signals,
                    maps
                } = result;


                /** train list **/
                let $train_list = [];
                for (let ii = 0; ii < train_list.length; ii++) {
                    $train_list.push({
                        value: train_list[ii]['_id'],
                        name: train_list[ii]['name'],
                    })
                }
                $set('train_id', train['_id']);
                $set('train_name', train['name']);
                $set('train_list', $train_list);


                /** device list **/
                let $device_list = [];
                for (let ii = 0; ii < device_list.length; ii++) {
                    $device_list.push({
                        value: device_list[ii]['_id'],
                        name: device_list[ii]['name'],
                    });
                }

                $set('device_id', device['_id']);
                $set('device_name', device['name']);
                $set('device_list', $device_list);


                /** section **/
                $set('section', section);


                /** duration **/
                let du = [moment.utc(duration[0]), moment.utc(duration[1])]


                $set('duration', [du[0], du[1]]);
                $set('calendar_range', [
                    moment(duration[0]).local().startOf('day'),
                    moment(duration[1]).local().endOf('day').clone().add(1, 'millisecond')
                ]);


                /** signals **/
                let $signals = [], row, start, end
                for (let ii = 0; ii < signals.length; ii++) {
                    row = signals[ii]
                    start = moment(row.start)
                    end = moment(row.end)
                    $signals.push({
                        device: device.name,
                        properties: {
                            zig_zag: 0,
                            shock: 0,
                            shocks: row['shocks'],
                            height: 0
                        },
                        start_date: start,
                        end_date: end,
                        distance: '-',
                        duration: row['duration'],
                        points: row.points
                    })
                }
                $set('signal_list', $signals)


                // /** maps **/
                // let $maps = maps
                // $set('map_points', $maps)
                // if ($maps.length > 0) $set('map_central_point', [$maps[0]['lat'], $maps[0]['lon']])


                if (w === 'last_trip') {
                    $set('get_last_trip', true)
                    // this.props.setFocused('customize_time_modal')
                }


                /** maps **/
                $set('sorting', sorting);


                $set('signals_selected', [])
                $set('open_tools', null)
                $set('download_queue', [])
                $set('in_queue', [])
                $set('downloading_number', null)
                $set('request_video', null)
                $set('signal_detail', null)
                $set('maps_loaded', [])

                this.props.set('loading', false)
                break;


            case 'train_devices':
                const {devices} = result

                let $devices = []
                for (let i = 0; i < devices.length; i++) {
                    $devices.push({
                        name: devices[i].name,
                        value: devices[i]['_id']
                    })
                }
                $set('device_list', $devices)
                $set('device_id', null)
                $set('device_name', null)
                $set('focused_item', 'device_list')
                break;


            case 'devices_trips':
                const {trips} = result
                this.props.setDeviceTrips(trips || [])
                break


            case 'download_signal':

                this.props.setDownloadingNumber(this.props.downloading_number + 1)
                this.props.downloadCompleted(etc.queue)

                let {fileData, fileName, fileType} = result.file

                if (fileType === 'application/zip') fileData = new Uint8Array(fileData.data);

                const blob = new Blob([fileData]);
                const blobUrl = URL.createObjectURL(blob);

                this.setState({
                    blobUrl,
                    fileType,
                    fileName
                }, () => {
                    this.downloader.click()
                })
                break


            case 'request_video':
                this.props.setRequestVideo(null)
                if (this.props.open_tools === etc.id) $set('open_tools', null)
                this.props.addNotification({
                    type: 'success',
                    children: <Aux>
                        <b>Video request</b>
                        <br/>
                        {moment(etc.duration[0]).local(false).format("YYYY-MM-DD HH:mm") + " to " + moment(etc.duration[1]).local(false).format("YYYY-MM-DD HH:mm")}
                    </Aux>
                }, 'video-request_'+moment(etc.duration[0]).local(false).format("YYYY-MM-DD-HHmm"))
                break


            case 'signal_maps':
                const {points} = result
                for (let ii = 0; ii < points.length; ii++) {
                    this.props.changeMapPoints(points[ii].id, points[ii].rows)
                    this.props.pushArray('maps_loaded', [points[ii].id])
                }
                break


        }
    }
}


export function getLastTrip() {
    this.props.set('loading', true)
    Api.lastTrip().then((response) => {
        serverCallback('last_trip', response)
    })
}


export function getWaysData() {
    this.props.set('loading', true)
    this.props.set('loading_label', 'Getting Data...')

    const body = {
        train: this.props.train_id,
        device: this.props.device_id,
        duration: this.props.duration,
        section: this.props.section,
        sorting: this.props.sorting,
        parameters: {}
    }

    Api.getWaysData(body).then((response) => {
        serverCallback('ways_data', response)
    })

}

export function getTrainDevices() {
    this.props.set('loading', true)
    this.props.set('loading_label', '')
    Api.getTrainDevices(this.props.train_id).then((response) => {
        serverCallback('train_devices', response)
        this.props.set('loading', false)
    })
}


export function getMyDevicesTrips() {
    Api.getMyDevicesTrips({duration: this.props.calendar_range})
        .then((response) => {
            serverCallback('devices_trips', response)
        })
}


export function downloadSignal(queue) {

    let body = {
        train: this.props.train_id,
        device: this.props.device_id,
        utc_offset: moment().utcOffset()
    }
    let qq = []
    let ff = {}
    for (let ii = 0; ii < queue.length; ii++) {
        ff = this.props.signal_list[queue[ii]]
        qq.push([
            moment(ff.start_date).utc(false),
            moment(ff.end_date).utc(false)
        ])
    }
    body.utc_offset = moment(ff.start_date).utc(false).utcOffset()
    body['signals'] = qq
    Api.downloadSignal(body)
        .then((response) => {
            serverCallback('download_signal', response, {queue})
        })

}


export function requestVideo() {
    const tt =this.props.request_video
    let ff = this.props.signal_list[tt]
    let data = {
        train: this.props.train_id,
        device: this.props.device_id,
        duration: [
            moment(ff.start_date).utc(false),
            moment(ff.end_date).utc(false)
        ]
    }
    Api.requestVideo(data)
        .then((response) => {
            serverCallback('request_video', response, {duration: data.duration, id: tt})
        })
}


export function getSignalMaps(signals = []) {

    let body = {
        train: this.props.train_id,
        device: this.props.device_id
    }

    let qq = []
    let ff = {}
    for (let ii = 0; ii < signals.length; ii++) {
        ff = this.props.signal_list[signals[ii]]
        qq.push({
            id: signals[ii],
            duration: [
                moment(ff.start_date).utc(false),
                moment(ff.end_date).utc(false)
            ]
        })
    }
    body['signals'] = qq

    Api.getMap(body)
        .then((response) => {
            serverCallback('signal_maps', response, {signals})
        })
}


