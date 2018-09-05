// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Component, LocaleProvider, PropTypes, Toaster } from '@plesk/ui-library';
import { BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { ConfigContext } from '../Config';
import StatusMessages, { StatusMessagesContext, ClearStatusMessages } from '../StatusMessages';
import Route from '../Route';

const ClearStatusMessagesWhenLocationChange = withRouter(props => (
    <ClearStatusMessages {...props} when={({ props, prevProps }) => prevProps.location.pathname !== props.location.pathname} />
));

export default class App extends Component {
    static propTypes = {
        routes: PropTypes.array.isRequired,
        locale: PropTypes.object.isRequired,
        baseUrl: PropTypes.string.isRequired,
    };

    statusMessages = new StatusMessages();

    render() {
        const { locale, routes, ...props } = this.props;

        return (
            <ConfigContext.Provider
                value={{
                    baseUrl: props.baseUrl,
                }}
            >
                <LocaleProvider messages={locale}>
                    <StatusMessagesContext.Provider value={this.statusMessages}>
                        <BrowserRouter basename={props.baseUrl}>
                            <div>
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
                                <Toaster ref={this.statusMessages.setToaster} />
                                <ClearStatusMessagesWhenLocationChange />
                            </div>
                        </BrowserRouter>
                    </StatusMessagesContext.Provider>
                </LocaleProvider>
            </ConfigContext.Provider>
        );
    }
}
