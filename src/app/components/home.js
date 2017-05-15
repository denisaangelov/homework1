import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import { filterPosts, deletePost } from '../actions';

import FilterChooser from './filter-chooser';
import ListPosts from './list-posts';

const styles = {
    col: {
        textAlign: 'center'
    }
}

@connect(
    state => ({
        filter: state.filterPosts,
        selectedPost: state.selectedPost
    }),
    dispatch => ({
        filterPosts: (filter) => {
            dispatch(filterPosts(filter));
        },
        deletePost: (id) => {
            dispatch(deletePost(id));
        }
    })
)
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.pathname.split('/')[2]);
    }

    render() {
        return (
            <div className="col-sm-6 col-md-6 col-lg-6">
                <div className='row'>
                    <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2" style={styles.col}>
                        <h4>Posts</h4>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={styles.col}>
                        <FilterChooser {...this.props} />
                    </div>
                    <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2" style={styles.col}>
                        <LinkContainer to='/post'>
                            <Button bsStyle="primary">New</Button>
                        </LinkContainer>
                    </div>
                </div>
                <div className='row'>
                    <ListPosts activePost={this.props.location.pathname.split('/')[2]} />
                </div>
            </div>
        );
    }
}

