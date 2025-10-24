// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement } from 'react';

import { ConfigProviderContext } from './ConfigProvider';

const withConfig = Component => {
    const C = props => (
        <ConfigProviderContext.Consumer>
            {config => <Component config={config} {...props} />}
        </ConfigProviderContext.Consumer>
    );

    C.displayName = `withConfig(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withConfig;
