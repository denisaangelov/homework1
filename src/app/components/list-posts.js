import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';

import { editPost, filterPosts, deletePost } from '../actions';

import FilterChooser from './filter-chooser';

const getVisiblePosts = (posts, filter) => {
    const filteredPosts = posts.filter(post => filter === 'All' ? true : post.status === filter);
    return filteredPosts;
};

@connect(
    state => ({
        posts: getVisiblePosts(state.posts, state.filterPosts),
        selectedPost: state.selectedPost
    }),
    dispatch => ({
        editPost: (post) => {
            dispatch(editPost(post));
        },
        deletePost: (id) => {
            dispatch(deletePost(id));
        }
    })
)
export default class ListPosts extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        let { posts } = this.props;
        let result = null;
        if (posts.length)
            result = (
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Text</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post =>
                            (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.author}</td>
                                    <td>{post.text}</td>
                                    <td>{post.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            )
        return result;
    }
}

