// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import PropTypes from 'prop-types';
import { createElement } from 'react';

const withApi = Component => {
    const C = (props, context) => (
        <Component api={context.api} {...props} />
    );

    C.contextTypes = {
        api: PropTypes.object,
    };
    C.displayName = `withApi(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withApi;
