import { BEGIN_API_CALL } from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiStatusReducer(
    state = initialState.apiCallsInProgress,
    action
) {
    if (action.type === BEGIN_API_CALL) {
        return ++state;
    } else if (actionTypeEndsInSuccess(action)) {
        return --state;
    }
    return state;
}
