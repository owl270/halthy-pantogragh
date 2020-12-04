import * as actionTypes from './actions';
import config from './../config';
import store from './store';

const initialState = {
    ...config,
    ...store
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.OVERLAY:
            return {
                ...state,
                overlay: action.overlay
            };
        case actionTypes.ACCOUNT:
            return {
                ...state,
                account: action.account
            };
        case actionTypes.PANEL_LOADED:
            return {
                ...state,
                panelLoad: action.panelLoad
            };
        case actionTypes.REDIRECT:
            return {
                ...state,
                redirect: action.redirect
            };

        case actionTypes.REFRESH_DATA:
            return {
                ...state,
                refresh_data: [true]
            };
        default:
            return state;
    }
};

export default reducer;