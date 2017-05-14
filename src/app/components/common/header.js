import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router';

@withRouter
@connect()
export default class Header extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/new">
                            <NavItem eventKey={1}>New</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/posts">
                            <NavItem eventKey={2}>All</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};