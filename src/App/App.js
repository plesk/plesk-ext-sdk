// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, LocaleProvider, PropTypes } from '@plesk/ui-library';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigContext } from '../Config';
import StatusMessages from '../StatusMessages';
import Route from '../Route';

const App = ({ locale, routes, ...props }) => (
    <ConfigContext.Provider
        value={{
            baseUrl: props.baseUrl,
        }}
    >
        <LocaleProvider messages={locale}>
            <BrowserRouter basename={props.baseUrl}>
                <StatusMessages>
                    <Switch>
                        {routes.map(({ path, component: Tag, ...routeProps }) => (
                            <Route
                                key={path}
                                path={path}
                                render={() => <Tag {...props} />}
                                routes={routes}
                                {...routeProps}
                            />
                        ))}
                    </Switch>
                </StatusMessages>
            </BrowserRouter>
        </LocaleProvider>
    </ConfigContext.Provider>
);

App.propTypes = {
    routes: PropTypes.array.isRequired,
    locale: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

export default App;
