import { render, createElement, Component } from '@plesk/ui-library';
import { BrowserRouter, Route as ReactRoute, Switch } from 'react-router-dom';
import routes from 'routes';

const stripTags = str => str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?(\/)?>|<\/\w+>/gi, '');

const renderTitle = (title = '') => {
    const parts = document.title.split(' - ');

    const documentTitle = document.querySelector('title');
    if (documentTitle) {
        documentTitle.update(
            title ? `${stripTags(title)} - ${parts[parts.length - 1]}` : `${parts[parts.length - 1]}`
        );
    }

    const heading = document.querySelector('.heading-area');
    if (heading) {
        heading.innerHTML = `<h2><span>${title}</span></h2>`;
    }
};

class Route extends Component {
    componentDidMount() {
        const { path } = this.props;
        const route = routes.filter(route => route.path === path)[0];

        if (route) {
            renderTitle(route.title);
        }
    }

    render() {
        return <ReactRoute {...this.props} />
    }
}

export default props => {
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
