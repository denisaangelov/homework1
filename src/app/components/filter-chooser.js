import React from 'react';
import { SplitButton, MenuItem, FormControl } from 'react-bootstrap';

import FieldGroup from './common/field-group';

class FilterChooser extends React.Component { // = ({ filter, filterPosts }) =>
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl componentClass="select">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </FormControl>
        )
    }

    _handleOnChange = (e) => {
        this.props.filterPosts(e.target.title);
    }
};

export default FilterChooser;
