// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, PureComponent, Toaster, PropTypes } from '@plesk/ui-library';
import StatusMessagesProxy from './StatusMessagesProxy';
import StatusMessagesContext from './StatusMessagesContext';
import { withRouter } from 'react-router-dom';

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
            <StatusMessagesContext.Provider value={this.props.statusMessages}>
                {this.props.children}
                <Toaster ref={this.props.statusMessages.setToaster} />
            </StatusMessagesContext.Provider>
        );
    }
}

export default withRouter(StatusMessages);
