import { EDIT_POST } from '../actions/list';
const selectedPost = (state = null, action) => {
    switch (action.type) {
        case EDIT_POST:
            return action.post;
        default:
            return state;
    }
};

export default selectedPost;