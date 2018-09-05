// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import StatusMessagesContext from './StatusMessagesContext';

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
