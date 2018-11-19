// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { Component, PropTypes } from '@plesk/ui-library';
import StatusMessagesProxy from './StatusMessagesProxy';

export default class ConfigProvider extends Component {
    static propTypes = {
        children: PropTypes.node,
        value: PropTypes.object,
    };

    static childContextTypes = {
        statusMessages: PropTypes.object,
    };

    static defaultProps = {
        children: null,
        value: new StatusMessagesProxy(),
    };

    getChildContext() {
        return {
            statusMessages: this.props.value,
        };
    }

    render() {
        return this.props.children;
    }
}
