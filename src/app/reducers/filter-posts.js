import { FILTER_POSTS } from '../actions/list';

const filterPosts = (state = 'All', action) => {
    switch (action.type) {
        case FILTER_POSTS:
            return action.filter;
        default:
            return state;
    }
};

export default filterPosts;