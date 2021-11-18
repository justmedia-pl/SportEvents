import {LOGIN_REQUEST,SUCCESS,FAILURE} from './authTypes';

export const authUser = (login,password) => {
    return dispatch => {
        dispatch(loginRequest());

    }
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};
const success = () => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
};
const failure = () => {
    return {
        type: FAILURE,
        payload: isLoggedIn
    };
};
