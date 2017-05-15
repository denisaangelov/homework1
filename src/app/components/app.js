import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from './common/header';
import Container from './common/container';

@withRouter
@connect()
class App extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        return (
            <div>
                <Header />
                <Container />
            </div>
        );
    }
}

export default App;
