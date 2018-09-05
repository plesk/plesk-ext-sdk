// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Component, PropTypes } from '@plesk/ui-library';
import { Route as ReactRoute } from 'react-router-dom';

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
    }
};

const getTranslatedTitle = ({ route, locale }) => {
    if (!route) {
        return null;
    }

    const key = `${route.componentPath.replace(/\//g, '.')}.title`;

    return locale.lmsg(key, {}, route.title || null);
};

export default class Route extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        routes: PropTypes.array.isRequired,
    };

    static contextTypes = {
        locale: PropTypes.object,
    };

    componentDidMount() {
        const { path, routes } = this.props;
        const { locale } = this.context;
        const [route] = routes.filter(route => route.path === path);
        const title = getTranslatedTitle({ route, locale });

        renderTitle(title);
    }

    render() {
        return <ReactRoute {...this.props} />;
    }
}
