import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Home from '../home'

@withRouter
@connect()
export default class Header extends React.Component {
    render() {
        return (
            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/new" render={() => <div>newp</div>} />
                <Route path="/posts" render={() => <div>postsp</div>} />
            </div>
        );
    }
};