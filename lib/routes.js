// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

module.exports.generateRoutesModule = routes => {
    const result = routes
        .map(({ component, ...props }) => ({
            exact: true,
            ...props,
            componentPath: component,
            component: `require('${component}').default`,
        }))
        .map(route => {
            const values = Object.keys(route)
                .map(key => `"${key}": ${key === 'component' ? route[key] : JSON.stringify(route[key])}`);
            return `{${values.join(',')}}`;
        });

    return `
export default [${result.join(',')}]
    `;
};

const nestedToPlain = (routes, parent = '') => routes.reduce((res, { path, routes, ...rest }) => {
    const fullPath = `${parent}/${path.replace(/^\/+/, '')}`;
    res.push({
        path: fullPath,
        parent,
        ...rest,
    });

    if (routes) {
        return res.concat(nestedToPlain(routes, fullPath));
    }

    return res;
}, []);

module.exports.prepareRoutes = routes => {
    if (routes.length === 0) {
        routes = [
            {
                path: '',
                component: 'index',
            },
        ];
    }

    return nestedToPlain(routes);
};
