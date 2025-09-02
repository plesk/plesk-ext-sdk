// Copyright 1999-2018. Plesk International GmbH. All rights reserved.
import { createElement } from 'react';
import { StatusMessages } from '../StatusMessages';
import { shallow } from 'enzyme';

describe('StatusMessages', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <StatusMessages location={{ pathname: '/' }}>
                <div />
            </StatusMessages>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('clear messages', () => {
        const statusMessages = {
            clear: jest.fn(),
            setToaster: jest.fn(),
        };
        const wrapper = shallow(
            <StatusMessages location={{ pathname: '/' }} statusMessages={statusMessages}>
                <div />
            </StatusMessages>,
        );
        wrapper.setProps({ location: { pathname: '/next' } });

        expect(statusMessages.clear).toHaveBeenCalledWith();
    });
});
