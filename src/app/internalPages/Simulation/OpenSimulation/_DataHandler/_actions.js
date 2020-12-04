// general

export const isDisabled = (state, action) => {
    if(state['disabled_all']) return true
    //
    return false
}



// getter

export const isNewCatenaryModalOpen = (state, catenary) => {
    return state['new_catenary_modal_open'] === catenary;
}





// setter


export const set = (dispatch, state, value) => {
    return dispatch({type: 'SET', state, value});
}

export const addNotification = (dispatch, value) => {
    return dispatch({type: 'ADD_NOTIFY', value});
}


export const setProject = (dispatch, value) => {
    return set(dispatch, 'project', value);
}

export const setProjectName = (dispatch, name) => {
    return dispatch({type: 'SET_PROJECT_NAME', name});
}

export const setProjectStaticModelingValues = (dispatch, id, label, value) => {
    return dispatch({type: 'SET_PROJECT_STATIC_MODELING_VALUES', id, label, value});
}

export const addProjectStaticModelingSpan = (dispatch, data) => {
    return dispatch({type: 'ADD_PROJECT_STATIC_MODELING_SPAN', data});
}

export const removeProjectStaticModelingSpan = (dispatch, id) => {
    return dispatch({type: 'REMOVE_PROJECT_STATIC_MODELING_SPAN', id});
}


export const setControlMenuSubOpen = (dispatch, value) => {
    return dispatch({type: 'OPEN_SUB_CONTROL_MENU', value});
}

export const setActiveTab = (dispatch, tab) => {
    return set(dispatch, 'active_tab', tab);
}

export const setActiveStaticModelingTab = (dispatch, tab) => {
    return set(dispatch, 'static_modeling_active_tab', tab);
}