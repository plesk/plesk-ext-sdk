// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement } from 'react';
import { mount } from 'enzyme';
import withApi from '../withApi';
import ApiProvider from '../ApiProvider';

describe('withApi', () => {
    test('pass config property', () => {
        const Component = () => null;
        const EnhancedComponent = withApi(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withApi(Component)');

        const api = {};
        const wrapper = mount(
            <ApiProvider value={api}>
                <EnhancedComponent />
            </ApiProvider >,
        );

        expect(wrapper.find(Component).prop('api')).toBe(api);
    });
});
