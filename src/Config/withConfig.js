// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, PropTypes } from '@plesk/ui-library';

const withConfig = Component => {
    const C = (props, context) => (
        <Component config={context.config} {...props} />
    );

    C.contextTypes = {
        config: PropTypes.object,
    };
    C.displayName = `withConfig(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withConfig;
