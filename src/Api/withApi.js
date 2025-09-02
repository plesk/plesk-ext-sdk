// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { PropTypes } from '@plesk/ui-library';

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
