import React from 'react';
import { connect } from 'react-redux';
import { SplitButton, MenuItem, FormControl } from 'react-bootstrap';

class FilterChooser extends React.Component { // = ({ filter, filterPosts }) =>
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl componentClass="select" onChange={(e) => this._handleOnChange(e)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </FormControl>
        )
    }

    _handleOnChange = (e) => {
        console.log(e.target.value);
        this.props.filterPosts(e.target.value);
    }
};

export default FilterChooser;
