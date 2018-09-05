// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement } from '@plesk/ui-library';
import { ClearStatusMessages } from '../ClearStatusMessages';
import { shallow } from 'enzyme';

describe('ClearStatusMessages', () => {
    it('clear messages', () => {
        const statusMessages = {
            clear: jest.fn(),
        };
        const when = jest.fn();
        when.mockReturnValueOnce(true);
        const wrapper = shallow(
            <ClearStatusMessages
                statusMessages={statusMessages}
                when={when}
                value={1}
            />
        );
        wrapper.setProps({ value: 2 });

        expect(statusMessages.clear).toHaveBeenCalled();
    });
});
