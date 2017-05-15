import { GET_POSTS, NEW_POST, EDIT_POST, DELETE_POST, CHANGE_STATUS, FILTER_POSTS } from '../actions/list';

const postReducer = (state = {}, action) => {

    console.log(action);
    switch (action.type) {
        case NEW_POST:
            return {
                id: action.id,
                title: action.data.text,
                author: action.data.author,
                text: action.data.text,
                tags: action.data.tags,
                status: action.data.status,
                date: action.data.date
            };

        case EDIT_POST:
            if (state.id !== action.post.id) {
                return state;
            }
            return Object.assign({}, { ...action.post });

        case CHANGE_STATUS:
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, { status: action.status });
        default: // GET_POSTS
            return state;
    }
};

const postsReducer = (state = [], action) => {
    switch (action.type) {
        case NEW_POST:
            let st = [
                ...state,
                postReducer(undefined, action)
            ];
            console.log(st);
            return [
                ...state,
                postReducer(undefined, action)
            ];

        case EDIT_POST:
            return state.map(post =>
                postReducer(post, action)
            );

        case CHANGE_STATUS:
            return state.map(post =>
                postReducer(post, action)
            );

        case DELETE_POST:
            return state.filter(post =>
                post.status !== action.status
            );

        default:
            return state;
    }
};

export default postsReducer;