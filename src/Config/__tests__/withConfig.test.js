// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement } from 'react';
import withConfig from '../withConfig';
import { mount } from 'enzyme';
import ConfigProvider from '../ConfigProvider';

describe('withConfig', () => {
    test('pass config property', () => {
        const Component = () => null;
        const EnhancedComponent = withConfig(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withConfig(Component)');

        const config = {};

        const wrapper = mount(
            <ConfigProvider value={config}>
                <EnhancedComponent />
            </ConfigProvider>,
        );

        expect(wrapper.find(Component).prop('config')).toBe(config);
    });
});
