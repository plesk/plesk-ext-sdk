// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { Component, PropTypes } from '@plesk/ui-library';
import api from './api';

export default class ConfigProvider extends Component {
    static propTypes = {
        children: PropTypes.node,
        value: PropTypes.object,
    };

    static childContextTypes = {
        api: PropTypes.object,
    };

    static defaultProps = {
        children: null,
        value: api,
    };

    getChildContext() {
        return {
            api: this.props.value,
        };
    }

    render() {
        return this.props.children;
    }
}
