// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { stringify } from 'qs';

const request = (url, config = {}) => {
    if (window.Ajax) {
        window.Ajax.activeRequestCount++;
    }

    const tokenEl = document.getElementById('forgery_protection_token');
    config = {
        credentials: 'same-origin',
        ...config,
        headers: {
            'X-Forgery-Protection-Token': tokenEl ? tokenEl.content : null,
            'X-Requested-With': 'XMLHttpRequest',
            ...config.headers,
        },
    };

    return fetch(url, config)
        .then(response => response.json().then(data => {
            data.response = response;
            return data;
        }))
        .finally(() => {
            if (window.Ajax) {
                window.Ajax.activeRequestCount--;
            }
        });
};

const addParams = (url, params) => {
    params = stringify(params);

    if (params) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + params;
    }

    return url;
};

export default {
    get: (url, params = {}) => request(addParams(url, params), { method: 'GET' }),
    post: (url, params = {}) => request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(params),
    }),
};
