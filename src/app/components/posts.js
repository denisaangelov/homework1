import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, ButtonToolbar, Button, Glyphicon, ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import dateFormat from 'dateformat';

import { editPost, filterPosts, deletePost } from '../actions';

const styles = {
    span: {
        width: '100%',
        display: 'block',
        marginBottom: '5px'
    }
}

const getVisiblePosts = (posts, filter) => {
    const filteredPosts = posts.filter(post => filter === 'All' ? true : post.status === filter).sort(compare); //.slice(0, 15)
    return filteredPosts;
};
const compare = (a, b) => {
    return b.date - a.date;
}

@connect(
    state => ({
        posts: getVisiblePosts(state.posts, state.filterPosts)
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
export default class Posts extends React.Component {
    static propTypes = {
        editPost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            activePost: (this.props.list) ? '' : this.props.location.pathname.split('/')[2]
        }
    }

    render() {
        let posts = this.props.list ? this.props.posts.slice(0, 15) : this.props.posts;

        let result = null;
        if (posts.length)
            result = (
                <ListGroup>
                    {posts.map(post => {
                        let date = dateFormat(post.date, 'dd.mm.yyyy');
                        let isActive = post.status === 'Active';
                        let toolbar = (this.props.list
                            ?
                            <span className='pull-right' >
                                <Label bsStyle={isActive ? "success" : "warning"}>{post.status}</Label>
                            </span>
                            :
                            <ButtonToolbar className='pull-right'>
                                <Button type="button" bsStyle="warning" bsSize="small" onClick={(e) => this._handleEdit(e, post.id)} title='Edit'>
                                    <Glyphicon glyph='edit' />
                                </Button>
                                <Button type="button" bsStyle="danger" bsSize="small" onClick={(e) => this._handleDelete(e, post.id)} title='Delete'>
                                    <Glyphicon glyph='remove' />
                                </Button>
                            </ButtonToolbar>);
                        let header = (
                            <div style={{ borderBottom: '1px solid black' }}>
                                <span style={{ fontSize: '18px' }}>{post.id}.{post.title}</span>

                                {toolbar}

                                <span className='pull-right' style={{ fontSize: '16px', paddingRight: '5px' }}><Glyphicon glyph='time' />
                                    {date}
                                </span>
                            </div>
                        )

                        let text = (this.props.list) ? post.text.slice(0, 150).concat('...') : post.text;
                        return (
                            <ListGroupItem key={post.id} active={this.state.activePost == post.id} header={header} href='#' bsStyle={isActive ? 'success' : 'warning'} title={post.status} type='div'>
                                <span style={styles.span}>
                                    <Glyphicon glyph='user' />
                                    {post.author}
                                </span>
                                <span style={styles.span}>
                                    {text}
                                </span>
                                <span style={styles.span}>
                                    tags: {post.tags}
                                </span>
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