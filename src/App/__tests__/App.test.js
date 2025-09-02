// Copyright 1999-2018. Plesk International GmbH. All rights reserved.
import { createElement } from 'react';
import App from '../App';
import { ConfigProvider } from '../../Config';
import { ApiProvider } from '../../Api';
import StatusMessages from '../../StatusMessages';
import { shallow } from 'enzyme';

describe('App', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <App
                baseUrl=""
                locale={{}}
                routes={[{
                    path: '/',
                    componentPath: 'Index',
                    component: () => null,
                }]}
            />,
        );

        expect(wrapper.find(ConfigProvider)).toHaveLength(1);
        expect(wrapper.find(ApiProvider)).toHaveLength(1);
        expect(wrapper.find(StatusMessages)).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});
