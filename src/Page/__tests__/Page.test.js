// Copyright 1999-2018. Plesk International GmbH. All rights reserved.
import { createElement } from 'react';
import Page from '../Page';
import { shallow } from 'enzyme';

describe('Page', () => {
    test('renders correctly', () => {
        const routes = [{
            path: '/',
            componentPath: 'Index',
        }];
        const wrapper = shallow(
            <Page
                path={routes[0].path}
                routes={routes}
            >
                {'Page content'}
            </Page>,
            {
                context: {
                    locale: {
                        lmsg: jest.fn(() => 'Page title'),
                    },
                },
            },
        );

        expect(wrapper).toMatchSnapshot();
    });
});
