let nextPostId = 15;

import { NEW_POST, EDIT_POST, DELETE_POST, FILTER_POSTS } from './list';

export const newPost = (data) => ({
    type: NEW_POST,
    id: (data.id) ? data.id : nextPostId++,
    data
});

export const editPost = (post) => ({
    type: EDIT_POST,
    post
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    id
});

export const filterPosts = (filter) => ({
    type: FILTER_POSTS,
    filter
})