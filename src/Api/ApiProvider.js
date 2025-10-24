// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement, createContext } from 'react';
import PropTypes from 'prop-types';
import api from './api';

export const ApiProviderContext = createContext();

const ApiProvider = ({ children, value = api }) => (
    <ApiProviderContext.Provider value={value}>
        {children}
    </ApiProviderContext.Provider>
);

ApiProvider.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.object,
};

export default ApiProvider;
