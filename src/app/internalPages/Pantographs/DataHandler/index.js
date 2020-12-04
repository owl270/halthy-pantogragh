import * as actionTypes from "./_actions";
import initialState from "./_initialState"

import update from "react-addons-update";


import * as moment from "moment";


export const isDisabled = (state, item) => {
    if (state['loading']) return true;


    if (item === 'section_distance') {
        if (state.section.type !== 'by_distance') {
            return true
        }
    } else if (item === 'section_time') {
        if (state.section.type !== 'by_time') {
            return true
        }
    } else if (item === 'download_signals') {
        if (state.signal_list.length === 0 || state.signals_selected.length === 0) {
            return true
        }
    } else if (item === 'sorting') {
        if (state.signal_list.length === 0) {
            return true
        }
    } else if (item === 'select_all') {
        if (state.signal_list.length === 0) {
            return true
        }
    }
    return false
}

export const isFocused = (state, item) => {
    if (!state.device_id) {
        if (item === 'device_list') return true
    }
    return state['focused_item'] === item;
}


const reducer = (state = initialState, action) => {
    let $state = {...state}

    let {queue} = action


    const set = (_state, _value) => {
        $state[_state] = _value
    }

    const setArray = (_state, _value, _element) => {
        $state[_state] = update($state[_state], {[_element]: {$set: _value}})
    }

    const pushArray = (_state, _value) => {
        $state[_state] = update($state[_state], {$push: _value})
    }




    const spliceArray = (_state, _element) => {
        $state[_state] = update($state[_state], {$splice: [[_element, 1]]})
    }

    const addUserChange = (item) => {
        pushArray('user_changes', [item])
    }


    const changeMapPoints = (id, points) => {
        $state['signal_list'] = update($state['signal_list'], {[id]: {'points': {$set: points}}})
    }


    const addNotification = (action) => {
        let $id = action.id
        let done = false
        if($id){
            if($state.notifications_keys.includes($id)){
                const index = $state.notifications_keys.indexOf($id)
                $state['notifications'] = update($state['notifications'], {[index]: {emphasize: {$set: [true]}}})
                done = true
            }
        }
        else $id = "notify_" + new Date().getTime()

        if(!done) {
            pushArray('notifications', [action.notification])
            pushArray('notifications_keys', [$id])
        }
    }





    switch (action.type) {
        case actionTypes.SET:
            set(action.state, action.value);
            break;

        case actionTypes.SET_ARRAY:
            setArray(action.state, action.value, action.element);
            break;


        case actionTypes.PUSH_ARRAY:
            pushArray(action.state, action.value);
            break;

        case actionTypes.CHANGE_TRAIN:
            if (action.value !== $state.train_id) {
                let train = $state.train_list.filter((item) => {
                    return Object.keys(item).some((key) => {
                        return action.value === item[key];
                    })
                })[0];
                set('train_id', train.value);
                set('train_name', train.name);
                addUserChange('train')
            }

            break;

        case actionTypes.CHANGE_DEVICE:
            if (action.value !== $state.device_id) {
                let device = $state.device_list.filter((item) => {
                    return Object.keys(item).some((key) => {
                        return action.value === item[key];
                    })
                })[0];
                set('device_id', device.value);
                set('device_name', device.name);
                addUserChange('device')
            }
            break;

        case actionTypes.CHANGE_LOCATION:
            set('location', action.value);
            break;


        case actionTypes.CHANGE_SECTION_TYPE:
            if (action.value !== $state.section.type) {
                if (action.value === 'by_distance') {
                    addNotification({
                        id: 'distance_section_disabled',
                        notification: {
                            type: 'warning',
                            children: 'This feature is disabled'
                        }
                    })
                }
                else {
                    setArray('section', action.value, 'type')
                    addUserChange('section_type')
                }
            }

            break;


        case actionTypes.CHANGE_SECTION_TIME:
            if (action.value !== $state.section.time) {
                setArray('section', action.value, 'time')
                addUserChange('section_time')
            }
            break;


        case actionTypes.CHANGE_SECTION_DISTANCE:
            if (action.value !== $state.section.time) {
                setArray('section', action.value, 'distance')
                addUserChange('section_distance')
            }
            break;


        case actionTypes.CHANGE_PARAMETER_FILTERING:
            const $v = action.value
            const $s = $state.parameters_filtering


            const eq = $v.shock_point.active === $s.shock_point.active &&
                $v.shock_point.range === $s.shock_point.range &&
                $v.zig_zag.active === $s.zig_zag.active &&
                $v.zig_zag.range === $s.zig_zag.range &&
                $v.height.active === $s.height.active &&
                $v.height.range === $s.height.range


            if (!eq) {
                set('parameters_filtering', $v);
                addUserChange('parameters_filtering')
            }
            break;


        case actionTypes.TOGGLE_MAP_RAILWAY:
            set('map_railway_active', action.value);
            break;

        case actionTypes.TOGGLE_MAP_CITY_BORDER:
            set('map_city_border_active', action.value);
            break;

        case actionTypes.TOGGLE_MAP_CITY_NAME:
            set('map_city_name_active', action.value);
            break;


        case actionTypes.CHANGE_DURATION:
            const $dv = action.value
            const $ds = $state.duration

            const ee = $dv[0] === $ds[0] && $dv[1] === $ds[1]

            if (!ee) {
                set('duration', action.value);
                addUserChange('duration')
            }
            break;

        case actionTypes.CHANGE_TIMING:


            if (action.value !== $state.timing) {

                let unit = null
                if (action.value === '1D') unit = 'day'
                else if (action.value === '1W') unit = 'week'
                else if (action.value === '1M') unit = 'month'

                if (unit !== null) {
                    let now = moment()
                    set('duration', [
                        now.clone().subtract(1, unit),
                        now.clone()
                    ])
                    set('calendar_range', [
                        now.clone().local().subtract(1, unit).startOf('day'),
                        now.clone().local().endOf('day').add(1, 'millisecond')
                    ])
                    set('timing', action.value);
                    addUserChange('duration')
                }
                else {
                    set('timing', 'custom');
                }
            }
            break;

        case actionTypes.CHANGE_CALENDAR_RANGE:
            set('calendar_range', action.value);
            break;

        case actionTypes.CHANGE_SORTING:
            if (action.value !== $state.sorting) {
                set('sorting', action.value);
                addUserChange('sorting')
            }
            break;

        case actionTypes.CHANGE_OPEN_TOOL:
            set('open_tools', action.value);
            break;

        case actionTypes.CLOSE_OPEN_TOOL:
            set('open_tools', null);
            break;

        case actionTypes.SELECT_SIGNAL:
            if (action.value) {
                pushArray('signals_selected', [action.ID])
            } else {
                const selected = $state.signals_selected.indexOf(action.ID)
                spliceArray('signals_selected', selected)
            }
            break;

        case actionTypes.SELECT_ALL:
            if ($state.signals_selected.length > 0) {
                $state.signals_selected = []
            } else {
                $state.signals_selected = [...$state.signal_list.keys()]
            }
            break;

        case actionTypes.SET_FOCUSED:
            set('focused_item', action.item)
            break;

        case actionTypes.SET_BLURRED:
            set('focused_item', null)
            break;


        case actionTypes.ADD_DOWNLOAD_QUEUE:
            if (typeof action.queue !== "object") action.queue = [action.queue]
            let shQu = action.queue
            // for (let ii = 0; ii < action.queue.length; ii++) {
            //     if (!$state.in_queue.includes(queue[ii])) shQu.push(queue[ii])
            // }
            if (shQu.length > 0) {
                pushArray('download_queue', [shQu])
                pushArray('in_queue', shQu)
            }
            break

        case actionTypes.DOWNLOAD_COMPLETED:
            $state.in_queue = $state.in_queue.filter((val, index) => {
                return !queue.includes(val)
            })
            break

        case actionTypes.CHANGE_MAP_POINTS:
            changeMapPoints(action.id, action.points)
            break


        case actionTypes.REQUEST_VIDEO:
            if (!$state.request_video) {
                set('request_video', action.value)
            }
            break

        case actionTypes.SIGNAL_DETAIL:
            if (action.value === null) set('signal_detail', null)
            else if (!$state.signal_detail) {
                const s = $state.signal_list[action.value]
                set('signal_detail', [s.start_date, s.end_date])
            }
            break





        case actionTypes.ADD_NOTIFICATION:
            addNotification(action)
            break

        case actionTypes.REMOVE_NOTIFICATION:
            if($state.notifications_keys.includes(action.id)){
                const index = $state.notifications_keys.indexOf(action.id)
                // $state['notifications'] = update($state['notifications'], {$splice: [[index, 1]]})
                // $state['notifications_keys'] = update($state['notifications_keys'], {$splice: [[index, 1]]})
            }
            break

        case actionTypes.SET_NOTIFICATION:
            if($state.notifications_keys.includes(action.id)){
                const index = $state.notifications_keys.indexOf(action.id)
                $state['notifications'] = update($state['notifications'], {[index]: {[action.element]: {$set: action.value}}})
            }
            break


        default:
            break
    }


    return $state

};

export default reducer;