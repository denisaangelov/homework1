import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, ButtonToolbar, Button, Glyphicon, ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import dateFormat from 'dateformat';

import { editPost, filterPosts, deletePost } from '../actions';

const getVisiblePosts = (posts, filter) => {
    const filteredPosts = posts.filter(post => filter === 'All' ? true : post.status === filter).sort(compare).slice(0, 15);
    return filteredPosts;
};
const compare = (a, b) => {
    return b.date - a.date;
}

@connect(
    state => ({
        posts: getVisiblePosts(state.posts, state.filterPosts),
        selectedPost: state.selectedPost
    }),
    dispatch => ({
        editPost: (url) => {
            dispatch(push(url));
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
        this.state = {
            activePost: props.activePost
        }
    }

    render() {
        let { posts } = this.props;
        let result = null;
        if (posts.length)
            result = (
                <ListGroup>
                    {posts.map(post => {
                        let date = dateFormat(post.date, 'dd.mm.yyyy');
                        let isActive = post.status === 'Active';
                        let header = (
                            <div style={{ borderBottom: '1px solid black' }}>
                                <span style={{ fontSize: '22px' }}>{post.id}.{post.title}</span>

                                <ButtonToolbar className='pull-right'>
                                    <Button type="button" bsStyle="warning" onClick={(e) => this._handleEdit(e, post.id)} title='Edit'>
                                        <Glyphicon glyph='edit' />
                                    </Button>
                                    <Button type="button" bsStyle="danger" onClick={(e) => this._handleDelete(e, post.id)} title='Delete'>
                                        <Glyphicon glyph='remove' />
                                    </Button>
                                </ButtonToolbar>
                                <span className='pull-right' style={{ fontSize: '22px', paddingRight: '5px' }}><Glyphicon glyph='time'>{date}</Glyphicon></span>
                            </div>
                        )
                        return (
                            <ListGroupItem key={post.id} active={this.state.activePost == post.id} header={header} href='#' bsStyle={isActive ? 'success' : 'warning'} title={post.status}>
                                {post.text.slice(0, 150).concat('...')}
                            </ListGroupItem>
                        )
                    }
                    )}
                </ListGroup>
            )
        return result;
    }

    _handleOnClick = (e) => {
        e.preventDefault();
    }

    _handleEdit = (e, id) => {
        e.preventDefault();
        const flag = this.state.activePost !== id;
        this.setState({
            activePost: (flag) ? id : ''
        });
        this.props.editPost(flag ? `/post/${id}` : '/');
    }

    _handleDelete = (e, id) => {
        e.preventDefault();
        this.props.deletePost(id);
    }
}
{/*<Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Text</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post =>
                            (
                                <tr key={post.id} onClick={(e) => this._handleOnRowClick(e)}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.author}</td>
                                    <td>{post.text}</td>
                                    <td>{post.status}</td>
                                    <th>
                                        <ButtonToolbar>
                                            <Button type="button" bsStyle="warning" onClick={(e) => this._handleEdit(e)}>
                                                <Glyphicon glyph='edit' />
                                            </Button>
                                            <Button type="button" bsStyle="danger" onClick={(e) => this._handleDelete(e)}>
                                                <Glyphicon glyph='Delete' />
                                            </Button>
                                        </ButtonToolbar>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>*/}
