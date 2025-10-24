// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement, createContext } from 'react';
import PropTypes from 'prop-types';

export const ConfigProviderContext = createContext();

const ConfigProvider = ({ children, value }) => (
    <ConfigProviderContext.Provider value={value}>
        {children}
    </ConfigProviderContext.Provider>
);

ConfigProvider.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.object.isRequired,
};

export default ConfigProvider;
