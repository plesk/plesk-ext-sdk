// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import Route from '../Route';
import { shallow } from 'enzyme';

describe('Route', () => {
    it('renders correctly', () => {
        const routes = [{
            path: '/',
            componentPath: 'Index',
        }];
        const wrapper = shallow(
            <Route
                {...routes[0]}
                routes={routes}
            />,
            {
                context: {
                    locale: {
                        lmsg: jest.fn(() => 'Page title'),
                    },
                },
            }
        );

        expect(wrapper).toMatchSnapshot();
    });
});
