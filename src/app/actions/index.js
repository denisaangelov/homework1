let nextPostId = 0;

import { GET_POSTS, NEW_POST, EDIT_POST, DELETE_POST, CHANGE_STATUS, FILTER_POSTS } from './list';

export const newPost = (data) => ({
    type: NEW_POST,
    id: nextPostId++,
    data
});

export const selectedPost = (post) => ({
    type: EDIT_POST,
    post
});

export const editPost = (post) => ({
    type: EDIT_POST,
    post
});

export const changeStatus = (id, status) => ({
    type: CHANGE_STATUS,
    id,
    status
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    id
});

export const getPosts = () => ({
    type: GET_POSTS
});

export const filterPosts = (filter) => ({
    type: FILTER_POSTS,
    filter
})