import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Home from '../home';
import Post from '../post';

@withRouter
@connect()
export default class Container extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <Route path="/" component={Home} />
                    <Route path="/post/:id?" component={Post} />
                    <Route path="/posts" render={() => <div>postsp</div>} />
                </div>
            </div>
        );
    }
};