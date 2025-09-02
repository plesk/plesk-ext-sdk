// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import withStatusMessages from '../withStatusMessages';
import { mount } from 'enzyme';

describe('withStatusMessages', () => {
    test('pass statusMessages property', () => {
        const Component = () => null;
        const EnhancedComponent = withStatusMessages(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withStatusMessages(Component)');

        const statusMessages = {};
        const wrapper = mount(
            <EnhancedComponent />,
            {
                context: {
                    statusMessages,
                },
            },
        );

        expect(wrapper.find(Component).prop('statusMessages')).toBe(statusMessages);
    });
});
