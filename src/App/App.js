// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { LocaleProvider } from '@plesk/ui-library';
import PropTypes from 'prop-types';
import { createElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from '../Config';
import { ApiProvider } from '../Api';
import StatusMessages from '../StatusMessages';
import Page from '../Page';

const App = ({ locale, routes, ...props }) => (
    <ConfigProvider
        value={{
            baseUrl: props.baseUrl,
        }}
    >
        <LocaleProvider messages={locale}>
            <ApiProvider>
                <StatusMessages>
                    <BrowserRouter basename={props.baseUrl}>
                        <Routes>
                            {routes.map(({ path, component: Tag, ...routeProps }) => (
                                <Route
                                    key={path}
                                    path={path}
                                    render={() => <Page path={path} routes={routes}><Tag {...props} /></Page>}
                                    {...routeProps}
                                />
                            ))}
                        </Routes>
                    </BrowserRouter>
                </StatusMessages>
            </ApiProvider>
        </LocaleProvider>
    </ConfigProvider>
);

App.propTypes = {
    routes: PropTypes.array.isRequired,
    locale: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

export default App;
