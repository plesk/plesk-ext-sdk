// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import withConfig from '../withConfig';
import { mount } from 'enzyme';

describe('withConfig', () => {
    test('pass config property', () => {
        const Component = () => null;
        const EnhancedComponent = withConfig(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withConfig(Component)');

        const config = {};
        const wrapper = mount(
            <EnhancedComponent />,
            {
                context: {
                    config,
                },
            },
        );

        expect(wrapper.find(Component).prop('config')).toBe(config);
    });
});
