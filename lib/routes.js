// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

module.exports.generateRoutesModule = routes => {
    const result = routes
        .map(({ component, ...props }) => ({
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

module.exports.prepareRoutes = routes => {
    if (routes.length === 0) {
        routes = [
            {
                path: '',
                component: 'index',
            },
        ];
    }

    return routes;
};
