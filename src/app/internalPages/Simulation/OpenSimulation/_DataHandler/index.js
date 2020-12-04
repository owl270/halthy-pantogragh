import initialState from "./_initialState"

import update from "react-addons-update";



const reducer = (state = initialState, action) => {
    let $state = {...state}

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


    // if(actions.isDisabled($state, action)) return $state;

    switch (action.type) {

        case 'SET':
            set(action.state, action.value);
            break;

        case 'SET_ARRAY':
            setArray(action.state, action.value, action.element);
            break;

        case 'ADD_NOTIFY':
            pushArray('notifications', [action.value])
            break;

        case 'OPEN_SUB_CONTROL_MENU':
            if(action.value!==$state.open_control_menu_sub) set('open_control_menu_sub', action.value);
            else set('open_control_menu_sub', null);
            break;




        case 'SET_PROJECT_NAME':
            $state['project'] = update($state['project'], {name: {$set: action.name}})
            break;

        case 'SET_PROJECT_STATIC_MODELING_VALUES':
            $state['project'] = update($state['project'], {static_modeling: {[action.id]: {[action.label]: {$set: action.value}}}})
            break;

        case 'ADD_PROJECT_STATIC_MODELING_SPAN':
            $state['project'] = update($state['project'], {static_modeling: {$push: [action.data]}})
            $state['static_modeling_active_tab'] = $state['project']['static_modeling'].length - 1
            break;

        case 'REMOVE_PROJECT_STATIC_MODELING_SPAN':
            $state['project'] = update($state['project'], {static_modeling: {$splice: [[action.id, 1]]}})
            $state['static_modeling_active_tab'] = 0
            break;

        default:
            break
    }


    return $state

};

export default reducer;