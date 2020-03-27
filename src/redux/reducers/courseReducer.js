import {
    CREATE_COURSE_SUCCESS,
    DELETE_COURSE_OPTIMISTIC,
    LOAD_COURSES_SUCCESS,
    UPDATE_COURSE_SUCCESS,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case CREATE_COURSE_SUCCESS:
            return [...state, { ...action.course }];
        case UPDATE_COURSE_SUCCESS:
            return state.map(course =>
                course.id === action.course.id ? action.course : course
            );
        case LOAD_COURSES_SUCCESS:
            return action.courses;
        case DELETE_COURSE_OPTIMISTIC:
            return state.filter(course => course.id !== action.course.id);
    }
    return state;
}
