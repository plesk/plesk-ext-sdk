// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import App from '../App';
import { shallow } from 'enzyme';

describe('App', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
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
        expect(wrapper).toMatchSnapshot();
    });
});
