// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import withStatusMessages from '../withStatusMessages';
import StatusMessagesContext from '../StatusMessagesContext';
import { mount } from 'enzyme';

describe('withStatusMessages', () => {
    it('qwe', () => {
        const Component = () => null;
        const EnchancedComponent = withStatusMessages(Component);

        expect(EnchancedComponent.WrappedComponent).toBe(Component);
        expect(EnchancedComponent.displayName).toBe('withStatusMessages(Component)');
    });

    it('asd', () => {
        const Component = () => null;
        const EnhancedComponent = withStatusMessages(Component);
        const statusMessages = {};
        const wrapper = mount(
            <StatusMessagesContext.Provider value={statusMessages}>
                <EnhancedComponent />
            </StatusMessagesContext.Provider>
        );

        expect(wrapper.find(Component).prop('statusMessages')).toBe(statusMessages);
    });
});
