import { render, createElement, Component, PropTypes } from '@plesk/ui-library';
import { BrowserRouter, Route as ReactRoute, Switch } from 'react-router-dom';
import routes from 'routes';
import { ConfigContext } from '../../src/Config';

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
    static propTypes = {
        path: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const { path } = this.props;
        const [route] = routes.filter(route => route.path === path);

        if (route) {
            renderTitle(route.title);
        }
    }

    render() {
        return <ReactRoute {...this.props} />;
    }
}

export default props => {
    render(
        <ConfigContext.Provider
            value={{
                baseUrl: props.baseUrl,
            }}
        >
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
            </BrowserRouter>
        </ConfigContext.Provider>,
        document.getElementById(props.moduleId)
    );
};
