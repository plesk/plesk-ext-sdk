import { render, createElement } from '@plesk/ui-library';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from 'routes';

module.exports = props => {
    render(
        <BrowserRouter basename={props.baseUrl}>
            <Switch>
                {routes.map(({ path, component: Tag, ...routeProps }) => (
                    <Route
                        key={path}
                        path={path}
                        render={() => <Tag {...props} />}
                        {...routeProps}
                    />
                ))}
            </Switch>
        </BrowserRouter>,
        document.getElementById(props.moduleId)
    );
};
