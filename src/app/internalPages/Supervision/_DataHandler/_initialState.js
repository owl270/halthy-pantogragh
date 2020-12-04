import moment from "moment";

export default {
    loading: false,
    loading_label: 'Getting Information...',

    loading_video: false,
    loading_signal: false,

    showing_number: 0,

    signal_selected: [],

    interval_time: 1000,


    device_acceleration: 0,

    add_figure_open: false,
    figure_properties: null,
    videos: [],
    map_points: [],

    figures: [],
    video_blob: '',

    playing: false,
    current_time: 0,

    request_video: null,


};