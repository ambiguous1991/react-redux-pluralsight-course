import { LOAD_AUTHORS_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
    if (action.type === LOAD_AUTHORS_SUCCESS) {
        return action.authors;
    }
    return state;
}
