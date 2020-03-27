import * as courseAPI from '../../api/courseApi';
import {
    CREATE_COURSE_SUCCESS,
    DELETE_COURSE_OPTIMISTIC,
    LOAD_COURSES_SUCCESS,
    UPDATE_COURSE_SUCCESS,
} from './actionTypes';
import { apiCallError, beginApiCall } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
    return { type: DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
    return dispatch => {
        dispatch(beginApiCall());
        return courseAPI
            .getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    };
}

export function saveCourse(course) {
    return dispatch => {
        dispatch(beginApiCall());
        return courseAPI
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    };
}

export function deleteCourse(course) {
    return dispatch => {
        dispatch(deleteCourseOptimistic(course));
        return courseAPI.deleteCourse(course.id);
    };
}
