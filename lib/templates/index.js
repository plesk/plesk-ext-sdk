import { render, createElement, Component, LocaleProvider, PropTypes } from '@plesk/ui-library';
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

const getTranslatedTitle = ({ route, locale }) => {
    if (!route) {
        return null;
    }

    const key = `${route.componentPath.replace(/\//g, '.')}.title`;

    return locale.lmsg(key, {}, route.title || null);
};

class Route extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const { path } = this.props;
        const { locale } = this.context;
        const [route] = routes.filter(route => route.path === path);
        const title = getTranslatedTitle({ route, locale });

        if (title) {
            renderTitle(title);
        }
    }

    render() {
        return <ReactRoute {...this.props} />;
    }
}

Route.contextTypes = {
    locale: PropTypes.object,
};

export default ({ locale, ...props }) => {
    render(
        <ConfigContext.Provider
            value={{
                baseUrl: props.baseUrl,
            }}
        >
            <LocaleProvider messages={locale}>
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
            </LocaleProvider>
        </ConfigContext.Provider>,
        document.getElementById(props.moduleId)
    );
};
