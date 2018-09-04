// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

import { createElement, Form } from '@plesk/ui-library';
import { ServerForm } from '../ServerForm';
import { shallow } from 'enzyme';

describe('ServerForm', () => {
    let props;

    beforeEach(() => {
        props = {
            config: {
                baseUrl: '',
            },
            history: {
                push: jest.fn(),
            },
            api: {
                post: jest.fn(),
            },
            statusMessages: { add: jest.fn() },
            action: '/api/save',
        };
    });

    it('renders correctly', () => {
        const wrapper = shallow(
            <ServerForm
                {...props}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('submits data with success', () => {
        const promise = Promise.resolve({ status: 'success' });
        props.api.post.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerForm
                {...props}
                successUrl="/overview"
            />
        );

        wrapper.find(Form).simulate('submit', { username: 'Bob' });
        expect.assertions(2);

        return promise.then(() => {
            expect(props.api.post).toHaveBeenCalledWith('/api/save', { username: 'Bob' });
            expect(props.history.push).toHaveBeenCalledWith('/overview');
        });
    });

    it('cancels form', () => {
        const wrapper = shallow(
            <ServerForm
                {...props}
                cancelUrl="/overview"
            />
        );

        wrapper.find(Form).prop('cancelButton')
            .onClick();
        expect(props.history.push).toHaveBeenCalledWith('/overview');
    });

    it('renders success message correctly', () => {
        const promise = Promise.resolve({ status: 'success' });
        props.api.post.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerForm
                {...props}
                successMessage="Form saved"
            />
        );

        wrapper.find(Form).simulate('submit');
        expect.assertions(1);

        return promise.then(() => {
            expect(props.statusMessages.add).toHaveBeenCalledWith({ intent: 'success', message: 'Form saved' });
        });
    });

    it('renders common error correctly', () => {
        const promise = Promise.resolve({ status: 'error', errors: ['Some error'] });
        props.api.post.mockReturnValueOnce(promise);
        const wrapper = shallow(
            <ServerForm
                {...props}
            />
        );

        wrapper.find(Form).simulate('submit');
        expect.assertions(1);

        return promise.then(() => {
            expect(props.statusMessages.add).toHaveBeenCalledWith({ intent: 'danger', message: 'Some error' });
        });
    });
});
