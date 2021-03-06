import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ButtonToolbar, Button, Form, FormGroup } from 'react-bootstrap';

import { newPost, editPost } from '../actions';

import FieldGroup from './common/field-group';

const getVisiblePosts = (posts, filter) => {
    const filteredPosts = posts.filter(post => filter === 'All' ? true : post.status === filter).sort(compare).slice(0, 15);
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
        newPost: (postData) => {
            dispatch(newPost(postData));
        },
        editPost: (postData) => {
            dispatch(editPost(postData));
        },
        redirect: (url) => {
            dispatch(push(url));
        }
    })
)
export default class Home extends React.Component {
    static propTypes = {
        newPost: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired,
        redirect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            author: '',
            text: '',
            tags: '',
            status: 'Active',
            date: new Date()
        };
    }

    componentWillReceiveProps = (nextProps) => {
        const post = this._filterPosts(nextProps);
        if (post.length > 0)
            this.setState(post[0]);
    }
    componentWillMount = () => {

    }
    componentDidMount = () => {
        const post = this._filterPosts(this.props);
        if (post.length > 0)
            this.setState(post[0]);
    }

    render() {
        return (
            <div className="col-sm-6 col-md-6 col-lg-6">
                <Form>
                    {<FieldGroup id='formTitle' label='Title' type='text' placeholder="Enter title" value={this.state.title} onChange={(e) => this._handleOnChange(e, 'title')} />}
                    {<FieldGroup id='formAuthor' label='Author' type='text' placeholder="Enter author" value={this.state.author} onChange={(e) => this._handleOnChange(e, 'author')} />}
                    {<FieldGroup id='formText' label='Text' type='text' placeholder="Enter text" componentClass="textarea" value={this.state.text} onChange={(e) => this._handleOnChange(e, 'text')} />}
                    {<FieldGroup id='formTags' label='Tags' type='text' placeholder="Enter tags" value={this.state.tags} onChange={(e) => this._handleOnChange(e, 'tags')} />}
                    {<FieldGroup id='formStatus' label='Status' type='' placeholder="Enter status" componentClass="select" value={this.state.status} onChange={(e) => this._handleOnChange(e, 'status')}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </FieldGroup>}

                    <ButtonToolbar>
                        <Button type="submit" bsStyle="success" onClick={(e) => this._handleOnSubmit(e)}>
                            Submit
                        </Button>
                        <Button type="reset" bsStyle="warning" onClick={(e) => this._handleReset(e)}>
                            Reset
                        </Button>
                        <Button type="button" bsStyle="danger" onClick={(e) => this._handleCancel(e)}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </div>
        );
    }

    _filterPosts = (props) => {
        return props.posts.filter(post => post.id == props.match.params.id)
    }

    _handleOnChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    }

    _handleReset = (e) => {
        this.setState({
            title: '',
            author: '',
            text: '',
            tags: '',
            status: 'Active',
            date: new Date()
        });
    }

    _handleCancel = (e) => {
        this.props.redirect('/');
    }

    _handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.id);
        if (this.state.id) {
            this.props.editPost(this.state);
            this.props.redirect(`/posts/${this.state.id}`);
        }
        else {
            this.props.newPost(this.state);
            this.props.redirect('/');
        }

        this._handleReset();

    }
}

