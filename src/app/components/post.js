import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ButtonToolbar, Button, Form, FormGroup } from 'react-bootstrap';

import { newPost } from '../actions';

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
        redirect: (url) => {
            dispatch(push(url));
        }
    })
)
export default class Home extends React.Component {
    static propTypes = {
        newPost: PropTypes.func.isRequired,
        redirect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const post = this._filterPosts();
        console.log(post);
        const s = (post.length > 0) ? post[0] : {
            title: '',
            author: '',
            text: '',
            tags: '',
            status: 'Active',
            date: new Date()
        };
        this.state = s;
    }

    _filterPosts = () => {
        return this.props.posts.filter(post => post.id == this.props.match.params.id)
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
            status: 'Active'
        });
    }

    _handleCancel = (e) => {
        this.props.redirect('/');
    }

    _handleOnSubmit = (e) => {
        e.preventDefault();

        this.props.newPost(this.state);

        this._handleReset();

        // this.props.redirect('/');
    }
}

