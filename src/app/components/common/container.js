import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Home from '../home';
import New from '../new';

@withRouter
@connect()
export default class Container extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <Route path="/" component={Home} />
                    <Route path="/new" component={New} />
                    <Route path="/posts" render={() => <div>postsp</div>} />
                </div>
            </div>
        );
    }
};