// Copyright 1999-2025. WebPros International GmbH. All rights reserved.

import { createElement } from 'react';
import withStatusMessages from '../withStatusMessages';
import { mount } from 'enzyme';
import StatusMessagesProvider from '../StatusMessagesProvider';

describe('withStatusMessages', () => {
    test('pass statusMessages property', () => {
        const Component = () => null;
        const EnhancedComponent = withStatusMessages(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withStatusMessages(Component)');

        const statusMessages = {};
        const wrapper = mount(
            <StatusMessagesProvider value={statusMessages}>
                <EnhancedComponent />
            </StatusMessagesProvider>,
        );

        expect(wrapper.find(Component).prop('statusMessages')).toBe(statusMessages);
    });
});
