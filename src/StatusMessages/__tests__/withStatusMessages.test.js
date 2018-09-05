// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import withStatusMessages from '../withStatusMessages';
import StatusMessagesContext from '../StatusMessagesContext';
import { mount } from 'enzyme';

describe('withStatusMessages', () => {
    it('pass statusMessages property', () => {
        const Component = () => null;
        const EnhancedComponent = withStatusMessages(Component);

        expect(EnhancedComponent.WrappedComponent).toBe(Component);
        expect(EnhancedComponent.displayName).toBe('withStatusMessages(Component)');

        const statusMessages = {};
        const wrapper = mount(
            <StatusMessagesContext.Provider value={statusMessages}>
                <EnhancedComponent />
            </StatusMessagesContext.Provider>
        );

        expect(wrapper.find(Component).prop('statusMessages')).toBe(statusMessages);
    });
});
