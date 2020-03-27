import * as courseAPI from '../../api/courseApi';
import {
    CREATE_COURSE_SUCCESS,
    LOAD_COURSES_SUCCESS,
    UPDATE_COURSE_SUCCESS,
} from './actionTypes';

export function loadCoursesSuccess(courses) {
    return { type: LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return dispatch => {
        return courseAPI
            .getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function saveCourse(course) {
    return dispatch => {
        return courseAPI
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                throw error;
            });
    };
}
