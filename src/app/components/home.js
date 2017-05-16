import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import { filterPosts, deletePost } from '../actions';

import FilterChooser from './filter-chooser';
import Posts from './posts';

const styles = {
    col: {
        textAlign: 'center'
    }
}

@connect(
    state => ({
        filter: state.filterPosts
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
    static propTypes = {
        filterPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-sm-8 col-md-8 col-lg-8">
                <div className='row'>
                    <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2" style={styles.col}>
                        <h4>Posts</h4>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={styles.col}>
                        <FilterChooser {...this.props} />
                    </div>
                    <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2" style={styles.col}>
                        <LinkContainer to='/post'>
                            <Button bsStyle="primary" title='New post'>New</Button>
                        </LinkContainer>
                    </div>
                </div>
                <div className='row'>
                    <Posts list />
                </div>
            </div>
        );
    }
}

