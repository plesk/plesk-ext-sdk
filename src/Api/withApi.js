// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import ApiContext from './ApiContext';

const withApi = Component => {
    const C = props => (
        <ApiContext.Consumer>
            {api => (
                <Component api={api} {...props} />
            )}
        </ApiContext.Consumer>
    );

    C.displayName = `withApi(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withApi;
