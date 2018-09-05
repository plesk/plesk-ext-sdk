// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { Component, PropTypes } from '@plesk/ui-library';
import { withStatusMessages } from './index';

export class ClearStatusMessages extends Component {
    static propTypes = {
        statusMessages: PropTypes.shape({
            clear: PropTypes.func.isRequired,
        }).isRequired,
        when: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { when, statusMessages } = this.props;

        if (when({ props: this.props, prevProps })) {
            statusMessages.clear();
        }
    }

    render() {
        return null;
    }
}

export default withStatusMessages(ClearStatusMessages);
