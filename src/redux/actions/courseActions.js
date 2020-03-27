import * as courseAPI from '../../api/courseApi';
import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from './actionTypes';

export function createCourse(course) {
    return { type: CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses) {
    return { type: LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
    return function (dispatch) {
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
