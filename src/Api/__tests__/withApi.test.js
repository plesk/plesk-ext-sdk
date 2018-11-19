// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import { mount } from 'enzyme';
import withApi from '../withApi';

describe('withApi', () => {
    it('pass config property', () => {
        const Component = () => null;
        const EnhancedComponent = withApi(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withApi(Component)');

        const api = {};
        const wrapper = mount(
            <EnhancedComponent />,
            {
                context: {
                    api,
                },
            }
        );

        expect(wrapper.find(Component).prop('api')).toBe(api);
    });
});
