import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    if (action.type === CREATE_COURSE) {
        return [...state, { ...action.course }];
    } else if (action.type === LOAD_COURSES_SUCCESS) {
        return action.courses;
    }
    return state;
}
