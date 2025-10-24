// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { Toaster } from '@plesk/ui-library';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';
import StatusMessagesProxy from './StatusMessagesProxy';
import StatusMessagesProvider from './StatusMessagesProvider';
import { withRouter } from '../utils';

export class StatusMessages extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        statusMessages: PropTypes.shape({
            clear: PropTypes.func.isRequired,
            setToaster: PropTypes.func.isRequired,
        }),
    };

    static defaultProps = {
        statusMessages: new StatusMessagesProxy(),
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.statusMessages.clear();
        }
    }

    render() {
        return (
            <StatusMessagesProvider value={this.props.statusMessages}>
                {this.props.children}
                <Toaster ref={this.props.statusMessages.setToaster} />
            </StatusMessagesProvider>
        );
    }
}

export default withRouter(StatusMessages);
