import * as authorAPI from '../../api/authorApi';
import { LOAD_AUTHORS_SUCCESS } from './actionTypes';

export function loadAuthorsSuccess(authors) {
    return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function (dispatch) {
        return authorAPI
            .getAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors));
            })
            .catch(error => {
                throw error;
            });
    };
}
