import * as authorAPI from '../../api/authorApi';
import { LOAD_AUTHORS_SUCCESS } from './actionTypes';
import { beginApiCall } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
    return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall());
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
