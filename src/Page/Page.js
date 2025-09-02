// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createPortal, Component, Fragment, PropTypes } from '@plesk/ui-library';
import { Link } from 'react-router-dom';

const stripTags = str => (str || '').replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?(\/)?>|<\/\w+>/gi, '');

const renderTitle = (title = '') => {
    title = stripTags(title);
    const parts = document.title.split(' - ');

    const documentTitle = document.querySelector('title');
    if (documentTitle) {
        documentTitle.innerHTML = title
            ? `${title} - ${parts[parts.length - 1]}`
            : `${parts[parts.length - 1]}`;
    }

    const heading = document.querySelector('.heading-area');
    if (heading) {
        heading.innerHTML = `<h2><span>${title}</span></h2>`;
    } else {
        // For Plesk 18+
        const titleSpan = document.querySelector('.page-content-header__title');
        if (titleSpan) {
            titleSpan.textContent = title;
        }
    }
};

const getTranslatedTitle = ({ route, locale }) => {
    if (!route) {
        return null;
    }

    const key = `${route.componentPath.replace(/\//g, '.')}.title`;

    return locale.lmsg(key, {}, route.title || null);
};

class Page extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        routes: PropTypes.array.isRequired,
        children: PropTypes.node.isRequired,
    };

    static contextTypes = {
        locale: PropTypes.object,
    };

    componentDidMount() {
        const { locale } = this.context;
        const title = getTranslatedTitle({ route: this.getCurrentRoute(), locale });

        renderTitle(title);
    }

    findRouteByPath(path) {
        const { routes } = this.props;
        return routes.filter(route => route.path === path)[0];
    }

    getCurrentRoute() {
        const { path } = this.props;
        return this.findRouteByPath(path);
    }

    renderPathbar() {
        // For Plesk 17.8
        let pathbarContentArea = document.getElementById('pathbar-content-area');
        if (!pathbarContentArea) {
            // For Plesk 18+
            pathbarContentArea = document.querySelector('.pul-breadcrumbs__list');
        }

        if (!pathbarContentArea) {
            return null;
        }

        const { locale } = this.context;
        let route = this.getCurrentRoute();

        const pathbar = [];
        while (route.parent && (route = this.findRouteByPath(route.parent))) {
            pathbar.unshift({
                path: route.path,
                title: getTranslatedTitle({ route, locale }),
            });
        }

        if (!pathbar.length) {
            return null;
        }

        return createPortal(pathbar.map(({ path, title }) => <li key={path}><Link to={path}>{title}</Link></li>), pathbarContentArea);
    }

    render() {
        return (
            <Fragment>
                {this.renderPathbar()}
                {this.props.children}
            </Fragment>
        );
    }
}

export default Page;
