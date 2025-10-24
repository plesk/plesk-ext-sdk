// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement } from 'react';
import PropTypes from 'prop-types';
import { ApiProviderContext } from './ApiProvider';

const withApi = Component => {
    const C = props => (
        <ApiProviderContext.Consumer>
            {api => <Component api={api} {...props} />}
        </ApiProviderContext.Consumer>
    );
    C.displayName = `withApi(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withApi;
