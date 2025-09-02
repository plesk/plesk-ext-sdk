// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ConfigProvider extends Component {
    static propTypes = {
        children: PropTypes.node,
        value: PropTypes.object.isRequired,
    };

    static childContextTypes = {
        config: PropTypes.object,
    };

    static defaultProps = {
        children: null,
    };

    getChildContext() {
        return {
            config: this.props.value,
        };
    }

    render() {
        return this.props.children;
    }
}
