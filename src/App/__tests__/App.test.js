// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import App from '../App';
import { mount } from 'enzyme';

describe('App', () => {
    it('renders correctly', () => {
        mount(
            <App
                baseUrl=""
                locale={{}}
                routes={[{
                    path: '/',
                    componentPath: 'Index',
                    component: () => null,
                }]}
            />
        );
    });
});
