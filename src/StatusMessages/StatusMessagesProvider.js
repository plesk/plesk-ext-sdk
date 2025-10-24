// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import PropTypes from 'prop-types';
import { createContext, createElement } from 'react';
import StatusMessagesProxy from './StatusMessagesProxy';

export const StatusMessagesContext = createContext();

const StatusMessagesProvider = ({ children, value }) => (
    <StatusMessagesContext.Provider value={value}>
        {children}
    </StatusMessagesContext.Provider>
);

StatusMessagesProvider.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.object,
};

StatusMessagesProvider.defaultProps = {
    value: new StatusMessagesProxy(),
};

export default StatusMessagesProvider;
