// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import App from '../App';
import { ConfigProvider } from '../../Config';
import { ApiProvider } from '../../Api';
import StatusMessages from '../../StatusMessages';
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
        expect(wrapper.find(ConfigProvider).length).toBe(1);
        expect(wrapper.find(ApiProvider).length).toBe(1);
        expect(wrapper.find(StatusMessages).length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });
});
