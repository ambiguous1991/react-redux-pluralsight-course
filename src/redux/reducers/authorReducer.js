import { LOAD_AUTHORS_SUCCESS } from '../actions/actionTypes';

export default function authorReducer(state = [], action) {
	if (action.type === LOAD_AUTHORS_SUCCESS) {
		return action.authors;
	}
	return state;
}
