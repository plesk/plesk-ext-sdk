// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import ConfigContext from './ConfigContext';

const withConfig = Component => {
    const C = props => (
        <ConfigContext.Consumer>
            {config => (
                <Component config={config} {...props} />
            )}
        </ConfigContext.Consumer>
    );

    C.displayName = `withConfig(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withConfig;
