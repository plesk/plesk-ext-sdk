// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement } from 'react';
import { StatusMessagesContext } from './StatusMessagesProvider';

const withStatusMessages = Component => {
    const C = props => (
        <StatusMessagesContext.Consumer>
            {statusMessages => (
                <Component statusMessages={statusMessages} {...props} />
            )}
        </StatusMessagesContext.Consumer>
    );

    C.displayName = `withStatusMessages(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withStatusMessages;
