

export default {
    loading: false,
    loading_label: 'Getting Last Trip...',

    user_changes: [],

    get_last_trip: false,



    focused_item: '',


    location_list: [
        {
            name: "Germany",
            value: "germany"
        },
        {
            name: "Iran",
            value: "iran"
        }
    ],
    location: 'iran',



    train_list: [],
    train_id: 1,
    train_name: '',

    device_list: [],
    device_id: null,
    device_name: '',

    calendar_range: [null,null],
    timing: 'custom',
    duration: [null,null],
    device_trips: [],

    section: {
        type: 'by_time',
        time: 2,
        distance: 8
    },


    parameters_filtering: {
        shock_point: {
            active: false,
            range: "0,180"
        },
        zig_zag: {
            active: false,
            range: "0,180"
        },
        height: {
            active: false,
            range: "0,180"
        }
    },



    sorting_list: [
        {
            name: "start->end",
            value: "start_end"
        },
        {
            name: "end->start",
            value: "end_start"
        },
        {
            name: "shock point",
            value: "shock_point"
        }
    ],
    sorting: 'start_end',


    signal_list: [],
    signals_selected: [],
    open_tools: null,
    signal_highlight: null,
    maps_loaded: [],


    download_queue: [],
    in_queue: [],
    downloading_number: null,

    request_video: null,

    signal_detail: null,


    map_railway_active: true,
    map_city_border_active: true,
    map_city_name_active: false,


    map_central_point: [],
    map_points: [],
    full_map: false,

    notifications_keys: [],
    notifications: []


}
;